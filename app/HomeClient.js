"use client";

import { useEffect } from "react";
import { bodyChunkA } from "./bodyChunkA";
import { bodyChunkB } from "./bodyChunkB";
import { bodyFooter } from "./bodyFooter";
import { bodyDialogs } from "./bodyDialogs";

export default function HomeClient({ articles }) {
  useEffect(() => {
    const menu = document.getElementById("mobile-menu");
    const opener = document.querySelector(".menu-toggle");
    const search = document.getElementById("search-dialog");
    const searchInput = document.getElementById("search-input");
    let returnFocus = null;

    function openDialog(dialog) {
      returnFocus = document.activeElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";
      if (dialog === menu) opener.setAttribute("aria-expanded", "true");
    }

    const dialogCleanups = [];
    for (const dialog of [menu, search]) {
      const closeBtn = dialog.querySelector(".dialog-close");
      const onCloseClick = () => dialog.close();
      const onClose = () => {
        document.body.style.overflow = "";
        opener.setAttribute("aria-expanded", "false");
        if (returnFocus?.isConnected) returnFocus.focus();
      };
      const onBackdropClick = (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          dialog.close();
      };
      closeBtn.addEventListener("click", onCloseClick);
      dialog.addEventListener("close", onClose);
      dialog.addEventListener("click", onBackdropClick);
      dialogCleanups.push(() => {
        closeBtn.removeEventListener("click", onCloseClick);
        dialog.removeEventListener("close", onClose);
        dialog.removeEventListener("click", onBackdropClick);
      });
    }

    const onOpenerClick = () => openDialog(menu);
    opener.addEventListener("click", onOpenerClick);

    const menuLinks = [...menu.querySelectorAll("a")];
    const onMenuLinkClick = () => menu.close();
    menuLinks.forEach((link) => link.addEventListener("click", onMenuLinkClick));

    const mediaQuery = window.matchMedia("(min-width:601px)");
    const onMediaChange = (event) => {
      if (event.matches && menu.open) menu.close();
    };
    mediaQuery.addEventListener("change", onMediaChange);

    function updateNavigation() {
      let current = "#home";
      for (const id of ["home", "projects", "writing", "about", "contact"])
        if (document.getElementById(id).getBoundingClientRect().top < innerHeight * 0.35)
          current = "#" + id;
      document.querySelectorAll(".desktop-nav a").forEach((link) => {
        if (link.hash === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
    window.addEventListener("scroll", updateNavigation, { passive: true });
    updateNavigation();

    const entries = [
      { title: "Home", type: "Page", target: "#home" },
      {
        title: "Três Portões · Secure pipeline lab",
        type: "Public lab",
        target: "https://rootkaito.github.io/tutorial-secure-pipeline/",
      },
      { title: "Open source contributions", type: "Page", target: "#open-source" },
      {
        title: "Nuclei templates · PR #17027",
        type: "Open source",
        target: "https://github.com/projectdiscovery/nuclei-templates/pull/17027",
      },
      {
        title: "Cyber Coffee",
        type: "Newsletter",
        target: "https://www.linkedin.com/newsletters/7498925114399395842",
      },
      { title: "About & Experience", type: "Page", target: "#about" },
      { title: "Technologies", type: "Tools", target: "#technologies" },
      { title: "Contact", type: "Let’s talk", target: "#contact" },
      ...[...document.querySelectorAll(".project-card a.card-button,.article-card a.card-button")].map(
        (link) => ({
          title: link.textContent.trim(),
          type: link.closest(".article-card") ? "Article" : "Public work",
          target: link.getAttribute("href"),
        })
      ),
    ];

    function normalize(text) {
      return text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase();
    }

    function renderSearch() {
      const query = normalize(searchInput.value.trim());
      const found = entries.filter((entry) => normalize(entry.title + " " + entry.type).includes(query));
      const container = document.getElementById("search-results");
      container.replaceChildren();
      for (const entry of found) {
        const link = document.createElement("a");
        link.className = "search-result";
        link.href = entry.target;
        if (entry.target.startsWith("https://")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        const title = document.createElement("strong");
        title.textContent = entry.title;
        const category = document.createElement("small");
        category.textContent = entry.type + " ↗";
        link.append(title, category);
        link.addEventListener("click", () => search.close());
        container.append(link);
      }
      document.getElementById("search-status").textContent = found.length
        ? `${found.length} results`
        : "No results. Try “pipeline”, “writing” or “contact”.";
    }

    function openSearch() {
      if (menu.open) menu.close();
      if (search.open) return;
      searchInput.value = "";
      renderSearch();
      openDialog(search);
      searchInput.focus();
    }

    const searchTrigger = document.querySelector(".search-trigger");
    searchTrigger.addEventListener("click", openSearch);
    searchInput.addEventListener("input", renderSearch);

    const onSearchKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        search.close();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        document.querySelector(".search-result")?.focus();
      }
      if (event.key === "Enter") {
        const first = document.querySelector(".search-result");
        if (first) {
          event.preventDefault();
          first.click();
        }
      }
    };
    searchInput.addEventListener("keydown", onSearchKeydown);

    const onGlobalKeydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", onGlobalKeydown);

    const filterButtons = [...document.querySelectorAll(".filter")];
    const makeFilterHandler = (button) => () => {
      const category = button.dataset.filter;
      filterButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      let count = 0;
      document.querySelectorAll(".technology").forEach((card) => {
        card.hidden = category !== "All" && card.dataset.category !== category;
        if (!card.hidden) count++;
      });
      document.getElementById("filter-status").textContent = `${count} technologies shown${
        category === "All" ? "" : ` in ${category}`
      }.`;
    };
    const filterHandlers = filterButtons.map((button) => {
      const handler = makeFilterHandler(button);
      button.addEventListener("click", handler);
      return { button, handler };
    });

    return () => {
      dialogCleanups.forEach((cleanup) => cleanup());
      opener.removeEventListener("click", onOpenerClick);
      menuLinks.forEach((link) => link.removeEventListener("click", onMenuLinkClick));
      mediaQuery.removeEventListener("change", onMediaChange);
      window.removeEventListener("scroll", updateNavigation);
      searchTrigger.removeEventListener("click", openSearch);
      searchInput.removeEventListener("input", renderSearch);
      searchInput.removeEventListener("keydown", onSearchKeydown);
      document.removeEventListener("keydown", onGlobalKeydown);
      filterHandlers.forEach(({ button, handler }) => button.removeEventListener("click", handler));
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="site-shell">
        <main id="main">
          <div dangerouslySetInnerHTML={{ __html: bodyChunkA }} />
          <section className="section panel writing-section" id="writing" aria-labelledby="writing-title">
            <div className="section-top">
              <div>
                <p className="eyebrow">Cyber Coffee · Writing</p>
                <h2 id="writing-title">AppSec, with context.</h2>
              </div>
              <a
                className="text-link"
                href="https://www.linkedin.com/newsletters/7498925114399395842"
                target="_blank"
                rel="noopener noreferrer"
              >
                View all editions <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="article-grid">
              {articles.map((article) => (
                <article className="article-card" key={article.link}>
                  <img src={article.image} alt="" loading="lazy" />
                  <div className="article-copy">
                    <time dateTime={article.isoDate}>{article.dateLabel}</time>
                    <h3 lang="pt-BR">
                      <a
                        className="card-button"
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    </h3>
                    <p>{article.summary}</p>
                    {article.tags.length > 0 && (
                      <ul className="tags">
                        {article.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="mobile-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
              ))}
            </div>
            <div className="newsletter-callout">
              <div>
                <p className="eyebrow">Cyber Coffee</p>
                <p>
                  Practical perspectives on application security, engineering and the decisions behind
                  safer software.
                </p>
              </div>
              <a
                className="button primary"
                href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7498925114399395842"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe on LinkedIn <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>
          <div dangerouslySetInnerHTML={{ __html: bodyChunkB }} />
        </main>
        <div dangerouslySetInnerHTML={{ __html: bodyFooter }} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: bodyDialogs }} />
    </>
  );
}
