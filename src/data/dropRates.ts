/**
 * Black Ops 7 Zombies drop-rate / mechanics reference data.
 *
 * Primary source: @Nanik0s on X (datamined), posts dated 2026-10-16.
 * Transcribed 2026-10-17. All chances are expressed as fractions of 1
 * (e.g. 0.25 = 25%) unless a field name says otherwise.
 *
 * This module is read-only reference data intended to back both the
 * client-side UI and the planned Round Zero -> Mia JSON API.
 */

// ─────────────────────────────────────────────────────────────────────────
// 1. Mr. Peeks spawn + Cursed/Mayhem egg rarities   (source image 1)
// ─────────────────────────────────────────────────────────────────────────

/** Game mode that governs Mr. Peeks spawning and egg-tier rarities. */
export type CursedModeKind = 'normal' | 'mayhem';

/** Per-round chance for Mr. Peeks to spawn, by mode. */
export const PEEKS_SPAWN_CHANCE: Readonly<Record<CursedModeKind, number>> = {
  normal: 0.1,
  mayhem: 0.3,
};

/** Reward-egg metal tiers that an egg can roll into. */
export interface EggMetalOdds {
  bronze: number;
  silver: number;
  gold: number;
}

/**
 * Egg-tier rarity breakdown. Index by mode, then by egg tier (1-3).
 * Each entry sums to 1.0.
 */
export const EGG_TIER_ODDS: Readonly<
  Record<CursedModeKind, Readonly<Record<1 | 2 | 3, EggMetalOdds>>>
