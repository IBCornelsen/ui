// Technik icon library (v6, approved 2026-07-28): names, labels and body metrics
// of the simplified HVAC device drawings.
//
// Style rules of the library: 96×96 grid, inner padding 8, stroke 2.25 px in
// `currentColor`, red/blue supply/return stubs as attachment points for pipes,
// floor-standing devices with a ground line. The drawings live in TechnikIcon.svelte.
//
// The names double as type keys of the manufacturer photo database
// (apps/online-energieausweis/static/images/technik/hersteller/index.json), so
// input tooltips can show example photos without a translation table.

export type TechnikIconName =
  // Heat generators
  | 'wp-luft-aussen' | 'wp-luft-innen' | 'wp-sole' | 'wp-ww'
  | 'gas-wand' | 'gas-boden' | 'gas-gross' | 'oel-boden'
  | 'holz-kamin' | 'holz-wasser' | 'pellet'
  | 'elektro-kessel' | 'elektro-dle' | 'klima-split'
  | 'bhkw' | 'hybrid' | 'fernwaerme'
  // Heat emission
  | 'heizkoerper' | 'fbh' | 'wandheizung' | 'deckenheizung'
  // Storage
  | 'puffer' | 'ww-speicher' | 'kombi'
  // Solar / PV
  | 'solar-flach' | 'solar-roehren' | 'pv-modul' | 'batterie' | 'solar-dach' | 'pv-dach'
  // Ventilation
  | 'lueftung-zentral' | 'lueftung-dezentral' | 'abluft'
  // Cooling (v7 additions, user-approved 2026-07-28)
  | 'kaelteerzeuger' | 'umluftkuehler'
  // Fittings and controls
  | 'pumpe' | 'mischer' | 'regelung' | 'fws' | 'zapfstelle';

export const TECHNIK_ICON_LABEL: Record<TechnikIconName, string> = {
  'wp-luft-aussen': 'Luft-Wasser-Wärmepumpe (außen)',
  'wp-luft-innen': 'Luft-Wasser-Wärmepumpe (innen)',
  'wp-sole': 'Sole-Wasser-Wärmepumpe (Erdwärme)',
  'wp-ww': 'Warmwasser-Wärmepumpe',
  'gas-wand': 'Gas-Brennwertgerät (wandhängend)',
  'gas-boden': 'Gas-Brennwertkessel (bodenstehend)',
  'gas-gross': 'Gas-Großkessel',
  'oel-boden': 'Öl-Brennwertkessel',
  'holz-kamin': 'Kaminofen',
  'holz-wasser': 'Kaminofen wasserführend',
  pellet: 'Pellet-/Scheitholzkessel',
  'elektro-kessel': 'Elektro-Heizkessel',
  'elektro-dle': 'Elektro-Durchlauferhitzer',
  'klima-split': 'Split-/Klimagerät',
  bhkw: 'Blockheizkraftwerk',
  hybrid: 'Hybrid: Wärmepumpe + Brennwert',
  fernwaerme: 'Fernwärme-Übergabestation',
  heizkoerper: 'Heizkörper',
  fbh: 'Fußbodenheizung',
  wandheizung: 'Wandheizung',
  deckenheizung: 'Deckenheizung / Kühldecke',
  puffer: 'Pufferspeicher',
  'ww-speicher': 'Warmwasserspeicher',
  kombi: 'Kombispeicher',
  'solar-flach': 'Solarthermie — Flachkollektor',
  'solar-roehren': 'Solarthermie — Röhrenkollektor',
  'pv-modul': 'Photovoltaik-Modul',
  batterie: 'Batteriespeicher',
  'solar-dach': 'Kollektor auf dem Dach',
  'pv-dach': 'Photovoltaik auf dem Dach',
  'lueftung-zentral': 'Lüftungsanlage zentral (WRG)',
  'lueftung-dezentral': 'Lüftung dezentral (Pendellüfter)',
  abluft: 'Abluftanlage',
  kaelteerzeuger: 'Kälteerzeuger',
  umluftkuehler: 'Umluftkühler',
  pumpe: 'Umwälz-/Zirkulationspumpe',
  mischer: 'Mischer (3-Wege)',
  regelung: 'Regelung / Raumregler',
  fws: 'Frischwasserstation',
  zapfstelle: 'Zapfstelle',
};

