// Genera las portadas de Historias Destacadas (1080x1920) con el formato de Canva
// "Tu Historia Íconos para Destacadas Minimalista Negro y Blanco":
// fondo negro degradado, círculo gris, ícono de línea blanca y etiqueta en mayúsculas.
//
// Uso: node instagram/destacadas/generar-portadas.mjs
// Requiere playwright (usa el Chromium preinstalado o el de tu sistema).

import { createRequire } from 'node:module';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  playwright = require(join(execSync('npm root -g').toString().trim(), 'playwright'));
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'portadas');
mkdirSync(outDir, { recursive: true });

// Íconos de línea en un viewBox de 100x100, trazo blanco.
const S = 'fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  persona: `<g ${S}><rect x="38" y="16" width="24" height="30" rx="12"/><path d="M20 84 C20 62 34 54 50 54 C66 54 80 62 80 84 Z"/></g>`,
  mundo: `<g ${S}><circle cx="50" cy="50" r="34"/><ellipse cx="50" cy="50" rx="14" ry="34"/>
    <path d="M16 50 L84 50 M21 33 L79 33 M21 67 L79 67"/></g>`,
  comillas: `<g fill="#fff">
    <path d="M14 30 C14 22 22 18 30 18 C40 18 46 26 46 36 C46 54 36 70 22 80 L19 76 C27 68 30 60 30 54 C20 54 14 46 14 38 Z"/>
    <path d="M54 30 C54 22 62 18 70 18 C80 18 86 26 86 36 C86 54 76 70 62 80 L59 76 C67 68 70 60 70 54 C60 54 54 46 54 38 Z"/></g>`,
  libro: `<g ${S}><path d="M50 30 C42 24 28 22 14 24 L14 76 C28 74 42 76 50 82 C58 76 72 74 86 76 L86 24 C72 22 58 24 50 30 Z"/>
    <path d="M50 30 L50 82"/><path d="M22 36 L42 38 M22 46 L42 48 M22 56 L42 58 M58 38 L78 36 M58 48 L78 46 M58 58 L78 56"/></g>`,
  lupa: `<g ${S}><circle cx="44" cy="44" r="24"/><path d="M62 62 L82 82"/></g>`,
  documento: `<g ${S}><rect x="26" y="16" width="46" height="62" rx="5"/><path d="M32 22 L32 84 L78 84 L78 24"/>
    <path d="M36 32 L62 32 M36 42 L62 42 M36 52 L58 52 M36 62 L50 62"/></g>`,
  reloj: `<g ${S}><path d="M22 36 A34 34 0 1 1 18 54"/><path d="M14 26 L22 36 L32 30"/><path d="M50 30 L50 52 L64 60"/></g>`,
  campana: `<g ${S}><path d="M24 70 C30 62 30 52 30 42 C30 28 38 18 50 18 C62 18 70 28 70 42 C70 52 70 62 76 70 Z"/>
    <path d="M40 70 C40 80 60 80 60 70"/></g>`,
  corazon: `<g ${S}><path d="M50 80 C28 64 16 52 16 36 C16 26 24 18 34 18 C42 18 47 23 50 28 C53 23 58 18 66 18 C76 18 84 26 84 36 C84 52 72 64 50 80 Z"/></g>`,
};

// Portadas. Las tres primeras son las de The Amado Effect.
const COVERS = [
  { file: '01-sobre-mi', label: 'SOBRE MÍ', icon: 'persona' },
  { file: '02-mentores', label: 'MIS MENTORES', icon: 'mundo' },
  { file: '03-testimonios', label: 'TESTIMONIOS', icon: 'comillas' },
  { file: '04-the-amado-effect', label: 'THE AMADO EFFECT', icon: 'corazon' },
  { file: '05-recursos', label: 'EBOOK / RECURSOS', icon: 'libro' },
  { file: '06-preguntas-frecuentes', label: 'PREGUNTAS FRECUENTES', icon: 'lupa' },
  { file: '07-codigo-apex', label: 'CÓDIGO APEX', icon: 'documento' },
  { file: '08-horarios', label: 'HORARIOS', icon: 'reloj' },
  { file: '09-avisos-importantes', label: 'AVISOS IMPORTANTES', icon: 'campana' },
];

