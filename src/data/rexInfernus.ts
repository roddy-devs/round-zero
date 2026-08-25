import type { MapData } from './types';

export const rexInfernus: MapData = {
  slug: 'rex-infernus',
  name: 'Rex Infernus',
  game: 'Black Ops 7',
  subtitle: 'Cleanse the Shadow Smith\'s place of power.',
  description:
    "As reality stands on the cusp of destruction, the crew face their ultimate challenge. Cleanse the Shadowsmith places of power, find the Warden's inner sanctum, and put an end to his loathsome existence.",
  wonderWeapon: {
    name: 'TBD',
    sections: [
      {
        id: 'ww-wip',
        title: 'Wonder Weapon Guide Pending',
        steps: [
          {
            id: 'ww-wip-1',
            text: 'Wonder Weapon steps for Rex Infernus will be added as soon as they are verified.',
            isNote: true,
          },
        ],
      },
    ],
  },
  mainQuest: {
    name: 'Rex Infernus Main Quest',
    sections: [
      {
        id: 'mq-symbol-tracking',
        title: '🔴 CRITICAL: Symbol Tracking Instructions',
        steps: [
          {
            id: 'mq-0',
            text: '📍 IMPORTANT: Throughout the quest, symbols will appear on the house after each round change (when you shoot the basketball).',
            isNote: true,
          },
          {
            id: 'mq-0b',
            text: '✅ DO: Write down the order symbols appear (Rounds 1, 2, 3, 4, etc.)',
            isNote: true,
          },
          {
            id: 'mq-0c',
            text: '❌ DO NOT: Shoot the symbols yet! You will shoot them ONLY during an Exfil round, in the exact order they appeared.',
            isNote: true,
          },
          {
            id: 'mq-0d',
            text: 'You\'ll need the symbol order later for a critical step, so make sure you track them from the very beginning!',
            isNote: true,
          },
        ],
      },
      {
        id: 'mq-setup',
        title: 'Initial Setup',
        steps: [
          { id: 'mq-1', text: 'Spawn in and go through the first door.' },
          { id: 'mq-2', text: 'Wait for the phone to ring and answer it.' },
          {
            id: 'mq-3',
            text: 'Before teleporting, look up and shoot down the basketball.',
            details: '⚠️ HUGE NOTE: After you shoot this basketball, symbols will BEGIN appearing on the house each round. Start paying attention NOW and record the order they appear!',
          },
          { id: 'mq-4', text: 'Take the teleporter and place the world seed in the center of the pedestal.' },
          { id: 'mq-5', text: 'Two dread skulls become available — shoot each and follow to their temple.' },
          { id: 'mq-6', text: 'Keep shooting each skull as you\'re able. Screen flashes white when destroyed.' },
          { id: 'mq-7', text: 'Two braziers appear (marked on screen) — throw the flame into each.' },
        ],
      },
      {
        id: 'mq-pack-a-punch',
        title: 'Activate Pack-a-Punch',
        steps: [
          { id: 'mq-8', text: 'Turn both dials.' },
          { id: 'mq-9', text: 'Pack-a-Punch is now activated.' },
        ],
      },
      {
        id: 'mq-caltheris',
        title: 'Caltheris\'s Temple - Pressure Plates',
        steps: [
          { id: 'mq-10', text: 'Enter Caltheris\'s temple and look to your left.', location: 'Caltheris Temple' },
          { id: 'mq-11', text: 'Four pressure plates on ground (first one risen).' },
          {
            id: 'mq-12',
            text: 'Stand on a plate WITHOUT moving off it and shoot four targets.',
            details: 'Second plate rises after each target sequence.',
          },
          { id: 'mq-13', text: 'Repeat until all four plates are complete.' },
          { id: 'mq-14', text: 'Open compartment to find lantern and interact with it.' },
          { id: 'mq-15', text: 'Orbs spawn around the map.' },
        ],
      },
      {
        id: 'mq-dravakar-fracture',
        title: 'Dravakar\'s Temple - Get Fracture',
        steps: [
          { id: 'mq-16', text: 'Enter Dravakar\'s temple and turn around to look up.', location: 'Dravakar Temple' },
          { id: 'mq-17', text: 'Alcove above entrance — grapple up (faster than wall jump).' },
          { id: 'mq-18', text: 'Find crack in wall (right side, facing entrance).' },
          { id: 'mq-19', text: 'Throw grenade or PHD Flop at crack to reveal Nick Sarah\'s Fracture.' },
          { id: 'mq-20', text: 'Collect the Fracture.' },
        ],
      },
      {
        id: 'mq-dravakar-switches',
        title: 'Dravakar\'s Temple - Solve Switches',
        steps: [
          { id: 'mq-21', text: 'Go to the next door with blue writing on the wall.', location: 'Dravakar Temple' },
          {
            id: 'mq-22',
            text: 'Blue writing shows dial instructions.',
            details: 'Use the pillar solver tool to determine exact switch sequence.',
          },
          { id: 'mq-23', text: 'Interact and follow solver sequence.' },
        ],
      },
      {
        id: 'mq-nixara-dials',
        title: 'Nixara\'s Temple - Dial Configuration',
        steps: [
          { id: 'mq-24', text: 'Open both doors in Nixara\'s temple.', location: 'Nixara Temple' },
          { id: 'mq-25', text: 'Turn right (facing the eye at back of room) and find the first dial in the back above the rubble.' },
          {
            id: 'mq-26',
            text: 'Dial Configuration:',
            details: 'Dial 1: Middle | Dial 2: Right | Dial 3: Left | Dial 4: Right | Dial 5: Middle | Dial 6: Middle | Dial 7: Left',
          },
          { id: 'mq-27', text: 'Wall jump to dial 5 and place Fracture from Dravakar.' },
          { id: 'mq-28', text: 'Use Void Gun to pull orb into Nexus Forge center.' },
          { id: 'mq-29', text: 'Turn forge wheel — purple flames fill braziers.' },
        ],
      },
      {
        id: 'mq-eye-shot',
        title: 'Eye Collection & House Lockdown',
        steps: [
          { id: 'mq-30', text: 'Go to Nixara\'s Sanctuary (back of room with eye).' },
          { id: 'mq-31', text: 'Shoot eye with purple flame.' },
          { id: 'mq-32', text: 'Use Grapple Gun or Void Gun to return quickly (tight time window).' },
          { id: 'mq-33', text: 'Laser door opens with correct dials and Fracture placed.' },
          { id: 'mq-34', text: 'Enter new room and walk to orb.' },
          { id: 'mq-35', text: 'Orb shocks you and drops you down.' },
          { id: 'mq-36', text: 'Kill spiders and walk toward tree.' },
        ],
      },
      {
        id: 'mq-soulbox',
        title: 'Soulbox Step & Tree Fruit Collection',
        steps: [
          {
            id: 'mq-37',
            text: 'Soulbox step begins — your health drains throughout.',
            details: 'Recommended: Have Quick Revive and/or Jug equipped.',
          },
          { id: 'mq-38', text: 'Complete soulbox step (health must not reach zero).' },
          {
            id: 'mq-39',
            text: 'Round 8+: Interact with tree to collect fruit.',
            details: 'Three collection points in forest (auto-teleports between them).',
          },
          {
            id: 'mq-40',
            text: 'Three parts to collect:',
            substeps: [
              { id: 'mq-40a', text: 'By cabin on floor to left of body — melee floorboard' },
              { id: 'mq-40b', text: 'Middle of forest on rock with ammo crate — interact with body' },
              { id: 'mq-40c', text: 'Back of forest — interact with body on ground' },
            ],
          },
          { id: 'mq-41', text: 'Tip: Hold A+direction or move+hold to skip animations.' },
        ],
      },
      {
        id: 'mq-wonder-weapon',
        title: 'Get Wonder Weapon from Forge',
        steps: [
          { id: 'mq-42', text: 'After collecting third part, teleported back to tree.' },
          { id: 'mq-43', text: 'Go to Dravakar Sanctuary (where you flipped switches).' },
          { id: 'mq-44', text: 'Use Void Claw to spring-launch up to Dravakar\'s Forge.' },
          { id: 'mq-45', text: 'Equip Shatter Blast before entering — four shields require activation.' },
          { id: 'mq-46', text: 'Interact with forge to craft wonder weapon.' },
          {
            id: 'mq-47',
            text: 'Shields reveal:',
            substeps: [
              { id: 'mq-47a', text: 'Hammer (part needed for cleansing)' },
              { id: 'mq-47b', text: 'Lightman ammo mod' },
              { id: 'mq-47c', text: 'Shadow Rift ammo mod' },
              { id: 'mq-47d', text: 'Self-revive' },
            ],
          },
        ],
      },
      {
        id: 'mq-rarity-exchange',
        title: 'Weapon Rarity Exchange (Optional)',
        steps: [
          {
            id: 'mq-48',
            text: 'Optional: Go to Dravakar\'s Forge and place a weapon on it.',
            details: 'You don\'t have to go there every round, but you can. Removes rarity, drops Ether tool. Pack-a-Punch weapons drop crystals.',
          },
          {
            id: 'mq-48b',
            text: 'Suggestion: Be ready with all symbols collected by round 11 (or the next Exfil round you\'re targeting).',
            isNote: true,
          },
        ],
      },
      {
        id: 'mq-exfil',
        title: 'Exfil Round & Eye Collection',
        steps: [
          { id: 'mq-51', text: 'Enter an Exfil round.' },
          { id: 'mq-52', text: 'Shoot house symbols in the order they appeared.' },
          { id: 'mq-53', text: 'Enter Exfil booth and kill spawned HVT.' },
          { id: 'mq-54', text: 'Go through Exfil booth — returns to house.' },
          { id: 'mq-55', text: 'Interact with girls playing on ground for free Pack-a-Punch crystal.' },
          { id: 'mq-56', text: 'Go upstairs to back and charge shot wonder weapon into toilet.' },
          { id: 'mq-57', text: 'Eye of the Forge emerges from toilet.' },
          { id: 'mq-58', text: 'Lockdown: Kill all Doppelghasts and Ravagers.' },
          { id: 'mq-59', text: 'Receive phone call — teleporter opens back to map.' },
        ],
      },
      {
        id: 'mq-symbol-catchup',
        title: 'Symbol Tracking Catch-Up (If You Miss Rounds)',
        steps: [
          {
            id: 'mq-59b',
            text: 'If you miss tracking symbols for 1-2 rounds: Pop a round off and shoot all the symbols you know.',
            isNote: true,
          },
          {
            id: 'mq-59c',
            text: 'The symbols will reset and you can start fresh tracking from that point.',
            isNote: true,
          },
          {
            id: 'mq-59d',
            text: 'When you reach an Exfil round (11, 16, 21, etc.), you\'ll have all the symbols you need for that round.',
            isNote: true,
          },
        ],
      },
      {
        id: 'mq-void-talon',
        title: 'Upgrade to Void Talon',
        steps: [
          { id: 'mq-60', text: 'Interact with Void Gun pedestal.' },
          { id: 'mq-61', text: 'Void Gun upgrades to Void Talon (double duration usage).' },
        ],
      },
      {
        id: 'mq-pillar-walls',
        title: 'Clear Pillar Walls',
        steps: [
          { id: 'mq-62', text: 'Go to bottom of forge or middle of map and find three pillars.' },
          { id: 'mq-63', text: 'Remove eye squares using Void Gun (top of forge).' },
          { id: 'mq-64', text: 'Go downstairs and remove squares from wall.' },
          { id: 'mq-65', text: 'Back of forge revealed — spiders spawn.' },
          { id: 'mq-66', text: 'Use charge shot or grenade to break spider webs (both sides).' },
        ],
      },
      {
        id: 'mq-collect-items',
        title: 'Collect Temple Items for Cleansing',
        steps: [
          { id: 'mq-67', text: 'Dravakar\'s Hammer: Already grabbed from fracture area.' },
          {
            id: 'mq-68',
            text: 'Caltheris\'s Thread (Shimmering Thread):',
            details: 'Use Void Gun to pull orbs toward you and interact. Alternative: Use lantern in Caltheris Sanctuary.',
          },
          {
            id: 'mq-69',
            text: 'Veytharion\'s Woven Sash:',
            details: 'Only available when raining. Locations: By Jug, By PhD, By Widow\'s Wine.',
          },
          {
            id: 'mq-70',
            text: 'Nixara\'s Scroll:',
            details: 'Equip Shadow Rift and train zombies in forest. Get activation on multiple zombies for drop.',
          },
        ],
      },
      {
        id: 'mq-temple-cleansing',
        title: 'Temple Cleansing Process (All 4 Temples)',
        steps: [
          { id: 'mq-71', text: 'For each temple: Place collected item in temple brazier.' },
          { id: 'mq-72', text: 'Pull orb to center of Nexus Forge and turn forge wheel.' },
          { id: 'mq-73', text: 'Two purple flames appear in brazier — take and light respective temple brazier.' },
          { id: 'mq-74', text: 'Bring zombie over to become infected.' },
          {
            id: 'mq-75',
            text: 'Take infected zombie to trap:',
            details: 'Dravakar/Caltheris → Caltheris trap | Veytharion/Nixara → Veytharion trap',
          },
          { id: 'mq-76', text: 'Bring zombie to middle of trap and activate (auto-routes correctly).' },
          { id: 'mq-77', text: 'Shackle/cuff removes from Titan.' },
          {
            id: 'mq-78',
            text: 'Plate mechanics (interact, then):',
            substeps: [
              { id: 'mq-78a', text: 'Caltheris: ADS gun continuously' },
              { id: 'mq-78b', text: 'Dravakar: Stand on plate while shooting' },
              { id: 'mq-78c', text: 'Veytharion: Jump repeatedly on plate' },
              { id: 'mq-78d', text: 'Nixara: Go prone on plate' },
            ],
          },
          { id: 'mq-79', text: 'Align ocular circle with wall, kill zombies for soul cracks.' },
          { id: 'mq-80', text: 'Shoot boss\'s face — four soul beings spawn and must be killed.' },
          { id: 'mq-81', text: 'Shoot face again to complete temple.' },
        ],
      },
      {
        id: 'mq-rain-puzzle',
        title: 'Unlock Rain (Veytharion Puzzle - Optional)',
        steps: [
          {
            id: 'mq-82',
            text: 'Optional: Unlock rain by solving Veytharion\'s puzzle (needed if boss lightning strikes must happen during a specific round).',
            isNote: true,
          },
          { id: 'mq-83', text: 'Go to Veytharion\'s temple and open first door.' },
          { id: 'mq-84', text: 'Look left for block puzzle (four blocks around Veytharion temple area).' },
          {
            id: 'mq-85',
            text: 'Stack order (bottom to top): Water → Plant → Hand → Fire',
            details: 'Water on bottom, fire only touches hand.',
          },
          { id: 'mq-86', text: 'Interact with fountain — rain occurs on next round (repeatable each round).' },
          {
            id: 'mq-86b',
            text: 'Note: You can do other steps during spider rounds and don\'t have to activate rain immediately if not needed.',
            isNote: true,
          },
        ],
      },
      {
        id: 'mq-boss-strikes',
        title: 'Boss Lightning Strikes & Final Cleansing',
        steps: [
          {
            id: 'mq-92b',
            text: '⚠️ CRITICAL: Boss lightning strikes MUST occur during a raining round. Make sure rain is active.',
            isNote: true,
          },
          { id: 'mq-86', text: 'Place orb underneath chin of each boss (face area).' },
          { id: 'mq-87', text: 'Charge shot wonder weapon at orb — goes into forehead.' },
          { id: 'mq-88', text: 'Pull orb to forge center and turn wheel.' },
          { id: 'mq-89', text: 'Two more flames appear in brazier.' },
          { id: 'mq-90', text: 'During rain round, take flame and hit boss in forehead.' },
          { id: 'mq-91', text: 'Lightning strike occurs — repeat for all four bosses.' },
          {
            id: 'mq-92',
            text: 'Flexible sequence:',
            details: 'Pillars don\'t need alignment for strikes. Can do lockdowns, pillar alignment, and other bosses simultaneously.',
          },
        ],
      },
      {
        id: 'mq-boss-fight',
        title: 'Start Boss Fight',
        steps: [
          { id: 'mq-93', text: 'Go below Nexus Forge to find four platforms.' },
          { id: 'mq-94', text: 'Stand on any platform (co-op: all players must stand on platforms).' },
          { id: 'mq-95', text: 'Boss fight begins when all conditions are met.' },
        ],
      },
    ],
  },
  relics: [],
};
