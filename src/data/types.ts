export interface MediaRef {
  type: 'image' | 'video' | 'gif';
  url: string;
  caption?: string;
}

export interface Step {
  id: string;
  text: string;
  location?: string;
  details?: string;
  media?: MediaRef;
  substeps?: SubStep[];
  isNote?: boolean;
  /** Renders an inline link that switches to the Wonder Weapon tab */
  wonderWeaponLink?: boolean;
}

export interface SubStep {
  id: string;
  text: string;
  location?: string;
  media?: MediaRef;
}

export interface Section {
  id: string;
  title: string;
  steps: Step[];
}

export interface MapData {
  slug: string;
  name: string;
  game: string;
  subtitle: string;
  description: string;
  wonderWeapon: {
    name: string;
    sections: Section[];
  };
  mainQuest: {
    name: string;
    sections: Section[];
  };
  relics: Relic[];
}

export type RelicTier = 1 | 2 | 3;

export interface Relic {
  id: string;
  name: string;
  tier: RelicTier;
  effect: string;
  steps: string[];
}
