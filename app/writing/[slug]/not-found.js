import Link from 'next/link';
export default function ArticleNotFound() { return <div className="writing-content"><p className="eyebrow">Cyber Coffee</p><h1>Article not found.</h1><p className="writing-deck">This English edition is not available.</p><Link className="text-link writing-back" href="/writing">← Browse all articles</Link></div>; }
