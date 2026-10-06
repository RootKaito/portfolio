import covers from '../../content/cover-library.json';

export const coverLibrary = covers;
const normalize = (text) => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/^\s*\d+\s*[—–-]\s*/, '').replace(/[^a-z0-9]+/g, ' ').trim();

// An exact match is deliberate: broad keywords such as "IA" and "LGPD"
// describe several different covers and must not silently pick the wrong one.
export function resolvePlannedCover({ coverId, title } = {}) {
  const matches = coverId
    ? covers.filter(cover => cover.id === coverId)
    : normalize(title)
      ? covers.filter(cover => [cover.title, ...(cover.aliases || [])].some(alias => normalize(alias) === normalize(title)))
      : [];
  if (matches.length !== 1) return null;
  const cover = matches[0];
  return { coverId: cover.id, image: cover.image, cardImage: cover.cardImage, imageAlt: cover.alt };
}
