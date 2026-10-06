import Link from 'next/link';
import { notFound } from 'next/navigation';
import { englishArticles, getEnglishArticle } from '../../lib/english-articles';
import Artwork from '../Artwork';

export function generateStaticParams() { return englishArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const article = getEnglishArticle((await params).slug);
  if (!article) return { title: 'Article not found | Cyber Coffee' };
  return { title: `${article.title} | Cyber Coffee`, description: article.summary, openGraph: { title: article.title, description: article.summary, type: 'article', publishedTime: article.isoDate, authors: ['Lucas Rocha'] } };
}
export default async function ArticlePage({ params }) {
  const article = getEnglishArticle((await params).slug);
  if (!article) notFound();
  const next = englishArticles[(englishArticles.indexOf(article) + 1) % englishArticles.length];
  return <article className="writing-content writing-reader">
    <Link className="text-link writing-back" href="/writing">← All articles</Link>
    <header className="writing-reader-header"><p className="eyebrow">Cyber Coffee · English edition</p><h1>{article.title}</h1><p className="writing-deck">{article.lead}</p><div className="writing-byline"><img src="/assets/lucas-rocha.jpeg" width="44" height="44" alt=""/><div><Link href="/#about">Lucas Rocha</Link><p><time dateTime={article.isoDate}>{article.dateLabel}</time> · {article.readingMinutes} min read</p></div></div><ul className="tags">{article.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></header>
    <Artwork article={article} priority/>
    <div className="writing-prose">{article.introduction.map((text, i) => <p key={i}>{text}</p>)}{article.sections.map((section, i) => <section key={section.title} aria-labelledby={`section-${i}`}><h2 id={`section-${i}`}>{section.title}</h2>{section.paragraphs.map((text, j) => <p key={j}>{text}</p>)}{section.list && <ul>{section.list.map(text => <li key={text}>{text}</li>)}</ul>}{section.after?.map((text, j) => <p key={j}>{text}</p>)}</section>)}
      <aside className="writing-source"><p>English translation of the original Portuguese edition of Cyber Coffee.</p><a className="text-link" href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Read the original on LinkedIn ↗</a></aside>
      <nav className="writing-next" aria-label="More articles"><p className="eyebrow">Continue reading</p><Link href={next.link}>{next.title} <span aria-hidden="true">→</span></Link></nav>
    </div><Link className="text-link" href="/writing">← Back to all articles</Link>
  </article>;
}
