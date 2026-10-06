import Link from 'next/link';
import { englishArticles } from '../lib/english-articles';
import Artwork from './Artwork';

export const metadata = {
  title: 'Cyber Coffee — Writing in English | Lucas Rocha',
  description: 'Practical perspectives on application security, engineering and the decisions behind safer software. English editions of Cyber Coffee.',
  openGraph: { title: 'Cyber Coffee — Writing in English', description: 'Application security and engineering, with context.', type: 'website' },
};

export default function WritingPage() {
  const [featured, ...remaining] = englishArticles;
  return <div className="writing-content">
    <div className="writing-heading"><div><p className="eyebrow">Cyber Coffee · The English editions</p><h1>AppSec,<br/>with <em>context.</em></h1><p className="writing-deck">Practical perspectives on application security, engineering and the decisions behind safer software.</p></div><p className="writing-signature">Written by Lucas Rocha ↙</p></div>
    <article className="writing-feature"><Artwork article={featured} priority/><div className="writing-feature-copy"><p className="eyebrow">Latest edition</p><p className="writing-meta"><time dateTime={featured.isoDate}>{featured.dateLabel}</time> · {featured.readingMinutes} MIN READ</p><h2><Link href={featured.link}>{featured.title}</Link></h2><p>{featured.summary}</p><ul className="tags">{featured.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={featured.link}>Read article <span aria-hidden="true">→</span></Link></div></article>
    <div className="writing-grid">{remaining.map(article => <article className="writing-card" key={article.slug}><Link className="writing-card-cover" href={article.link} aria-label={article.title}><Artwork article={article} compact/></Link><p className="writing-meta"><time dateTime={article.isoDate}>{article.dateLabel}</time> · {article.readingMinutes} MIN READ</p><h2><Link href={article.link}>{article.title}</Link></h2><p>{article.summary}</p><ul className="tags">{article.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={article.link}>Read article <span aria-hidden="true">→</span></Link></article>)}</div>
    <aside className="writing-subscribe"><div><p className="eyebrow">Keep the conversation going.</p><p>Follow Cyber Coffee for the original Portuguese editions.</p></div><a className="text-link" href="https://www.linkedin.com/newsletters/7498925114399395842" target="_blank" rel="noopener noreferrer">Subscribe on LinkedIn <span aria-hidden="true">↗</span></a></aside>
  </div>;
}
