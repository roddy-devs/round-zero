import type { MapData } from './types';

export const kowakujo: MapData = {
  slug: 'kowakujo',
  name: 'Kowakujo',
  game: 'Black Ops 7',
  subtitle: 'Expel the Onryo',
  description:
    'Investigate a Japanese castle to solve a murder mystery, gather evidence, and expel the Onryo spirit before confronting Nyxara in the Volcano.',
  wonderWeapon: {
    name: 'Nekomancer',
    sections: [
      {
        id: 'ww-maneki',
        title: 'Build the Maneki-Neko',
        steps: [
          { id: 'ww-1', text: 'Build the Maneki-Neko at the bench near Vulture Aid in Workshop.' },
        ],
      },
      {
        id: 'ww-cage',
        title: 'Free the Nekomata',
        steps: [
          {
            id: 'ww-2',
            text: 'With PhD Flopper equipped, dive to prone below the suspended cage at Tenshu Entrance to drop it.',
          },
          { id: 'ww-3', text: 'Pick up the cage and throw it into lava. The cage melts and a Nekomata runs away.' },
          {
            id: 'ww-4',
            text: 'Get a kill at the entrance of one of the doorways until glowing paw prints spawn.',
            details:
              'Locations: Flower Garden → Kitchens | Kitchens → Central Courtyard | Stables → Staging Area | Training Area → Stables',
          },
          {
            id: 'ww-5',
            text: 'Follow the paw prints — walk about 8 meters in the direction they point, get another kill. Repeat until you find a triangular shape of paw prints.',
            details: 'Tip: Ping the paws, then move away until it says "8 meters".',
          },
          {
            id: 'ww-6',
            text: 'Throw the Maneki-Neko in the middle of the triangle. The Nekomata will jump out of the lava.',
            details: 'Note: the lava must NOT be cooled during this step.',
          },
          { id: 'ww-7', text: 'An Abomination will spawn and eat the Nekomata. Kill the Abomination to free it.' },
        ],
      },
      {
        id: 'ww-catch',
        title: 'Catch the Nekomata',
        steps: [
          {
            id: 'ww-8',
            text: 'Wait for the next round. The Nekomata will appear near creaky floorboards in Kitchens or Training Area.',
          },
          {
            id: 'ww-9',
            text: 'Sneak to the Nekomata by avoiding the floorboards (highlighted with Death Perception). Pick it up.',
          },
          { id: 'ww-10', text: 'Bring the Nekomata to the World Seed next to Pack-a-Punch. It will jump on the seed.' },
          {
            id: 'ww-11',
            text: 'Wait until the seed traps the Nekomata and pulses red. Rush and melee the seed repeatedly to free it.',
          },
          { id: 'ww-12', text: 'Pick up the Nekomancer from the floor.' },
        ],
      },
    ],
  },
  mainQuest: {
    name: 'Expel the Onryo',
    sections: [
      {
        id: 'mq-parts',
        title: 'Build the Maneki-Neko Bomb',
        steps: [
          {
            id: 'mq-1',
            text: 'You can do all of this at the same time as you make your way up to the Shogun Sanctum — grab the Maneki-Neko Bomb parts and capture the two Wards along the way.',
            isNote: true,
          },
          {
            id: 'mq-1b',
            text: 'Capture the two Wards.',
            substeps: [
              { id: 'mq-1b1', text: 'Ward in the Training Area', location: 'Training Area' },
              { id: 'mq-1b2', text: 'Ward in the Kitchens', location: 'Kitchens' },
            ],
          },
          {
            id: 'mq-2',
            text: 'Find the Furin. It spawns in one of three locations.',
            substeps: [
              { id: 'mq-2a', text: 'Staging Area — as soon as you open it up', location: 'Staging Area', media: { type: 'image', url: '/images/kowakujo/furin-1.webp' } },
              { id: 'mq-2b', text: 'Broken house inside of the Stables', location: 'Stables', media: { type: 'image', url: '/images/kowakujo/furin-2.webp' } },
              { id: 'mq-2c', text: 'Above the Warden wall in the Training Area', location: 'Training Area', media: { type: 'image', url: '/images/kowakujo/furin-3.webp' } },
            ],
          },
          {
            id: 'mq-3',
            text: 'Find the Maneki-Neko. It spawns in one of three locations.',
            substeps: [
              { id: 'mq-3a', text: 'In the Kitchen, to the left of the Mystery Box', location: 'Kitchens', media: { type: 'image', url: '/images/kowakujo/maneki-neko-kitchen-1.webp' } },
              { id: 'mq-3b', text: 'In the Kitchen, on the barrels across from the Double Tap perk machine', location: 'Kitchens', media: { type: 'image', url: '/images/kowakujo/maneki-neko-kitchen-2.webp' } },
              { id: 'mq-3c', text: 'Inside the Gatehouse', location: 'Gatehouse', media: { type: 'image', url: '/images/kowakujo/maneki-neko-gate.webp' } },
            ],
          },
          {
            id: 'mq-4',
            text: 'Find the Karakuri. It spawns in one of three locations.',
            substeps: [
              { id: 'mq-4a', text: 'Storage Room — across from the PhD machine', location: 'Storage Rooms', media: { type: 'image', url: '/images/kowakujo/karakuri-storage-room-1.webp' } },
              { id: 'mq-4b', text: 'Storage Room — on the table across from the Mystery Box', location: 'Storage Rooms', media: { type: 'image', url: '/images/kowakujo/karakuri-storage-room-2.webp' } },
              { id: 'mq-4c', text: 'Workshop — to your left right before the stairs, as you open the door', location: 'Workshop', media: { type: 'image', url: '/images/kowakujo/karakuri-workshop.webp' } },
            ],
          },
          {
            id: 'mq-4d',
            text: 'Build the Maneki-Neko Bomb and make sure it is in your inventory as a tactical.',
            media: { type: 'gif', url: '/images/kowakujo/building-maneki-neko.gif' },
          },
        ],
      },
      {
        id: 'mq-sanctum',
        title: 'Open the Shogun Sanctum',
        steps: [
          {
            id: 'mq-5',
            text: 'Make your way up to the Shogun Sanctum entrance. An Oni will spawn that you must kill.',
            location: 'Shogun Sanctum Entrance',
          },
          {
            id: 'mq-6',
            text: 'The Oni drops the Shogun\'s Hanko. Pick it up and use it to open the Shogun Sanctum.',
            media: { type: 'image', url: '/images/kowakujo/shoguns-hanko.webp' },
          },
          {
            id: 'mq-7',
            text: 'Inside the War Room, pick up the Shard Evidence to the left of the door.',
            location: 'War Room',
            media: { type: 'image', url: '/images/kowakujo/ceramic-shard.webp' },
          },
          {
            id: 'mq-8',
            text: 'Pick up the Poison Compendium on the shelf to the left.',
            location: 'War Room',
            media: { type: 'gif', url: '/images/kowakujo/poison-compendium.gif' },
          },
        ],
      },
      {
        id: 'mq-pap',
        title: 'Activate Pack-a-Punch',
        steps: [
          {
            id: 'mq-9',
            text: 'Go up to the Shogun\'s Sanctum and find the World Seed. Kill zombies near it to fill the soul box.',
            location: 'Shogun\'s Sanctum',
          },
          {
            id: 'mq-10',
            text: 'Once enough souls are collected, Pack-a-Punch activates.',
          },
        ],
      },
      {
        id: 'mq-nekomancer-start',
        title: 'Drop the Cage',
        steps: [
          {
            id: 'mq-11',
            text: 'Buy PhD Flopper.',
          },
          {
            id: 'mq-12',
            text: 'Dive to prone below the suspended cage at Tenshu Entrance to drop it.',
            location: 'Tenshu Entrance',
            media: { type: 'gif', url: '/images/kowakujo/dive-for-cage.gif' },
          },
          {
            id: 'mq-13',
            text: 'Pick up the cage and throw it into the lava. It can be at one of four locations.',
            substeps: [
              { id: 'mq-13a', text: 'Kitchens', location: 'Kitchens' },
              { id: 'mq-13b', text: 'Tea Garden', location: 'Tea Garden' },
              { id: 'mq-13c', text: 'Stables', location: 'Stables' },
              { id: 'mq-13d', text: 'Training Area', location: 'Training Area' },
            ],
          },
          {
            id: 'mq-14',
            text: 'Wait for a Fissure to appear on the map. Once it appears, wait 1 minute and 45 seconds for the fissure to disappear — this is when the lava paw prints will spawn.',
          },
        ],
      },
      {
        id: 'mq-paw-prints',
        title: 'Follow the Paw Prints',
        steps: [
          {
            id: 'mq-15',
            text: 'Find the glowing paw prints. They spawn at one of four doorway entrances.',
            substeps: [
              { id: 'mq-15a', text: 'Kitchens', location: 'Kitchens' },
              { id: 'mq-15b', text: 'Flower Garden', location: 'Flower Garden' },
              { id: 'mq-15c', text: 'Stables', location: 'Stables' },
              { id: 'mq-15d', text: 'Training Area', location: 'Training Area' },
            ],
          },
          {
            id: 'mq-16',
            text: 'Get a kill near the paw prints to activate them. They will point in a direction.',
          },
          {
            id: 'mq-17',
            text: 'Walk about 8 meters in that direction and get another kill. New paw prints will appear. Repeat until you find a triangular shape made of paw prints.',
            details: 'Tip: Ping the paws, then move away until it says "8 meters".',
          },
          {
            id: 'mq-18',
            text: 'Throw the Maneki-Neko into the middle of the triangle. The Nekomata will jump out of the lava.',
            details: 'The lava must NOT be cooled during this step.',
          },
          {
            id: 'mq-19',
            text: 'An Abomination will spawn and eat the Nekomata. Kill the Abomination to free it.',
          },
        ],
      },
      {
        id: 'mq-catch-nekomata',
        title: 'Catch the Nekomata',
        steps: [
          {
            id: 'mq-20',
            text: 'The Nekomata will appear at one of three locations. Equip Death Perception to highlight the creaky floorboards.',
            substeps: [
              { id: 'mq-20a', text: 'Kitchens — first spot', location: 'Kitchens' },
              { id: 'mq-20b', text: 'Kitchens — second spot', location: 'Kitchens' },
              { id: 'mq-20c', text: 'Training Area', location: 'Training Area' },
            ],
          },
          {
            id: 'mq-21',
            text: 'Sneak up on the Nekomata by avoiding the floorboards. Pick it up.',
          },
          {
            id: 'mq-22',
            text: 'Bring the Nekomata to the World Seed next to Pack-a-Punch. It will jump onto the Seed on its own.',
            location: 'Shogun\'s Sanctum',
          },
          {
            id: 'mq-23',
            text: 'Wait for the Seed to trap the Nekomata and pulse red. Melee the Seed three times to free it.',
          },
          {
            id: 'mq-24',
            text: 'Pick up the Nekomancer off the floor.',
          },
        ],
      },
      {
        id: 'mq-suspect',
        title: '#1 — Suspect Evidences',
        steps: [
          {
            id: 'mq-s1',
            text: 'The Fox Mask moves and hides around the map. Shoot it to drop evidence pieces.',
          },
          { id: 'mq-s2', text: 'Takeshi\'s Pipe: Bottom of a shelf left of stairs in Workshop.' },
          { id: 'mq-s3', text: 'Takeo\'s Case: In the ceiling in Collapse Study.' },
          { id: 'mq-s4', text: 'Mitsuhime\'s Comb: Far left outside the window left of Elemental Pop in Onsen Baths.' },
          { id: 'mq-s5', text: 'Place all three items on the shelves in Meditation Room.' },
        ],
      },
      {
        id: 'mq-accomplice',
        title: '#2 — Accomplice Evidences',
        steps: [
          {
            id: 'mq-a1',
            text: 'Find a wooden coin at the base of a Mystery Box location. Bring the Mystery Box to that location.',
          },
          {
            id: 'mq-a2',
            text: 'Throw the Maneki-Neko in front of the box while using it. Pick up the Coin Purse.',
          },
          {
            id: 'mq-a3',
            text: 'Place the Coin Purse in Outer Ward (right of Rampage Inducer) and interact to trigger a cinematic.',
          },
          {
            id: 'mq-a4',
            text: 'Merchant: In Kitchens, knock a fruit from the basket on a shelf. Leave and return — a zombie eats it. Bring zombie to Staging Area shack window and kill it. Kill the Merchant for Sales Log and Mercantile Abacus.',
          },
          {
            id: 'mq-a5',
            text: 'Gardener: Fill a Bucket from pools in Tea Garden or Onsen Baths (holds 3 parts, loses parts from running/hits). Water three plants in Flower Garden. Kill the Gardener by shooting glowing flowers near doorways when immune. Collect Gardening Shears and Gardener\'s Note.',
          },
          {
            id: 'mq-a6',
            text: 'Noble: Throw Decoy grenades at the windows on top of the building opposite Melee Macchiato in Training Area. Throw back the Noble\'s grenades until killed. Collect Noble\'s Hat and Diary.',
          },
          { id: 'mq-a7', text: 'Place all three items on the shelves in Meditation Room.' },
        ],
      },
      {
        id: 'mq-poison',
        title: '#3 — Poison Evidences',
        steps: [
          {
            id: 'mq-p1',
            text: 'Monkshood Flower: Shoot the wooden beam above the Ammo Cache in Training Area with charged Nekomancer to get Empty Pouch. Collect Volcanic Ash from a Fissure. Get Monkshood Bud near the lava river in Flower Garden. Plant bud in pot near Exfil in Tenshu Entrance, add Volcanic Ash. Melee a cherry blossom tree until it glows, run in circles near the pot until the plant grows.',
          },
          {
            id: 'mq-p2',
            text: 'Plum Pit: In Kitchens, melee the small basket on a shelf near the fire pit to drop a plum. Jump on it repeatedly until it becomes the Plum Pit.',
          },
          {
            id: 'mq-p3',
            text: 'Pufferfish: In Storage Rooms, solve the 3×3 scroll rack puzzle (melee scrolls into place). Collect the Pestel and Death Records.',
            details: 'Solver: https://kowakujo-scroll-solver.netlify.app/',
          },
          {
            id: 'mq-p4',
            text: 'Place the Pestel in the bowl on the kamado stove in Kitchens (requires Nekomancer or Brain Rot). Kill zombies near the bowl to fill it. Collect the Pufferfish from the corner.',
          },
          { id: 'mq-p5', text: 'Place all three items on the shelves in Meditation Room.' },
        ],
      },
      {
        id: 'mq-location',
        title: '#4 — Location Evidences',
        steps: [
          {
            id: 'mq-l1',
            text: 'Pick up Ceramic Shards from the poison painting. Bring them to the table in Tea Garden to repair the Sake Cup.',
          },
          { id: 'mq-l2', text: 'Wait for the next round. Interact with the ghostly blue cup to trigger a cinematic, then pick it up.' },
          {
            id: 'mq-l3',
            text: 'Horse Statuette: Place the cup on the tray near the map of Japan in War Room. Defend it from zombies.',
          },
          {
            id: 'mq-l4',
            text: 'Calligraphy Brush: Place the cup on the tray in Collapse Study (left of Der Wunderfizz). Defend it.',
          },
          {
            id: 'mq-l5',
            text: 'Tea Whisk: Place the cup on the tray in Tea Garden. Defend it. A Hellhound spawns — kill it for the Tea Whisk.',
          },
          { id: 'mq-l6', text: 'Place all three items on the shelves in Meditation Room.' },
        ],
      },
      {
        id: 'mq-motive',
        title: '#5 — Motive Evidences',
        steps: [
          { id: 'mq-m1', text: 'Shogun\'s Hanko: Collected from killing the first Oni to open Pack-a-Punch.' },
          {
            id: 'mq-m2',
            text: 'Netsuke of Brothers: In Stables, wait for lava to cool, throw an explosive at the visible statue to knock it down.',
          },
          {
            id: 'mq-m3',
            text: 'Crest Medallion: Interact with the clock in Storage Room rubble. Melee it for 4 numbers. After an Assault Wave, place banners in Staging Area into bamboo tubes matching the clock order and Japanese numeral positions (一二三四).',
            details: 'Banner positions: Tea Garden, Stables, Central Courtyard, Outer Ward. If no banner matches the number exactly, use two banners.',
          },
          { id: 'mq-m4', text: 'Place all three items on the shelves in Meditation Room.' },
        ],
      },
      {
        id: 'mq-witness',
        title: 'Witness Testimony',
        steps: [
          {
            id: 'mq-w1',
            text: 'Activate a Ghostly Riflemen Trap and get 10–20 kills. A Ghostly Rifleman will appear near the trap.',
          },
          {
            id: 'mq-w2',
            text: 'While the trap is active, approach the Ghostly Rifleman to hear his testimony about the accomplice (Noble, Gardener, or Merchant).',
            details: 'If he doesn\'t mention anyone, try a different trap.',
          },
        ],
      },
      {
        id: 'mq-solve',
        title: 'Solve the Mystery',
        steps: [
          { id: 'mq-sv1', text: 'Suspect Painting (far left): Place Mitsuhime\'s Comb.' },
          {
            id: 'mq-sv2',
            text: 'Accomplice Painting: Place Noble\'s Hat, Gardening Shears, or Mercantile Abacus based on testimony.',
          },
          {
            id: 'mq-sv3',
            text: 'Poison Painting: Cross-reference Death Records cause of death with the Toxin Compendium and accomplice.',
            details:
              '"noxious plant" = Monkshood (Noble) or Plum Pit (Merchant) | "evidence of paralysis" = Pufferfish (Merchant) or Monkshood (Gardener) | "noxious food and signs of emesis" = Plum Pit (Gardener) or Pufferfish (Noble)',
          },
          {
            id: 'mq-sv4',
            text: 'Location Painting: Match the background drawing — Fish (Tea Garden) = Tea Whisk | Bird (Collapsed Study) = Calligraphy Brush | Mountain (War Room) = Horse Statuette.',
          },
          { id: 'mq-sv5', text: 'Motive Painting (far right): Place the Crest Medallion.' },
          {
            id: 'mq-sv6',
            text: 'Zodiac Dial: Note the "Hour of the [Animal]" from Death Records. Note poison time from the compendium. Place the hand on that animal, then move it anti-clockwise by the poison time.',
            details: 'Possible animals: Dog, Boar, Rat, Ox, Tiger, Hare.',
          },
          {
            id: 'mq-sv7',
            text: 'Interact with the incense bowls beside the paintings. Kill zombies near the orb until it moves to Shogun\'s Sanctum.',
          },
        ],
      },
      {
        id: 'mq-boss',
        title: 'Onryo Boss Fight & Nyxara',
        steps: [
          { id: 'mq-b1', text: 'Interact with the World Seed to start the fight.' },
          {
            id: 'mq-b2',
            text: 'Fight the Onryo (special Oni) in Central Courtyard. When immune, shoot its masks to remove immunity.',
          },
          {
            id: 'mq-b3',
            text: 'Once the Onryo is killed, use the fast travel in Shogun\'s Sanctum to reach the Volcano and fight Nyxara.',
          },
          {
            id: 'mq-b4',
            text: 'Bonus: If the mystery was solved without mistakes, an Ultra-rarity Path of Sorrows drops in the room.',
          },
        ],
      },
    ],
  },
  relics: [
    {
      id: 'kowakujo-gramophone',
      name: 'Gramophone',
      tier: 1,
      effect: 'Bullets deal increased damage, but each shot consumes two bullets.',
      steps: [
        'Pick up two drumsticks: the first is on a window facing west in the Gatehouse; the second is between the open windows opposite the Arsenal in the Workshop.',
        'Head up the stairs from the Flower Garden into the Kitchens and face south to find two drums either side of the door. Interact with the drums — they will bang a sequence. Copy the sequence using the melee button (Simon Says).',
        'After successfully repeating the sequence, Mr. Peeks will laugh and a portal appears by the left drum.',
        'Survive the trial by killing zombies only with Sniper Rifles. Get the XR-3 ION from the Wall-Buy in the Shogun\'s Sanctum or spin the Mystery Box.',
      ],
    },
    {
      id: 'kowakujo-druid-stone',
      name: 'Druid Stone',
      tier: 1,
      effect: 'No bleed-out bar. Self-revives instantly revive you.',
      steps: [
        'Activate Cursed Mode Tier I+ and reach Round 20 without taking HP damage. Armor damage is fine (use Turtle Shell + Juggernog). If your health takes any damage, save and quit.',
        'Shortcut: Have a friend join halfway through Round 19 — when they spawn on Round 20, the Relic portal will open automatically.',
        'Find the portal by Wisp Tea in the Flower Gardens.',
        'Survive the trial where zombies can only be killed when you are overhealed. Stay overhealed using Light Mend (ammo mod), Stims, or by meleeing cherry blossom trees three times.',
      ],
    },
    {
      id: 'kowakujo-valkyrie-helmet',
      name: 'Valkyrie Helmet',
      tier: 2,
      effect: 'Areas you stay in start to spawn electric fields that damage you.',
      steps: [
        'Activate Cursed Mode Tier I+ (potentially after Round 40). Have the Upgraded Maneki-Neko and the Nekomancer Wonder Weapon.',
        'Use the Upgraded Maneki-Neko and, while inside its shield bubble, kill zombies with the Nekomancer. A ceramic shard will spawn where the Maneki-Neko was. Collect it. Repeat in different locations until you have 4 shards total (try Meditation Room, Central Courtyard, Tea Gardens, Gatehouse).',
        'Head to the fireplace in the Kitchens, place all 4 shards down, then light them with a Molotov. Pick up the reforged pieces.',
        'Activate the Cat Cafe side easter egg (8 cat/mice spawns, 4 active at a time). Collect the catnip hanging off the cat tree in the Tea Gardens.',
        'Go to Central Courtyard and place the ceramic bowl and catnip on the rock by the big tree.',
        'Fail the Assault Waves in Flower Garden and Training Area until the next Assault Wave takes place in the Central Courtyard by the castle. During that wave, get 50 Nekomancer kills (let zombies extend the timer if needed).',
        'Mr. Peeks will laugh and a portal appears in the Training Area near the Ammo Box. Survive the trial — time your reloads carefully as each reload causes 30–40 HP of damage.',
      ],
    },
    {
      id: 'kowakujo-film-reel',
      name: 'Film Reel',
      tier: 2,
      effect: 'Players can only carry one Pack-a-Punch weapon.',
      steps: [
        'Activate Cursed Mode Tier I+ on any Round.',
        'Pack-a-Punch 10 different weapons in a single game (not the same weapon 10 times). You can use the Pack-a-Punch machine or upgrade Crystals from T.E.D.D. Tasks and Mr. Peeks Eggs. Mr. Peeks will laugh when done.',
        'Tip: Use Mule Kick for a third weapon slot to cycle through weapons faster. Farm Essence with a shotgun (Echo 12 or Akita).',
        'Find the Film Reel portal in the Tea Garden.',
        'Survive the trial by killing zombies with specific scorestreaks only (ARC-XDs, LDBRs, D.A.W.G.S., Ion Cores, HKDs in a random order). Stock at least 9,000 Salvage and use Kill Joy GobbleGums. Each wave has roughly 3 minutes.',
      ],
    },
    {
      id: 'kowakujo-dragon-egg',
      name: 'Dragon Egg',
      tier: 2,
      effect: 'Elites and Special zombies in normal round spawning will be randomized.',
      steps: [
        'Activate Cursed Mode Tier II+ on any Round.',
        'Complete all Main Quest steps up to solving the murder mystery. Solve the mystery on your first try — failing spawns an Oni (save and quit if needed).',
        'After defeating the Onryo miniboss, find the Path of Sorrows katana in the Pack-a-Punch room.',
        'Find 3 blue Japanese symbols around the map (possible locations: Storage Rooms, Workshop, Stables, Flower Garden, Outer Ward, Tenshu Entrance rooftops). Parry an Oni\'s lightning bolt (R3) to charge your sword with electricity, then hit the symbol. Repeat for all three in the order shown.',
        'Mr. Peeks will laugh and a portal spawns upstairs in the Onsen Baths.',
        'Survive Mr. Peeks\' 6-wave trial: Wave 1 — Assault Wave at Flower Garden (2 min). Wave 2 — Kill 2 HVT Abominations near Mr. Peeks in the Gatehouse. Wave 3 — Escort Mr. Peeks to the Keep (use Disciple Injection). Wave 4 — Kill all Oni with the charged Oninikubami (absorb lightning with R3, then strike). Wave 5 — Kill Doppelghasts in the Ash Storm in Central Courtyard (use Light Mend and Stims). Wave 6 — Kill Nyxara within 11 minutes (use Novaline or Tier 4 Cat Wonder Weapon; capture Oni-dropped flags to trigger the damage phase).',
      ],
    },
    {
      id: 'kowakujo-mannequin-turret',
      name: 'Mannequin Turret',
      tier: 3,
      effect: 'Start with no armor; you can only purchase Golden Armor.',
      steps: [
        'Activate Cursed Mode Tier II+ and reach Round 60 without failing a single Assault Wave flag defense. You can fail the statue phase, but do NOT fail the flag phase. Save and quit if you are about to fail the flag.',
        'On Round 60, Mr. Peeks will laugh and a portal appears inside the War Room.',
        'Survive the trial with health regeneration turned off (you heal at the end of each wave). Light Mend and Stims still work — use them throughout.',
      ],
    },
  ],
};
