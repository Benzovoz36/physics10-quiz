import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "images");
mkdirSync(outDir, { recursive: true });

const C = {
  ink: "#ece5ff",
  line: "#5b4a86",
  soft: "#2f2354",
  accent: "#a78bfa",
  blue: "#d946ef",
  warm: "#fbbf24",
  red: "#fb7185",
  green: "#34d399",
  muted: "#9b8fc0",
};

const marker = (name, color) =>
  `<marker id="ar-${name}" markerWidth="12" markerHeight="12" refX="10" refY="6" viewBox="0 0 12 12" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M1,1 L11,6 L1,11 Z" fill="${color}"/></marker>`;

const defs = `
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#171028"/>
  <stop offset="0.55" stop-color="#1d1533"/>
  <stop offset="1" stop-color="#241a3f"/>
</linearGradient>
<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
  <circle cx="3" cy="3" r="1.3" fill="#a78bfa" opacity="0.28"/>
</pattern>
${marker("ink", C.ink)}
${marker("accent", C.accent)}
${marker("blue", C.blue)}
${marker("warm", C.warm)}
${marker("red", C.red)}
${marker("green", C.green)}
`;

const SVG_OPEN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450" role="img" aria-label="`;

const arrow = (x1, y1, x2, y2, color = "accent", w = 5, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[color] || color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""} marker-end="url(#ar-${color})"/>`;