// Body = drawn housing without stubs, ground line and surroundings (96 grid).
// Schematic views scale icons so the body fits a target rectangle exactly;
// without an entry the full tile counts as body. `r` = housing corner radius
// (used for the opaque backdrop behind the drawing).
export type IconKorpus = { x: number; y: number; w: number; h: number; r?: number };
export const TECHNIK_ICON_KORPUS: Partial<Record<TechnikIconName, IconKorpus>> = {
  'wp-luft-aussen': { x: 8, y: 28, w: 70, h: 44, r: 6 },
  'wp-luft-innen': { x: 32, y: 14, w: 32, h: 62, r: 5 },
  'wp-sole': { x: 32, y: 10, w: 32, h: 48, r: 5 },
  'wp-ww': { x: 34, y: 26, w: 28, h: 54, r: 11 },
  'gas-wand': { x: 30, y: 12, w: 36, h: 52, r: 6 },
  'gas-boden': { x: 30, y: 16, w: 36, h: 62, r: 6 },
  'gas-gross': { x: 14, y: 30, w: 60, h: 48, r: 6 },
  'oel-boden': { x: 24, y: 26, w: 44, h: 52, r: 10 },
  'holz-kamin': { x: 30, y: 20, w: 36, h: 52, r: 4 },
  'holz-wasser': { x: 28, y: 20, w: 36, h: 52, r: 4 },
  pellet: { x: 22, y: 24, w: 54, h: 54, r: 5 },
  'elektro-kessel': { x: 32, y: 14, w: 32, h: 48, r: 6 },
  'elektro-dle': { x: 34, y: 12, w: 28, h: 44, r: 6 },
  'klima-split': { x: 18, y: 14, w: 62, h: 60, r: 7 },
  bhkw: { x: 16, y: 30, w: 56, h: 46, r: 6 },
  hybrid: { x: 12, y: 16, w: 72, h: 48, r: 5 },
  fernwaerme: { x: 34, y: 28, w: 34, h: 42, r: 5 },
  heizkoerper: { x: 20, y: 28, w: 56, h: 36, r: 4 },
  fbh: { x: 16, y: 50, w: 68, h: 16, r: 2 },
  wandheizung: { x: 28, y: 12, w: 16, h: 68, r: 2 },
  deckenheizung: { x: 16, y: 12, w: 64, h: 14, r: 2 },
  puffer: { x: 34, y: 14, w: 28, h: 66, r: 12 },
  'ww-speicher': { x: 34, y: 14, w: 28, h: 66, r: 12 },
  kombi: { x: 34, y: 12, w: 28, h: 68, r: 12 },
  'lueftung-zentral': { x: 26, y: 26, w: 44, h: 44, r: 6 },
  'lueftung-dezentral': { x: 26, y: 40, w: 44, h: 16, r: 3 },
  abluft: { x: 20, y: 40, w: 56, h: 16, r: 3 },
  kaelteerzeuger: { x: 22, y: 28, w: 52, h: 46, r: 6 },
  umluftkuehler: { x: 16, y: 34, w: 64, h: 30, r: 5 },
  'solar-dach': { x: 16, y: 31, w: 64, h: 33, r: 2 },
  'pv-dach': { x: 16, y: 31, w: 64, h: 33, r: 2 },
  fws: { x: 30, y: 16, w: 36, h: 48, r: 6 },
  regelung: { x: 30, y: 26, w: 36, h: 44, r: 6 },
  zapfstelle: { x: 22, y: 26, w: 44, h: 40, r: 0 },
};

export function iconKorpus(name: TechnikIconName): IconKorpus {
  return TECHNIK_ICON_KORPUS[name] ?? { x: 0, y: 0, w: 96, h: 96, r: 6 };
}

// Named attachment points (96 grid) where pipes may connect a drawing —
// e.g. the storage coil that deliberately ends at the housing edge.
export type IconAnker = { x: number; y: number };
export const TECHNIK_ICON_ANKER: Partial<Record<TechnikIconName, Record<string, IconAnker>>> = {
  puffer: {
    vl: { x: 62, y: 26 },
    rl: { x: 62, y: 68 },
  },
  'ww-speicher': {
    // Heating coil (right), solar coil (left, only drawn with `solarSchlange`),
    // tap-water outlet on top of the tank.
    heizVl: { x: 74, y: 42 },
    heizRl: { x: 74, y: 57 },
    solarVl: { x: 22, y: 58 },
    solarRl: { x: 22, y: 73 },
    oben: { x: 48, y: 14 },
  },
  kombi: {
    heizVl: { x: 74, y: 52 },
    heizRl: { x: 74, y: 67 },
    solarVl: { x: 22, y: 65 },
    solarRl: { x: 22, y: 73 },
    oben: { x: 48, y: 12 },
  },
  zapfstelle: {
    zulauf: { x: 22, y: 34 },
  },
};

export function iconAnker(name: TechnikIconName, ankerName: string): IconAnker | null {
  return TECHNIK_ICON_ANKER[name]?.[ankerName] ?? null;
}
