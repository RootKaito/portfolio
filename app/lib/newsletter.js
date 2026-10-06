import { XMLParser } from "fast-xml-parser";

const FEED_URL = "https://linkedinrss.cns.me/7498925114399395842";
const ARTICLE_COUNT = 3;
const CARD_IMAGES = ["assets/laptop-dark.png", "assets/violet-mountains.png"];

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

// Original hand-picked editions; used when the feed is unreachable or returns nothing.
const FALLBACK_ARTICLES = [
  {
    title: "Onde os segredos deveriam morar: gestão de secrets com Azure Key Vault",
    link: "https://pt.linkedin.com/pulse/onde-os-segredos-deveriam-morar-gest%C3%A3o-de-secrets-com-lucas-rocha--lmfuf",
    isoDate: "2026-10-03",
    dateLabel: "OCT 03, 2026",
    summary: "Managed identities, centralized secrets and automatic rotation instead of static credentials.",
    tags: ["Azure", "Secrets"],
    image: "assets/laptop-dark.png",
  },
  {
    title: "Segurança no frontend moderno: o que muda com Next.js App Router e React 19",
    link: "https://pt.linkedin.com/pulse/seguran%C3%A7a-frontend-moderno-o-que-muda-com-nextjs-app-router-rocha--9firf",
    isoDate: "2026-09-24",
    dateLabel: "SEP 24, 2026",
    summary: "Trust boundaries, Server Actions and handling sensitive data in modern React applications.",
    tags: ["AppSec", "React"],
    image: "assets/violet-mountains.png",
  },
  {
    title: "Sua suíte de segurança “de graça” tem um preço — e ele não está na fatura",
    link: "https://www.linkedin.com/pulse/sua-su%C3%ADte-de-seguran%C3%A7a-gra%C3%A7a-tem-um-pre%C3%A7o-e-ele-n%C3%A3o-est%C3%A1-lucas-rocha--xicef/",
    isoDate: "2026-08-27",
    dateLabel: "AUG 27, 2026",
    summary: "The operational costs behind an open-source security stack: integration, tuning, maintenance and people.",
    tags: ["AppSec", "TCO"],
    image: "assets/laptop-dark.png",
  },
];

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSummary(description) {
  const text = stripHtml(description || "");
  if (text.length <= 160) return text;
  return text.slice(0, 157).trimEnd() + "…";
}

function toDateLabel(date) {
  return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, "0")}, ${date.getUTCFullYear()}`;
}

export async function getNewsletterArticles() {
  try {
    const response = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);

    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false, cdataPropName: "__cdata" });
    const parsed = parser.parse(xml);
    const rawItems = parsed?.rss?.channel?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
    if (!items.length) throw new Error("Feed returned no items");

    const articles = items.slice(0, ARTICLE_COUNT).map((item, index) => {
      const title = typeof item.title === "string" ? item.title : String(item.title ?? "");
      const link = typeof item.link === "string" ? item.link : String(item.link ?? "");
      const description =
        typeof item.description === "object" ? item.description?.__cdata : item.description;
      const pubDate = item.pubDate ? new Date(item.pubDate) : null;
      const isValidDate = pubDate && !Number.isNaN(pubDate.getTime());

      return {
        title,
        link,
        isoDate: isValidDate ? pubDate.toISOString().slice(0, 10) : "",
        dateLabel: isValidDate ? toDateLabel(pubDate) : "",
        summary: toSummary(description),
        tags: [],
        image: CARD_IMAGES[index % CARD_IMAGES.length],
      };
    });

    return articles.filter((article) => article.title && article.link);
  } catch {
    return FALLBACK_ARTICLES;
  }
}
