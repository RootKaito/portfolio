export default function Artwork({ article, priority = false, compact = false }) {
  return <div className="writing-art"><img src={compact ? article.cardImage : article.image} srcSet={compact ? undefined : article.cardImage + ' 640w, ' + article.image + ' 1536w'} sizes={compact ? undefined : '(max-width: 600px) 100vw, (max-width: 1200px) 85vw, 1000px'} width={1536} height={1024} alt={article.imageAlt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" /></div>;
}