> = {
  normal: {
    1: { bronze: 1.0, silver: 0.0, gold: 0.0 },
    2: { bronze: 0.75, silver: 0.25, gold: 0.0 },
    3: { bronze: 0.5, silver: 0.25, gold: 0.25 },
  },
  mayhem: {
    1: { bronze: 1.0, silver: 0.0, gold: 0.0 },
    2: { bronze: 0.85, silver: 0.15, gold: 0.0 },
    3: { bronze: 0.35, silver: 0.35, gold: 0.3 },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// 2. Free Perk drop-cycle rules   (source image 2)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Total perks the team must hold before a Free Perk enters the drop cycle,
 * keyed by player count.
 */
export const FREE_PERK_REQUIRED_PERKS: Readonly<Record<1 | 2 | 3 | 5, number>> = {
  1: 4, // Solo
  2: 5, // 2 players (total across both)
  3: 6, // 3 players (total across all)
  5: 7, // 5 players (total across all)
};

/**
 * When a power-up drops that is slated to be a Free Perk, this is the chance
 * it actually grants the perk.
 */
export const FREE_PERK_GRANT_CHANCE = 0.25;

/**
 * Once every player in the lobby has this many perks, Free Perk never appears
 * again. Free Perks stay in the cycle while any player is below this count.
 */
export const FREE_PERK_MAX_PERKS = 6;

// ─────────────────────────────────────────────────────────────────────────
// 3. Mystery Box pull rarity, by round   (source images: 10%-WW and 15%-WW)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Mystery Box modes, keyed by the Wonder Weapon chance at round 36+:
 *  - standard_cursed: 10% WW @ 36+  (Standard and Cursed)
 *  - peaks_mayhem:    15% WW @ 36+  (Mr. Peeks Mayhem)
 */
export type MysteryBoxMode = 'standard_cursed' | 'peaks_mayhem';

/** Round bands used by the Mystery Box rarity tables. */
export type RoundBand =
  | '1-5'
  | '6-10'
  | '11-15'
  | '16-20'
  | '21-25'
  | '26-30'
  | '31-35'
  | '36+';

/** Chance of each pull outcome for a Mystery Box spin. Sums to 1.0 per row. */
export interface MysteryBoxRarityOdds {
  uncommon: number;
  rare: number;
  epic: number;
  legendary: number;
  wonderWeapon: number;
  aetherTool: number;
}

/**
 * Mystery Box pull-rarity tables, by mode and round band.
 * A spin first rolls this table; if the outcome is NOT a Wonder Weapon /
 * Aether Tool, the specific gun's rarity is then chosen from
 * WEAPON_RARITY_SELECTION below.
 */
export const MYSTERY_BOX_RARITY: Readonly<
  Record<MysteryBoxMode, Readonly<Record<RoundBand, MysteryBoxRarityOdds>>>
> = {
  // 10% WW @ 36+  (Standard / Cursed)
  standard_cursed: {
    '1-5': { uncommon: 0.7, rare: 0.15, epic: 0.04, legendary: 0.03, wonderWeapon: 0.03, aetherTool: 0.05 },
    '6-10': { uncommon: 0.55, rare: 0.3, epic: 0.04, legendary: 0.03, wonderWeapon: 0.03, aetherTool: 0.05 },
    '11-15': { uncommon: 0.25, rare: 0.55, epic: 0.09, legendary: 0.03, wonderWeapon: 0.03, aetherTool: 0.05 },
    '16-20': { uncommon: 0.16, rare: 0.35, epic: 0.35, legendary: 0.05, wonderWeapon: 0.04, aetherTool: 0.05 },
    '21-25': { uncommon: 0.05, rare: 0.21, epic: 0.55, legendary: 0.1, wonderWeapon: 0.04, aetherTool: 0.05 },
    '26-30': { uncommon: 0.0, rare: 0.1, epic: 0.45, legendary: 0.35, wonderWeapon: 0.05, aetherTool: 0.05 },
    '31-35': { uncommon: 0.0, rare: 0.0, epic: 0.33, legendary: 0.55, wonderWeapon: 0.07, aetherTool: 0.05 },
    '36+': { uncommon: 0.0, rare: 0.0, epic: 0.1, legendary: 0.75, wonderWeapon: 0.1, aetherTool: 0.05 },
  },
  // 15% WW @ 36+  (Mr. Peeks Mayhem)
  peaks_mayhem: {
    '1-5': { uncommon: 0.39, rare: 0.2, epic: 0.15, legendary: 0.13, wonderWeapon: 0.08, aetherTool: 0.05 },
    '6-10': { uncommon: 0.25, rare: 0.3, epic: 0.1, legendary: 0.2, wonderWeapon: 0.1, aetherTool: 0.05 },
    '11-15': { uncommon: 0.15, rare: 0.25, epic: 0.1, legendary: 0.3, wonderWeapon: 0.15, aetherTool: 0.05 },
    '16-20': { uncommon: 0.1, rare: 0.25, epic: 0.15, legendary: 0.3, wonderWeapon: 0.15, aetherTool: 0.05 },
    '21-25': { uncommon: 0.0, rare: 0.05, epic: 0.45, legendary: 0.3, wonderWeapon: 0.15, aetherTool: 0.05 },
    '26-30': { uncommon: 0.0, rare: 0.0, epic: 0.5, legendary: 0.3, wonderWeapon: 0.15, aetherTool: 0.05 },
    '31-35': { uncommon: 0.0, rare: 0.0, epic: 0.3, legendary: 0.45, wonderWeapon: 0.15, aetherTool: 0.1 },
    '36+': { uncommon: 0.0, rare: 0.0, epic: 0.25, legendary: 0.55, wonderWeapon: 0.15, aetherTool: 0.05 },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// 4. Weapon-rarity selection (when the pull is NOT a Wonder Weapon)
//    Green/Blue/Purple/Orange = Uncommon/Rare/Epic/Legendary   (source image)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Weapon-rarity selection modes:
 *  - standard: base game
 *  - cursed:   Cursed mode
 */
export type WeaponRaritySelectionMode = 'standard' | 'cursed';

/** Round bands used by the weapon-rarity selection table. */
export type WeaponRarityRoundBand = '1-5' | '11-15' | '21-25' | '26-30' | '36+';

/**
 * Chance of each weapon rarity being selected once the pull is known to be a
 * normal weapon (i.e. not a Wonder Weapon).
 *   green  = Uncommon
 *   blue   = Rare
 *   purple = Epic
 *   orange = Legendary
 *   ultra  = Ultra (Cursed only; a flat 0.5%. Does not appear in Standard.)
 */
export interface WeaponRaritySelectionOdds {
  green: number;
  blue: number;
  purple: number;
  orange: number;
  ultra?: number;
}

export const WEAPON_RARITY_SELECTION: Readonly<
  Record<
    WeaponRaritySelectionMode,
    Readonly<Partial<Record<WeaponRarityRoundBand, WeaponRaritySelectionOdds>>>
  >
> = {
  standard: {
    '1-5': { green: 0.76, blue: 0.16, purple: 0.04, orange: 0.03 },
    '11-15': { green: 0.27, blue: 0.6, purple: 0.1, orange: 0.03 },
    '21-25': { green: 0.06, blue: 0.23, purple: 0.6, orange: 0.11 },
    '26-30': { green: 0.0, blue: 0.11, purple: 0.5, orange: 0.39 },
    '36+': { green: 0.0, blue: 0.0, purple: 0.12, orange: 0.88 },
  },
  cursed: {
    '1-5': { green: 0.45, blue: 0.23, purple: 0.17, orange: 0.15, ultra: 0.005 },
    '11-15': { green: 0.19, blue: 0.31, purple: 0.13, orange: 0.38, ultra: 0.005 },
    '21-25': { green: 0.0, blue: 0.06, purple: 0.56, orange: 0.38, ultra: 0.005 },
    '36+': { green: 0.0, blue: 0.0, purple: 0.31, orange: 0.69, ultra: 0.005 },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// 5. Multi Pack (Pack-a-Punch) odds   (source image 4)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Multi Pack has a base 25% chance to activate when Pack-a-Punching. Each
 * failed attempt adds another 25% for the next attempt; a success resets it
 * back to the base.
 */
export const MULTI_PACK = {
  /** Chance on the next PaP attempt given the number of consecutive fails. */
  chanceByFails: {
    0: 0.25,
    1: 0.5,
    2: 0.75,
    3: 1.0,
  } as Readonly<Record<0 | 1 | 2 | 3, number>>,
  baseChance: 0.25,
  perFailIncrement: 0.25,
  /** Max fails before a guaranteed activation. */
  guaranteedAfterFails: 3,
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 6. Vending Machine / Mystery Box drop lootpool   (source image 3)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Grenade / food roll rules that run when a Vending Machine drop is generated.
 */
export const VENDING_MACHINE_ROLLS = {
  /** Roll 1-1000; strictly less than this threshold yields a live grenade. */
  liveGrenade: { rollMax: 1000, threshold: 10 },
  /** Roll 1-100; strictly less than this threshold yields food, else loot. */
  food: { rollMax: 100, threshold: 30 },
} as const;

/**
 * Destroying the Mystery Box / vending machine ("MM") grants a fixed number of
 * lootpool items and removes food drops from the pool thereafter.
 */
export const VENDING_MACHINE_DESTROY = {
  itemsGranted: 10,
  removesFoodDrops: true,
  /** Approximate chance to roll a Ray Gun when destroying. */
  raygunChance: 0.134,
} as const;

/** A single entry in the Vending Machine lootpool with its approximate chance. */
export interface LootpoolEntry {
  item: string;
  chance: number;
  /** True when the source lists the value as approximate ("~"). */
  approximate: boolean;
}

/**
 * Full Vending Machine lootpool. Percentages are approximate per the source.
 */
export const VENDING_MACHINE_LOOTPOOL: readonly LootpoolEntry[] = [
  { item: 'Food', chance: 0.297, approximate: true },
  { item: '100 Salvage', chance: 0.2, approximate: true },
  { item: 'Equipment/Self Revive', chance: 0.15, approximate: true },
  { item: '200 Essence', chance: 0.1155, approximate: true },
  { item: '300 Essence', chance: 0.1155, approximate: true },
  { item: 'Perk', chance: 0.05, approximate: true },
  { item: 'Scorestreak', chance: 0.02, approximate: true },
  { item: 'Ammo Mod', chance: 0.010045, approximate: false },
  { item: 'Raygun', chance: 0.010045, approximate: false },
  { item: 'Blue Aether Tool', chance: 0.0100435, approximate: false },
  { item: 'Pap 1 Crystal', chance: 0.0100435, approximate: false },
  { item: 'Live frag grenade', chance: 0.01, approximate: false },
];

// ─────────────────────────────────────────────────────────────────────────
// 7. Weapon-class ("type") distribution   (source: weapon-type image)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Share of ordinary weapon selections by class — i.e. once the pull is known
 * to be a normal weapon (not a Wonder Weapon / Aether Tool). Independent of
 * rarity. Sums to 1.0.
 */
export interface WeaponClassShare {
  weaponClass: string;
  share: number;
}

export const WEAPON_CLASS_SHARES: readonly WeaponClassShare[] = [
  { weaponClass: 'Pistols', share: 0.1 },
  { weaponClass: 'Shotguns', share: 0.1 },
  { weaponClass: 'SMGs', share: 0.2 },
  { weaponClass: 'Assault rifles', share: 0.2 },
  { weaponClass: 'Marksman rifles', share: 0.12 },
  { weaponClass: 'Snipers', share: 0.08 },
  { weaponClass: 'LMGs', share: 0.1 },
  { weaponClass: 'Miscellaneous weapons', share: 0.1 },
];

// ─────────────────────────────────────────────────────────────────────────
// Calculator helpers
// ─────────────────────────────────────────────────────────────────────────

/** Map an arbitrary round number to a Mystery Box rarity round band. */
export function mysteryBoxRoundBand(round: number): RoundBand {
  if (round <= 5) return '1-5';
  if (round <= 10) return '6-10';
  if (round <= 15) return '11-15';
  if (round <= 20) return '16-20';
  if (round <= 25) return '21-25';
  if (round <= 30) return '26-30';
  if (round <= 35) return '31-35';
  return '36+';
}

/**
 * Map a round to the nearest available weapon-rarity-selection band. The
 * selection table is sparser than the box table, so rounds that fall in a gap
 * use the closest defined lower band.
 */
export function weaponRarityBand(
  mode: WeaponRaritySelectionMode,
  round: number,
): WeaponRarityRoundBand {
  const defined = Object.keys(
    WEAPON_RARITY_SELECTION[mode],
  ) as WeaponRarityRoundBand[];
  const lower: Record<WeaponRarityRoundBand, number> = {
    '1-5': 1,
    '11-15': 11,
    '21-25': 21,
    '26-30': 26,
    '36+': 36,
  };
  const sorted = [...defined].sort((a, b) => lower[a] - lower[b]);
  let band: WeaponRarityRoundBand = sorted[0];
  for (const b of sorted) {
    if (round >= lower[b]) band = b;
  }
  return band;
}

/** A resolved odds entry for the combined Mystery Box pull calculation. */
export interface CombinedPullOutcome {
  label: string;
  /** Absolute probability of this exact outcome for a single spin. */
  probability: number;
}

/**
 * Compute the combined per-spin probabilities for a Mystery Box pull.
 *
 * Step 1: the box table gives P(Wonder Weapon), P(Aether Tool), and the
 * total chance of an ordinary weapon.
 * Step 2: the ordinary-weapon chance is split across the weapon-rarity
 * selection table (green/blue/purple/orange, + ultra on Cursed).
 */
export function computeMysteryBoxOutcomes(
  boxMode: MysteryBoxMode,
  rarityMode: WeaponRaritySelectionMode,
  round: number,
): {
  boxBand: RoundBand;
  rarityBand: WeaponRarityRoundBand;
  box: MysteryBoxRarityOdds;
  outcomes: CombinedPullOutcome[];
  ordinaryWeaponChance: number;
} {
  const boxBand = mysteryBoxRoundBand(round);
  const rarityBand = weaponRarityBand(rarityMode, round);
  const box = MYSTERY_BOX_RARITY[boxMode][boxBand];
  const sel = WEAPON_RARITY_SELECTION[rarityMode][rarityBand]!;

  const ultra = sel.ultra ?? 0;
  const selTotal = sel.green + sel.blue + sel.purple + sel.orange + ultra;
  const ordinaryWeaponChance = Math.max(0, 1 - box.wonderWeapon - box.aetherTool);
  const norm = (w: number) =>
    selTotal > 0 ? (w / selTotal) * ordinaryWeaponChance : 0;

  const outcomes: CombinedPullOutcome[] = [
    { label: 'Uncommon weapon', probability: norm(sel.green) },
    { label: 'Rare weapon', probability: norm(sel.blue) },
    { label: 'Epic weapon', probability: norm(sel.purple) },
    { label: 'Legendary weapon', probability: norm(sel.orange) },
  ];
  if (ultra > 0) {
    outcomes.push({ label: 'Ultra weapon', probability: norm(ultra) });
  }
  outcomes.push(
    { label: 'Wonder Weapon', probability: box.wonderWeapon },
    { label: 'Aether Tool', probability: box.aetherTool },
  );
  return { boxBand, rarityBand, box, outcomes, ordinaryWeaponChance };
}

/**
 * Probability that Mr. Peeks has spawned at least once over `rounds` rounds:
 * 1 - (1 - p)^rounds.
 */
export function peeksSpawnedAtLeastOnce(
  mode: CursedModeKind,
  rounds: number,
): number {
  const p = PEEKS_SPAWN_CHANCE[mode];
  return 1 - Math.pow(1 - p, Math.max(0, rounds));
}

/**
 * Multi Pack: cumulative probability of having activated at least once by
 * the end of attempt N (1-indexed), given the escalating per-attempt chances.
 */
export function multiPackCumulative(attempt: number): number {
  let missAll = 1;
  for (let i = 0; i < attempt; i++) {
    const fails = Math.min(i, MULTI_PACK.guaranteedAfterFails) as 0 | 1 | 2 | 3;
    const chance = MULTI_PACK.chanceByFails[fails];
    missAll *= 1 - chance;
  }
  return 1 - missAll;
}