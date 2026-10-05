# Assets — identidade escura

Três imagens geradas com a ferramenta integrada image_gen, tendo o mockup enviado como referência. Não há recortes do mockup no layout.

- `dist/assets/lucas-rocha.jpeg`: fotografia original enviada por Lucas, utilizada no hero com tratamento monocromático em CSS.
- `dist/assets/portrait-dark.png`: retrato gerado anterior, preservado mas não utilizado.
- `dist/assets/laptop-dark.png`: imagem editorial de laptop escuro.
- `dist/assets/violet-mountains.png`: paisagem roxa para card de artigo.

Diagrama de pipeline implementado em HTML/SVG. Fonte: Adwaita Sans/Inter, licença incluída em `dist/assets/INTERFACE-FONT-LICENSE.txt`. Ícones herdados da versão anterior: Simple Icons, Devicon, Tabler e marcas simplificadas locais. Assets antigos permanecem disponíveis; o checkpoint integral é independente.

## Prompts usados

Mode: built-in image_gen. These are provisional reference-derived visual assets; portrait is not a verified real photograph of Lucas.

## hero-portrait
Use case: photorealistic-natural. Asset type: standalone portfolio hero photograph. Reference image: use only the pictured adult man in the supplied website mockup as identity and composition guidance. Create an original regenerated photographic portrait of that same adult bearded man, dark thick-framed glasses, dark short textured hair, dark hoodie; looking toward the left, three-quarter face, head and upper torso. Place subject center-right in a landscape 3:2 frame, substantial dark negative space on left. Black-and-white portrait with very subtle purple rimlight on right, almost-black studio backdrop, authentic skin detail, high contrast cinematic photographic lighting. No website UI, lettering, quotes, text, badges, panels, borders, diagrams or graphics. Do not crop or reproduce the screenshot; generate only the original standalone portrait.

## code-laptop
Use case: photorealistic-natural. Asset type: portfolio project card photographic background. Original photograph of a black laptop on a dark desk, dim indigo and purple code-editor screen, close diagonal editorial crop, laptop toward right with dark negative space on left. Dark slate cinematic lighting, almost-black surroundings, restrained violet highlights. Landscape 3:2. Unreadable abstract code lines only, no readable writing, no logos, no text overlays, no website UI or panels.

## purple-mountains
Use case: stylized-concept. Asset type: editorial illustration for dark portfolio article. Abstract jagged purple mountain landscape under a deep night sky. Artistic digital illustration, sharp angular crags and layered distant peaks, dark violet palette with selectively luminous purple ridgelines, atmospheric depth, moody black-blue foreground, restrained stars. Landscape 3:2. No text, lettering, logos, UI or borders.


## Ícones adicionados

- Cowrie: avatar oficial da organização `cowrie` no GitHub (https://avatars.githubusercontent.com/u/13053933?v=4), com inversão de contraste em CSS.
- Suricata: favicon oficial de 192 px (https://suricata.io/wp-content/uploads/2021/01/cropped-favicon-192x192.png).
- Grafana: Simple Icons 16.24.1, cor da marca #F46800.
- Loki: SVG oficial (https://grafana.com/static/img/logos/logo-loki.svg).

Arquivos armazenados localmente em `dist/assets/icons/`, com validação visual em desktop e mobile.

- Aikido: webclip oficial de aikido.dev (https://cdn.prod.website-files.com/642adcaf364024552e71df01/686cc19bbe248d01ceb5cfe2_webclip.png).
- OWASP Threat Dragon: símbolo SVG do repositório oficial (https://raw.githubusercontent.com/OWASP/threat-dragon/main/td.vue/src/assets/threatdragon_logo_image.svg), com inversão de contraste em CSS para o fundo escuro.
