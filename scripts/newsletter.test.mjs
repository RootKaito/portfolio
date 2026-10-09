import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalUrl, extractContent, textNodes, parseFeed, validateTranslation, translateArticle } from './newsletter.mjs';
const html = `<p>${'Um artigo completo de segurança de aplicações. '.repeat(20)}</p><h3>Exemplos</h3><p>Veja <a href="https://example.org/a">o exemplo</a> e <code>const token = 'secret';</code>.</p>`;
const item = (date = 'Thu, 08 Oct 2026 12:02:06 GMT') => `<item><title>Título</title><link>https://pt.linkedin.com/pulse/example/</link><pubDate>${date}</pubDate><description><![CDATA[${html}]]></description></item>`;
const feed = body => `<rss><channel>${body}</channel></rss>`;
const source = () => parseFeed(feed(item()), new Date('2026-10-09'))[0];
const covers = [{ id: 'appsec', image: '/a.webp', cardImage: '/b.webp', alt: 'Cover' }];
const translated = () => ({ title: 'Application security', summary: 'A summary.', tags: ['AppSec'], coverId: 'appsec', coverReason: 'Application security topic.', translations: textNodes(source().content).filter(n => n.id !== undefined).map(n => ({ id: n.id, text: n.text })) });
test('canonical URL ignores locale, trailing slash and tracking; rejects foreign host', () => {
 assert.equal(canonicalUrl('https://pt.linkedin.com/pulse/example/?trk=x'), 'https://www.linkedin.com/pulse/example');
 assert.throws(() => canonicalUrl('https://linkedin.com.attacker.org/pulse/example'));
});
test('parses singleton feeds, deduplicates, excludes future editions', () => {
 assert.equal(parseFeed(feed(item()+item()),new Date('2026-10-09')).length,1);
 assert.equal(parseFeed(feed(item()),new Date('2026-10-01')).length,0);
 assert.throws(() => parseFeed('<bad>'));
 assert.throws(() => parseFeed(feed(item().replace(html,'Excerpt'))));
});
test('preserves links and literal code while removing scripts and unsafe URLs', () => {
 const content=extractContent('<p>Hello <a href="javascript:alert(1)">world</a><script>evil()</script><code>x &lt; 3</code><a href="https://example.com">safe</a></p>');
 assert(!JSON.stringify(content).includes('javascript'));
 assert(!JSON.stringify(content).includes('evil'));
 assert.equal(textNodes(content).find(n=>n.text==='x < 3').id,undefined);
 assert(JSON.stringify(content).includes('https://example.com'));
});
test('rejects omissions, duplicate IDs, severe truncation and unknown covers', () => {
 for (const change of [r=>r.translations.pop(),r=>r.translations[1].id=r.translations[0].id,r=>r.translations[0].text='short',r=>r.coverId='invented']) {
  const r=translated();change(r);assert.throws(()=>validateTranslation(source(),r,covers));
 }
});
test('translation cannot replace source link, date, code or image path', () => {
 const result=validateTranslation(source(),{...translated(),sourceUrl:'evil',image:'evil'},covers);
 assert.equal(result.sourceUrl,source().sourceUrl);
 assert.equal(result.image,'/a.webp');
 assert(JSON.stringify(result.content).includes("const token = 'secret';"));
 assert.equal(result.isoDate,'2026-10-08');
});
test('retries transient API errors and refuses incomplete output',async()=>{
 let calls=0;
 const fetcher=async()=>++calls<2?{ok:false,status:429}:{ok:true,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(translated())}]}}]})};
 await translateArticle(source(),covers,{apiKey:'test',fetcher,sleep:async()=>{}});
 assert.equal(calls,2);
 await assert.rejects(()=>translateArticle(source(),covers,{apiKey:'test',fetcher:async()=>({ok:true,json:async()=>({candidates:[{finishReason:'MAX_TOKENS'}]})})}),/incomplete/);
});