// Montserrat Light (OFL) embebida desde ./fuentes para no depender de internet.
const font = (f) => `data:font/woff2;base64,${readFileSync(join(here, 'fuentes', f)).toString('base64')}`;
const FONT = `<style>
  @font-face{font-family:'Montserrat';font-weight:300;src:url(${font('montserrat-latin-300-normal.woff2')}) format('woff2')}
  @font-face{font-family:'Montserrat';font-weight:300;src:url(${font('montserrat-latin-ext-300-normal.woff2')}) format('woff2');
    unicode-range:U+0100-02AF,U+1E00-1EFF}
</style>`;
const BASE_CSS = `*{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Montserrat','Helvetica Neue',Arial,sans-serif;font-weight:300}`;

// Círculo centrado en y=960: Instagram recorta la portada al centro de la historia.
const coverHtml = ({ label, icon }) => `<!doctype html><html><head><meta charset="utf-8">${FONT}<style>${BASE_CSS}
  .s{width:1080px;height:1920px;position:relative;overflow:hidden;
     background:radial-gradient(ellipse at 50% 45%,#1f1f1f 0%,#141414 55%,#0a0a0a 100%)}
  .c{position:absolute;left:260px;top:680px;width:560px;height:560px;border-radius:50%;background:#1b1b1b;
     display:flex;align-items:center;justify-content:center}
  .c svg{width:330px;height:330px}
  .l{position:absolute;top:1330px;width:100%;text-align:center;color:#ececec;font-size:60px;letter-spacing:4px}
</style></head><body><div class="s"><div class="c"><svg viewBox="0 0 100 100">${ICONS[icon]}</svg></div>
<div class="l">${label}</div></div></body></html>`;

// Hoja resumen al estilo de la página 1 del diseño de Canva.
const sheetHtml = () => `<!doctype html><html><head><meta charset="utf-8">${FONT}<style>${BASE_CSS}
  .s{width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 50%,#ffffff 0%,#ececec 100%);
     display:flex;flex-direction:column;align-items:center;padding-top:230px}
  h1{font-size:66px;font-weight:300;letter-spacing:2px;color:#222}
  h2{font-size:40px;font-weight:300;color:#333;margin-top:18px;margin-bottom:110px}
  .g{display:grid;grid-template-columns:repeat(3,260px);gap:70px 60px}
  .i{display:flex;flex-direction:column;align-items:center}
  .c{width:250px;height:250px;border-radius:50%;background:#000;display:flex;align-items:center;justify-content:center}
  .c svg{width:140px;height:140px}
  .t{margin-top:22px;font-size:26px;letter-spacing:1px;color:#222;text-align:center}
</style></head><body><div class="s"><h1>HISTORIAS DESTACADAS</h1><h2>THE AMADO EFFECT</h2><div class="g">
${COVERS.map(c => `<div class="i"><div class="c"><svg viewBox="0 0 100 100">${ICONS[c.icon]}</svg></div><div class="t">${c.label}</div></div>`).join('')}
</div></div></body></html>`;

const launchOpts = {};
if (process.env.PLAYWRIGHT_BROWSERS_PATH?.includes('/opt/pw-browsers')) {
  launchOpts.executablePath = '/opt/pw-browsers/chromium';
}
const browser = await playwright.chromium.launch(launchOpts).catch(() => playwright.chromium.launch());
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });

async function render(html, file) {
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(outDir, `${file}.png`) });
  console.log(`✓ ${file}.png`);
}

await render(sheetHtml(), '00-vista-general');
for (const c of COVERS) await render(coverHtml(c), c.file);
await browser.close();
