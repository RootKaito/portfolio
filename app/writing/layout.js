import Link from 'next/link';
import './writing.css';

export default function WritingLayout({ children }) {
  return <>
    <a className="skip" href="#writing-main">Skip to content</a>
    <div className="site-shell writing-shell"><div className="panel">
      <header className="writing-header">
        <Link className="brand" href="/" aria-label="Lucas Rocha, home"><b>LR</b><span>Lucas Rocha</span></Link>
        <nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/#projects">Work</Link><Link href="/writing" aria-current="page">Writing</Link><Link href="/#about">About</Link></nav>
        <Link className="button primary writing-contact" href="/#contact">Let’s talk <span aria-hidden="true">↗</span></Link>
      </header>
      <main id="writing-main">{children}</main>
      <footer className="writing-footer"><Link href="/">Lucas Rocha · Engineering &amp; AppSec</Link><span>Built with intention.</span></footer>
    </div></div>
  </>;
}