const doubleArrow = (x1, y1, x2, y2, color = "ink", w = 3) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[color] || color}" stroke-width="${w}" stroke-linecap="round" marker-start="url(#ar-${color})" marker-end="url(#ar-${color})"/>`;

const ground = (y = 352) => `
  <line x1="80" y1="${y}" x2="720" y2="${y}" stroke="${C.line}" stroke-width="4" stroke-linecap="round"/>
  <line x1="80" y1="${y + 12}" x2="720" y2="${y + 12}" stroke="${C.line}" stroke-width="2" stroke-linecap="round" opacity="0.45"/>`;

const label = (x, y, text, color = "ink", size = 26, weight = 700, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${C[color] || color}" text-anchor="${anchor}">${text}</text>`;

/* ---------- scenes ---------- */

function sIncline() {
  return `
  ${ground()}
  <polygon points="150,352 560,352 560,192" fill="${C.soft}" fill-opacity="0.8" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
  <g transform="rotate(-21.3 423 219)">
    <rect x="387" y="194" width="72" height="50" rx="9" fill="${C.accent}"/>
    <rect x="396" y="203" width="54" height="9" rx="4.5" fill="#ffffff" opacity="0.35"/>
  </g>
  ${arrow(452, 205, 540, 171, "accent", 5)}
  ${label(556, 178, "v", "accent", 28, 700)}
  <line x1="560" y1="192" x2="604" y2="192" stroke="${C.line}" stroke-width="2.5" stroke-dasharray="7 7"/>
  ${doubleArrow(600, 192, 600, 352, "ink", 3)}
  ${label(618, 279, "h", "ink", 28, 700)}
  <path d="M 235 352 A 85 85 0 0 0 229 321" fill="none" stroke="${C.ink}" stroke-width="3"/>
  ${label(249, 339, "α", "ink", 26, 700)}
  `;
}

function sFreeFall() {
  return `
  ${ground()}
  <rect x="110" y="120" width="120" height="232" fill="${C.soft}" stroke="${C.ink}" stroke-width="4"/>
  <rect x="104" y="112" width="132" height="14" rx="5" fill="${C.ink}" opacity="0.25"/>
  ${[150, 205, 260]
    .map(
      (y) =>
        `<rect x="132" y="${y}" width="28" height="34" rx="4" fill="${C.soft}" stroke="${C.line}" stroke-width="2"/><rect x="180" y="${y}" width="28" height="34" rx="4" fill="${C.soft}" stroke="${C.line}" stroke-width="2"/>`
    )
    .join("")}
  <line x1="272" y1="190" x2="272" y2="340" stroke="${C.ink}" stroke-width="3" stroke-dasharray="9 9" marker-end="url(#ar-ink)"/>
  <circle cx="272" cy="160" r="28" fill="${C.accent}"/>
  <circle cx="262" cy="150" r="8" fill="#ffffff" opacity="0.4"/>
  <line x1="296" y1="196" x2="296" y2="222" stroke="${C.blue}" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
  <line x1="296" y1="248" x2="296" y2="286" stroke="${C.blue}" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
  ${arrow(640, 130, 640, 220, "warm", 5)}
  ${label(660, 182, "g", "warm", 30, 700)}
  `;
}

function sNewton() {
  return `
  ${ground()}
  <ellipse cx="400" cy="338" rx="120" ry="10" fill="${C.ink}" opacity="0.08"/>
  <rect x="300" y="210" width="200" height="120" rx="14" fill="${C.soft}" stroke="${C.ink}" stroke-width="4"/>
  ${label(400, 286, "m", "ink", 32, 700, "middle")}
  ${arrow(500, 270, 650, 270, "warm", 6)}
  ${label(670, 281, "F", "warm", 32, 700)}
  ${arrow(300, 180, 424, 180, "accent", 5)}
  ${label(440, 191, "a", "accent", 30, 700)}
  `;
}

function sMomentum() {
  return `
  ${ground()}
  <circle cx="250" cy="255" r="52" fill="${C.soft}" stroke="${C.ink}" stroke-width="4"/>
  <circle cx="550" cy="255" r="52" fill="#3a2a63" stroke="${C.ink}" stroke-width="4"/>
  ${label(250, 264, "m₁", "ink", 24, 700, "middle")}
  ${label(550, 264, "m₂", "ink", 24, 700, "middle")}
  ${arrow(316, 255, 386, 255, "accent", 5)}
  ${arrow(484, 255, 414, 255, "warm", 5)}
  ${label(340, 230, "v₁", "accent", 24, 700, "middle")}
  ${label(468, 230, "v₂", "warm", 24, 700, "middle")}
  <g stroke="${C.warm}" stroke-width="4" stroke-linecap="round">
    <line x1="400" y1="220" x2="400" y2="232"/>
    <line x1="400" y1="278" x2="400" y2="290"/>
    <line x1="374" y1="255" x2="386" y2="255"/>
    <line x1="414" y1="255" x2="426" y2="255"/>
  </g>
  `;
}

function sWork() {
  return `
  ${ground()}
  <rect x="300" y="215" width="150" height="125" rx="10" fill="#3a2c12" stroke="${C.warm}" stroke-width="4"/>
  <line x1="300" y1="248" x2="450" y2="248" stroke="${C.ink}" stroke-width="2.5" opacity="0.5"/>
  <line x1="300" y1="310" x2="450" y2="310" stroke="${C.ink}" stroke-width="2.5" opacity="0.5"/>
  <line x1="375" y1="215" x2="375" y2="340" stroke="${C.ink}" stroke-width="2.5" opacity="0.2"/>
  <line x1="450" y1="215" x2="620" y2="110" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
  ${arrow(540, 150, 610, 112, "warm", 6)}
  ${label(632, 110, "F", "warm", 30, 700)}
  <line x1="450" y1="215" x2="638" y2="215" stroke="${C.line}" stroke-width="2.5" stroke-dasharray="7 7"/>
  <path d="M 530 215 A 80 80 0 0 0 518 173" fill="none" stroke="${C.ink}" stroke-width="3"/>
  ${label(542, 207, "α", "ink", 24, 700)}
  `;
}

function sEnergy() {
  return `
  <rect x="250" y="86" width="300" height="12" rx="6" fill="${C.ink}"/>
  <circle cx="400" cy="100" r="6" fill="${C.ink}"/>
  <path d="M 287 160 Q 400 296 513 160" fill="none" stroke="${C.line}" stroke-width="2.5" stroke-dasharray="8 8"/>
  <line x1="400" y1="100" x2="287" y2="160" stroke="${C.ink}" stroke-width="3"/>
  <line x1="400" y1="100" x2="513" y2="160" stroke="${C.ink}" stroke-width="2.5" stroke-dasharray="7 7" opacity="0.55"/>
  <line x1="400" y1="100" x2="400" y2="228" stroke="${C.ink}" stroke-width="3"/>
  <circle cx="287" cy="160" r="23" fill="${C.accent}"/>
  <circle cx="513" cy="160" r="21" fill="none" stroke="${C.accent}" stroke-width="2.5" stroke-dasharray="6 6" opacity="0.6"/>
  <circle cx="400" cy="228" r="23" fill="${C.ink}" opacity="0.85"/>
  <line x1="287" y1="160" x2="424" y2="160" stroke="${C.line}" stroke-width="2.5" stroke-dasharray="7 7"/>
  <line x1="400" y1="228" x2="424" y2="228" stroke="${C.line}" stroke-width="2.5" stroke-dasharray="7 7"/>
  ${doubleArrow(440, 160, 440, 228, "ink", 3)}
  ${label(456, 200, "h", "ink", 28, 700)}
  `;
}

function sMolecular() {
  const dots = [
    [250, 180, 6], [300, 168, 4.5], [356, 190, 7], [420, 172, 5], [480, 190, 6.5],
    [530, 172, 4.5], [236, 240, 5], [286, 226, 7], [342, 244, 4.5], [400, 228, 6],
    [462, 244, 5], [516, 230, 7], [552, 262, 4.5], [252, 300, 7], [314, 296, 5],
    [368, 312, 6], [428, 292, 4.5], [486, 308, 6.5], [540, 296, 5], [286, 324, 4.5],
  ];
  const colors = [C.accent, C.warm, C.ink, C.blue];
  return `
  <rect x="210" y="140" width="380" height="212" rx="18" fill="${C.soft}" fill-opacity="0.72" stroke="${C.ink}" stroke-width="5"/>
  ${dots
    .map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${colors[i % colors.length]}" opacity="${i % 3 === 0 ? 0.9 : 0.75}"/>`)
    .join("")}
  <line x1="318" y1="212" x2="338" y2="202" stroke="${C.ink}" stroke-width="2" opacity="0.5" marker-end="url(#ar-ink)"/>
  <line x1="468" y1="280" x2="489" y2="270" stroke="${C.ink}" stroke-width="2" opacity="0.5" marker-end="url(#ar-ink)"/>
  <line x1="412" y1="316" x2="412" y2="336" stroke="${C.ink}" stroke-width="2" opacity="0.45" marker-end="url(#ar-ink)"/>
  `;
}

function sGasLaw() {
  return `
  <path d="M 300 150 V 352 H 500 V 150" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <rect x="303" y="240" width="194" height="107" fill="${C.soft}" fill-opacity="0.85"/>
  <rect x="294" y="214" width="212" height="26" rx="8" fill="${C.ink}"/>
  <rect x="388" y="156" width="24" height="58" fill="${C.ink}"/>
  ${[
    [330, 270], [360, 292], [398, 268], [432, 288], [462, 306], [352, 322], [414, 318], [472, 262],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${C.accent}" opacity="0.6"/>`)
    .join("")}
  ${arrow(400, 112, 400, 148, "warm", 5)}
  ${label(420, 132, "p", "warm", 28, 700)}
  ${label(400, 396, "pV = νRT", "muted", 22, 600, "middle")}
  `;
}

function sFirstLaw() {
  return `
  <path d="M 300 180 V 352 H 500 V 180" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <rect x="303" y="250" width="194" height="97" fill="${C.soft}" fill-opacity="0.85"/>
  <rect x="294" y="224" width="212" height="26" rx="8" fill="${C.ink}"/>
  <rect x="388" y="164" width="24" height="60" fill="${C.ink}"/>
  ${[
    [332, 282], [366, 300], [402, 276], [438, 296], [464, 318], [348, 326],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${C.accent}" opacity="0.55"/>`)
    .join("")}
  ${arrow(238, 300, 296, 300, "warm", 6)}
  ${label(200, 308, "Q", "warm", 30, 700)}
  ${arrow(556, 276, 556, 196, "accent", 6)}
  ${label(574, 244, "A", "accent", 30, 700)}
  `;
}

function sCoulomb() {
  return `
  <circle cx="250" cy="220" r="48" fill="${C.soft}" stroke="${C.accent}" stroke-width="4"/>
  <circle cx="550" cy="220" r="48" fill="#3a1a28" stroke="${C.red}" stroke-width="4"/>
  <g stroke="${C.accent}" stroke-width="7" stroke-linecap="round">
    <line x1="250" y1="198" x2="250" y2="242"/>
    <line x1="228" y1="220" x2="272" y2="220"/>
  </g>
  <line x1="528" y1="220" x2="572" y2="220" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/>
  ${arrow(312, 220, 380, 220, "accent", 5)}
  ${arrow(488, 220, 420, 220, "red", 5)}
  <line x1="250" y1="306" x2="550" y2="306" stroke="${C.line}" stroke-width="2.5" stroke-dasharray="7 7"/>
  <line x1="250" y1="296" x2="250" y2="316" stroke="${C.line}" stroke-width="2.5"/>
  <line x1="550" y1="296" x2="550" y2="316" stroke="${C.line}" stroke-width="2.5"/>
  <rect x="386" y="290" width="28" height="26" rx="8" fill="#241a3f"/>
  ${label(400, 310, "r", "ink", 24, 700, "middle")}
  `;
}

function sOhm() {
  return `
  <g fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 220 160 H 340"/>
    <path d="M 460 160 H 580 V 352 H 220 V 262"/>
    <path d="M 220 218 V 160"/>
  </g>
  <path d="M 340 160 L 348 140 L 360 180 L 372 140 L 384 180 L 396 140 L 408 180 L 420 140 L 432 180 L 444 140 L 456 180 L 460 160"
        fill="none" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <line x1="202" y1="232" x2="238" y2="232" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
  <line x1="210" y1="248" x2="230" y2="248" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>
  ${label(186, 238, "+", "ink", 20, 700)}
  ${label(186, 260, "−", "ink", 20, 700)}
  ${label(400, 206, "R", "ink", 24, 700, "middle")}
  ${arrow(580, 200, 580, 250, "accent", 4)}
  ${label(602, 232, "I", "accent", 28, 700)}
  `;
}

function sField() {
  const lines = [170, 218, 266, 314].map(
    (y) =>
      `<line x1="282" y1="${y}" x2="520" y2="${y}" stroke="${C.ink}" stroke-width="2.5" opacity="0.65" marker-end="url(#ar-ink)"/>`
  );
  return `
  <rect x="250" y="140" width="26" height="200" rx="5" fill="${C.accent}"/>
  <rect x="524" y="140" width="26" height="200" rx="5" fill="${C.red}"/>
  ${[168, 216, 264, 312]
    .map(
      (y) =>
        `<g stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.9"><line x1="255" y1="${y}" x2="271" y2="${y}"/><line x1="263" y1="${y - 8}" x2="263" y2="${y + 8}"/></g>` +
        `<line x1="530" y1="${y}" x2="544" y2="${y}" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.9"/>`
    )
    .join("")}
  ${lines.join("")}
  ${label(400, 118, "E", "accent", 28, 700, "middle")}
  `;
}

/* ---------- render ---------- */

function render({ alt, topic, scene }) {
  return `${SVG_OPEN}${alt.replace(/"/g, "&quot;")}">
<defs>${defs}</defs>
<rect width="800" height="450" fill="url(#bg)"/>
<rect width="800" height="450" fill="url(#dots)"/>
<rect x="16" y="16" width="768" height="418" rx="26" fill="none" stroke="${C.line}" stroke-width="2" stroke-dasharray="10 9"/>
${scene()}
<g>
  <rect x="44" y="40" width="266" height="36" rx="14" fill="#241a3f" opacity="0.9"/>
  <text x="62" y="64" font-family="Segoe UI, Arial, sans-serif" font-size="14" letter-spacing="1.4" font-weight="700" fill="#b9a8e0">ЗАГЛУШКА · ИЛЛЮСТРАЦИЯ</text>
  <text x="754" y="410" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#9b8fc0">${topic}</text>
</g>
</svg>
`;
}

const slides = [
  {
    file: "q01.svg",
    topic: "Кинематика",
    alt: "Схема: брусок на наклонной плоскости, отмечены скорость, высота и угол наклона",
    scene: sIncline,
  },
  {
    file: "q02.svg",
    topic: "Кинематика",
    alt: "Схема: тело свободно падает с высоты, показано ускорение свободного падения",
    scene: sFreeFall,
  },
  {
    file: "q03.svg",
    topic: "Динамика",
    alt: "Схема: брусок массы m, к которому приложена сила F, и ускорение a",
    scene: sNewton,
  },
  {
    file: "q04.svg",
    topic: "Законы сохранения",
    alt: "Схема: два шара сближаются перед столкновением, показаны скорости",
    scene: sMomentum,
  },
  {
    file: "q05.svg",
    topic: "Законы сохранения",
    alt: "Схема: ящик тянут за верёвку под углом к горизонту",
    scene: sWork,
  },
  {
    file: "q06.svg",
    topic: "Законы сохранения",
    alt: "Схема: математический маятник, показаны крайнее и нижнее положения и высота h",
    scene: sEnergy,
  },
  {
    file: "q07.svg",
    topic: "МКТ",
    alt: "Схема: сосуд с молекулами идеального газа",
    scene: sMolecular,
  },
  {
    file: "q08.svg",
    topic: "МКТ и термодинамика",
    alt: "Схема: цилиндр с поршнем, газ сжимают",
    scene: sGasLaw,
  },
  {
    file: "q09.svg",
    topic: "Термодинамика",
    alt: "Схема: газу передают количество теплоты Q, газ совершает работу A",
    scene: sFirstLaw,
  },
  {
    file: "q10.svg",
    topic: "Электростатика",
    alt: "Схема: два разноимённых заряда притягиваются, показано расстояние r",
    scene: sCoulomb,
  },
  {
    file: "q11.svg",
    topic: "Постоянный ток",
    alt: "Схема электрической цепи с резистором R, источником тока и током I",
    scene: sOhm,
  },
  {
    file: "q12.svg",
    topic: "Электрическое поле",
    alt: "Схема: линии напряжённости электрического поля между заряженными пластинами",
    scene: sField,
  },
];

for (const slide of slides) {
  writeFileSync(join(outDir, slide.file), render(slide), "utf8");
}

console.log(`Generated ${slides.length} placeholder images in ${outDir}`);
