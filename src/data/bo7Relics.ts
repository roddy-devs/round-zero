import type { RelicTier } from './types';

/**
 * A single Black Ops 7 Zombies relic used in the Cursed Mode relic calculator.
 * Data sourced from the bo7_zombies_relic_tracker workbook.
 */
export interface Bo7Relic {
  id: string;
  name: string;
  /** Map the relic is unlocked / available on. */
  map: string;
  tier: RelicTier;
  /** Point value — mirrors tier (Tier 1 = 1pt, Tier 2 = 2pts, Tier 3 = 3pts). */
  points: number;
  effect: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const raw: Omit<Bo7Relic, 'id' | 'points'>[] = [
  // ─── Tier 1 ───
  { name: "Lawyer's Pen", map: 'Ashes of the Damned', tier: 1, effect: 'Shock Mimic props appear across the map.' },
  { name: 'Dragon Wings', map: 'Ashes of the Damned', tier: 1, effect: 'Normal Power-Up spawns are disabled.' },
  { name: 'Teddy Bear', map: 'Ashes of the Damned', tier: 1, effect: 'Round start delay is cut by 75%.' },
  { name: 'Gong', map: 'Astra Malorum', tier: 1, effect: 'Field Upgrade starts charged but only refills from Full Power.' },
  { name: 'Seed', map: 'Astra Malorum', tier: 1, effect: 'Mystery Box is disabled.' },
  { name: 'Rocket', map: 'Paradox Junction', tier: 1, effect: 'No Scorestreaks.' },
  { name: 'Power Switch', map: 'Totenreich', tier: 1, effect: 'Tactical and Lethal Equipment randomize each round.' },
  { name: 'Wrestling Belt', map: 'Totenreich', tier: 1, effect: 'Weapon wall-buys randomize each round.' },
  { name: 'Gramophone', map: 'Kowakujo', tier: 1, effect: 'Bullets deal more damage but each shot uses 2 rounds.' },
  { name: 'Druid Stone', map: 'Kowakujo', tier: 1, effect: 'No bleed-out bar; Self-Revive Kits revive instantly.' },

  // ─── Tier 2 ───
  { name: 'Vril Sphere', map: 'Ashes of the Damned', tier: 2, effect: 'You can only carry 4 Perk-a-Colas.' },
  { name: "Samantha's Drawing", map: 'Ashes of the Damned', tier: 2, effect: 'Every weapon swaps each round but keeps Pack-a-Punch and rarity.' },
  { name: 'Focusing Stone', map: 'Ashes of the Damned', tier: 2, effect: 'No Self-Revive Kits.' },
  { name: 'Spider Fang', map: 'Astra Malorum', tier: 2, effect: 'Perk costs at machines never decrease.' },
  { name: 'Matryoshka Doll', map: 'Astra Malorum', tier: 2, effect: 'Salvage drop rate is halved.' },
  { name: 'Summoning Key', map: 'Paradox Junction', tier: 2, effect: 'Zombies explode on death, damaging nearby players.' },
  { name: 'Stuffed Elephant', map: 'Totenreich', tier: 2, effect: 'Health regen delay is increased.' },
  { name: 'Dancing Arnie', map: 'Totenreich', tier: 2, effect: 'All perk machines give random Perk-a-Colas.' },
  { name: 'Valkyrie Helmet', map: 'Kowakujo', tier: 2, effect: 'Areas you linger in spawn damaging electric fields.' },
  { name: 'Film Reel', map: 'Kowakujo', tier: 2, effect: 'You can only carry one Pack-a-Punch weapon.' },

  // ─── Tier 3 ───
  { name: 'Bus', map: 'Ashes of the Damned', tier: 3, effect: 'Enemy health regenerates.' },
  { name: 'Dragon', map: 'Ashes of the Damned', tier: 3, effect: 'All Ammo Crates are disabled.' },
  { name: 'Blood Vials', map: 'Ashes of the Damned', tier: 3, effect: 'All Augments are turned off.' },
  { name: 'Golden Spork', map: 'Astra Malorum', tier: 3, effect: 'Enemies deal double damage.' },
  { name: 'Civil Protector Head', map: 'Astra Malorum', tier: 3, effect: 'You lose a perk every 100 kills.' },
  { name: 'Mangler Helmet', map: 'Paradox Junction', tier: 3, effect: 'No Arsenal machine.' },
  { name: 'Agarthan Device', map: 'Totenreich', tier: 3, effect: 'Zombie type randomizes each round.' },
  { name: 'Music Box', map: 'Totenreich', tier: 3, effect: 'Enemies only take critical damage.' },
  { name: 'Dragon Egg', map: 'Kowakujo', tier: 3, effect: 'Elites and specials in normal spawns randomize.' },
  { name: 'Mannequin Turret', map: 'Kowakujo', tier: 3, effect: 'No starting armor; only gold wall-buy armor is available.' },
];

export const bo7Relics: Bo7Relic[] = raw.map((r) => ({
  ...r,
  id: `${slugify(r.map)}--${slugify(r.name)}`,
  points: r.tier,
}));

/** Distinct map names in tracker order. */
export const bo7RelicMaps: string[] = Array.from(new Set(bo7Relics.map((r) => r.map)));
