import { fileURLToPath } from 'node:url';
import { readFile, writeFile, rename } from 'node:fs/promises';
import { canonicalUrl, parseFeed, translateArticle } from './newsletter.mjs';

const read = file => readFile(new URL(`../${file}`, import.meta.url), 'utf8');
const readJSON = async file => JSON.parse(await read(file));
async function save(file, value) {
  const path = new URL(`../${file}`, import.meta.url);
  await writeFile(`${fileURLToPath(path)}.tmp`, `${JSON.stringify(value, null, 2)}\n`);
  await rename(`${fileURLToPath(path)}.tmp`, path);
}
const response = await fetch('https://linkedinrss.cns.me/7498925114399395842', { signal: AbortSignal.timeout(60000) });
if (!response.ok) throw new Error(`RSS HTTP ${response.status}`);
const incoming = parseFeed(await response.text());
const archive = await readJSON('content/newsletter-sources.json');
for (const article of incoming) {
  const index = archive.findIndex(a => a.sourceUrl === article.sourceUrl);
  if (index < 0) archive.push(article);
  else archive[index] = article;
}
archive.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
await save('content/newsletter-sources.json', archive);
const generated = await readJSON('content/generated-articles.json');
const curated = [...(await read('app/lib/english-articles.js')).matchAll(/sourceUrl: '([^']+)'/g)].map(m => canonicalUrl(m[1]));
const covers = await readJSON('content/cover-library.json');
covers.push(...await readJSON('content/existing-covers.json'));
const published = new Set([...curated, ...generated.map(a => canonicalUrl(a.sourceUrl))]);
const pending = archive.filter(a => !published.has(a.sourceUrl));
console.log(`Feed: ${incoming.length}; archived: ${archive.length}; pending: ${pending.length}`);
let failures = 0;
for (const source of pending.slice(0, 3)) {
  try {
    const article = await translateArticle(source, covers, { apiKey: process.env.GEMINI_API_KEY, model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' });
    generated.push(article);
    await save('content/generated-articles.json', generated);
    console.log(`Translated: ${article.slug}; cover: ${article.coverId}`);
  } catch (error) { failures++; console.error(`Translation failed for ${source.sourceUrl}: ${error.message}`); }
}
if (failures) process.exitCode = 1;
