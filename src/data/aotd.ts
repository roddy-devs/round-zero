import type { MapData } from './types';

export const aotd: MapData = {
  slug: 'ashes-of-the-damned',
  name: 'Ashes of the Damned',
  game: 'Black Ops 7',
  subtitle: 'Dust to Dust',
  description:
    'Navigate the fog-shrouded ruins of a devastated town, build the Necrofluid Gauntlet, upgrade Ol\' Tessie, and defeat Veytharion.',
  wonderWeapon: {
    name: 'Necrofluid Gauntlet',
    sections: [
      {
        id: 'ww-stabilizer',
        title: 'Obtain the Stabilizer Chip',
        steps: [
          {
            id: 'ww-1',
            text: 'Starting at Round 8, go to Janus Towers Plaza and check the wreckage opposite the Warden 308 wall-buy. An Uber Klaus will spawn.',
          },
          { id: 'ww-2', text: 'Kill the Uber Klaus to drop the Stabilizer Chip.' },
        ],
      },
      {
        id: 'ww-klaus',
        title: 'Reactivate Klaus',
        steps: [
          {
            id: 'ww-3',
            text: 'Bring the Stabilizer Chip to Sheriff\'s Office at Ashwood and place it on the cell panel.',
          },
          {
            id: 'ww-4',
            text: 'Throw at least two Stun Grenades inside the cell to bring Klaus back online.',
            details:
              'Free Stun Grenade in the Server Room at Janus Towers and on a shelf next to Juggernog in The Ruby Rabbit at Ashwood.',
          },
          { id: 'ww-5', text: 'Pick up the Klaus Remote Control.' },
        ],
      },
      {
        id: 'ww-barrel',
        title: 'Charge the Aether Barrel',
        steps: [
          {
            id: 'ww-6',
            text: 'Bring Klaus to the Zarya Cosmodrome and send him in front of the panel in Support Systems (next to a purchasable door).',
          },
          {
            id: 'ww-7',
            text: 'Stay inside the scanner that activates and survive until it completes. Pick up the Aether Barrel.',
          },
          {
            id: 'ww-8',
            text: 'Bring the Aether Barrel to a Power Pump (Ashwood, Blackwater Lake, or Vandorn Farm) and charge it.',
          },
          {
            id: 'ww-9',
            text: 'Bring the charged barrel to the remaining two Power Pumps before the timer expires. Timer resets with each charge.',
          },
        ],
      },
      {
        id: 'ww-vault',
        title: 'Vault of Flesh & Alchemical Symbols',
        steps: [
          {
            id: 'ww-10',
            text: 'Bring the fully charged Aether Barrel to the Vault of Flesh cube in the Cellar of Vandorn Farm to absorb the Aether energy.',
          },
          {
            id: 'ww-11',
            text: 'Use a Jump Pad to see three alchemical symbols on the rooftops around Vandorn Farm.',
          },
          {
            id: 'ww-12',
            text: 'Input the symbols on each side of the Vault, then interact with the red eye on the fourth side.',
          },
          {
            id: 'ww-13',
            text: 'Shoot the green orbs during the lockdown and reload the wonder weapon to collect them.',
          },
        ],
      },
    ],
  },
  mainQuest: {
    name: 'Dust to Dust',
    sections: [
      {
        id: 'mq-prereqs',
        title: 'Prerequisites',
        steps: [
          {
            id: 'mq-0a',
            text: 'Obtain the Necrofluid Gauntlet.',
            wonderWeaponLink: true,
          },
          {
            id: 'mq-0b',
            text: 'Upgrade Ol\' Tessie with Pack-a-Punch and the Abomination Beam — both are covered step-by-step in the next section.',
            isNote: true,
          },
        ],
      },
      {
        id: 'mq-tessie',
        title: 'Ol\' Tessie Setup',
        steps: [
          {
            id: 'mq-t1',
            text: 'Find T.E.D.D.\'s Head in the Server Room and place it in the truck at Janus Towers Plaza.',
          },
          {
            id: 'mq-t2',
            text: 'Pack-a-Punch Upgrade: Drive through the Collapsed Tower to Vandorn Farm, destroy the growth infestation around the Power Pump, activate the power switch in the Barn.',
          },
          {
            id: 'mq-t3',
            text: 'Drive through the Grounded Ship to Ashwood, destroy growth infestation at Ashwood Bridge, activate the power switch on Market Square side.',
          },
          {
            id: 'mq-t4',
            text: 'Drive Ol\' Tessie to the garage door in Ashwood to open it. Interact with the Vehicle Upgrade Station to install Pack-a-Punch.',
          },
          {
            id: 'mq-t5',
            text: 'Abomination Beam: Kill the Cook zombie in Reba\'s Diner at Exit 115 to get the Freeze Key. Open the freezer for the Abomination Carcass.',
          },
          {
            id: 'mq-t6',
            text: 'Bring the Abomination Heads to the Ashwood garage to upgrade Ol\' Tessie.',
          },
        ],
      },
      {
        id: 'mq-serum',
        title: 'Create the Serum',
        steps: [
          {
            id: 'mq-s1',
            text: 'Buy Wisp Tea and activate the spirit in the Tailor Shop mirror at Ashwood. Shoot the mirror with the Necrofluid Gauntlet to get the Powder of the Forgotten.',
          },
          {
            id: 'mq-s2',
            text: 'Travel to Yuri\'s Lab in Zarya Cosmodrome. Interact with the powder on the table to reveal three pigpen ciphers.',
            details:
              'Cipher decoder: https://crypto.interactive-maths.com/pigpen-cipher.html',
          },
          {
            id: 'mq-s3',
            text: 'Decode the ciphers to determine which three ingredients are needed.',
            details:
              'FUNGI = Widow\'s Lantern | LIMBS = Mysterious Limb | OCULI = Ravager Eyes | CONCH = Hoard Hunk Chucks | TALUS = Human Bones',
          },
          {
            id: 'mq-s4',
            text: 'Hoard Hunk Chucks: Destroy a purple Aether Flora with Ol\' Tessie Abomination Beam.',
          },
          {
            id: 'mq-s5',
            text: 'Widow\'s Lantern: Get the Jar of Spores from under the cabin\'s kitchen cabinet at Blackwater Lake. Interact with the horse corpse covered with mushrooms outside Vandorn Farm. Wait 3 rounds then interact again.',
          },
          {
            id: 'mq-s6',
            text: 'Ravager Eyes: Kill a Ravager with a Saw Trap.',
          },
          {
            id: 'mq-s7',
            text: 'Human Bones: Throw a Combat Axe at the foot of the hanging corpse in the Barn at Vandorn Farm. Throw a Molotov Cocktail to burn the dropped foot.',
            details:
              'Free Combat Axe at Exit 115 diner or via the Axe Throwing easter egg at Blackwater Lake. Free Molotov on a barrel next to the Ashwood garage.',
          },
          {
            id: 'mq-s8',
            text: 'Mysterious Limb: Kill a Zursa with the Ol\' Tessie Abomination Beam.',
          },
          {
            id: 'mq-s9',
            text: 'Interact with each ingredient in the order shown on the chalkboard (top to bottom).',
          },
          {
            id: 'mq-s10',
            text: 'Interact with the central equipment to add your Blood. Survive the lockdown by healing with Necrofluid Gauntlet kills.',
          },
        ],
      },
      {
        id: 'mq-dg2',
        title: 'DG-2 Turret Upgrade',
        steps: [
          {
            id: 'mq-d1',
            text: 'Find keys hidden in the Fog using the Necrofluid Gauntlet to pull them to the ground.',
          },
          {
            id: 'mq-d2',
            text: 'Bruin Key (Crashed Rocket, Yellow) — forces knife-only while held.',
          },
          {
            id: 'mq-d3',
            text: 'Nightbird Key (Orda Graveyard, Red) — reduces health to extremely low while held.',
          },
          {
            id: 'mq-d4',
            text: 'Terrapin Key (Grounded Ship, Green) — significantly slows you while held.',
          },
          {
            id: 'mq-d5',
            text: 'Bring each key to the Seal of Sorrow in Ruby Alley at Ashwood. Do NOT use Jump Pads (they drop the key).',
          },
          {
            id: 'mq-d6',
            text: 'After all chains are removed, pick up the DG-2 Turret Barrel and bring it to the Ashwood garage.',
          },
        ],
      },
      {
        id: 'mq-gauntlet',
        title: 'Gauntlet Challenges (Time Charges)',
        steps: [
          {
            id: 'mq-g1',
            text: 'Shoot the clock tower above Ashwood with the DG-2 Turret to freeze the clocks.',
          },
          {
            id: 'mq-g2',
            text: 'Shoot a clock face with the Necrofluid Gauntlet and pull back to acquire a Time Charge (turns you transparent/purple). 3 charges available per round.',
          },
        ],
      },
      {
        id: 'mq-vandorn',
        title: 'Vandorn Farm Challenge',
        steps: [
          {
            id: 'mq-v1',
            text: 'Check the clock on the wall in the Farmhouse. Find Roman numerals scratched on the floor around the dining table.',
          },
          {
            id: 'mq-v2',
            text: 'Stand above the numeral matching the clock time, look at Pa Vandorn\'s skeleton. Shoot Pa\'s head with the purple Gauntlet to spawn four energy orbs.',
          },
          {
            id: 'mq-v3',
            text: 'Find four ritual items: Tasty-Face (bunk bed near Stamin-Up), Junior\'s Fun-Face (Barn upstairs, toy horse), Pa\'s Pigsticker (Garage), Ma\'s Chalice (bathtub in Cellar).',
          },
          {
            id: 'mq-v4',
            text: 'Place items on the glowing circles around the farm. Interact with the last item to trigger a lockdown — defend the items until complete.',
          },
        ],
      },
      {
        id: 'mq-zarya',
        title: 'Zarya Cosmodrome Challenge',
        steps: [
          {
            id: 'mq-z1',
            text: 'Shoot the two spinning radar dishes with the purple Gauntlet (requires two charges).',
          },
          {
            id: 'mq-z2',
            text: 'The first two monitors spell a pigpen word. The six other monitors cycle numbers.',
          },
          {
            id: 'mq-z3',
            text: 'Lock in the numbers by pressing the red button based on the pigpen word.',
            details:
              'LAUNCH: 11-00-20-13-02-07 | WEAPON: 22-04-00-15-14-13 | ENGINE: 04-13-06-08-13-04 | ROCKET: 17-14-02-10-04-19',
          },
          { id: 'mq-z4', text: 'If correct, the Soyuz rocket will launch.' },
        ],
      },
      {
        id: 'mq-exit115',
        title: 'Exit 115 Challenge',
        steps: [
          {
            id: 'mq-e1',
            text: 'Travel to Exit 115 with Ol\' Tessie. Wait for colored lightning strikes at the beginning of a round, or manually trigger them by shooting light poles with the DG-2 Turret.',
          },
          {
            id: 'mq-e2',
            text: 'Shoot the clock at McDougal\'s Service Station with the purple Gauntlet to freeze time for 1 minute (2 min in Directed Mode).',
          },
          {
            id: 'mq-e3',
            text: 'Revive three corpses: Ram the cargo container with Tessie (trucker, red). Send Klaus to force the car trunk open (mechanic, yellow). Melee the cash register to open it (waitress, blue).',
          },
          {
            id: 'mq-e4',
            text: 'Lead each zombie to its corresponding colored lightning bolt until they are stunned and disappear.',
          },
        ],
      },
      {
        id: 'mq-lake',
        title: 'Blackwater Lake Challenge',
        steps: [
          {
            id: 'mq-l1',
            text: 'Travel to the pier at Blackwater Lake. Interact with Dean Roth\'s soul.',
          },
          {
            id: 'mq-l2',
            text: 'Go inside the Cabin and shoot the projector with the purple Gauntlet. Note the four images and their locations/order.',
          },
          {
            id: 'mq-l3',
            text: 'Shoot film reels in the correct order: Toolshed (shelf near Sprayer), Front of Cabin (upstairs near gramophone), Back of Cabin (beneath stairs next to Ammo Box), Boat house (wood beam above).',
          },
          {
            id: 'mq-l4',
            text: 'Interact with the box in the Speed Cola room where Evelyn Sharpe\'s soul appears.',
          },
          {
            id: 'mq-l5',
            text: 'Summon Klaus and send him in front of the box. He will take the Hellion Horn and move to the back of the Cabin.',
            details: 'Note: if you Save & Quit after this step, you will need to redo it.',
          },
        ],
      },
      {
        id: 'mq-boss',
        title: 'Veytharion Boss Fight',
        steps: [
          {
            id: 'mq-b1',
            text: 'Interact with Klaus to have him blow the horn, summoning memory wisps.',
          },
          {
            id: 'mq-b2',
            text: 'Drive Ol\' Tessie and collect wisps at: Monolith Forest, Collapsed Tower, Grounded Ship, Lost Cabins (3 each, 12 total). Time-limited.',
          },
          {
            id: 'mq-b3',
            text: 'Once all wisps are collected, you\'re teleported inside Veytharion\'s Sepulcher.',
          },
          {
            id: 'mq-b4',
            text: 'Phase 1–3: Damage Veytharion with weapons or by ramming Tessie. Drive through green barnacles to heal Tessie.',
          },
          {
            id: 'mq-b5',
            text: 'When immune: drive through the beam of light to overcharge Tessie, then ram Veytharion. Shoot the weak point under his body.',
          },
          {
            id: 'mq-b6',
            text: 'Phase 2: Dodge bigger missile barrages. Phase 3: Outrun or counter the laser beam by ramming while he charges.',
          },
          {
            id: 'mq-b7',
            text: 'Defeat Veytharion to trigger the final cinematic.',
          },
        ],
      },
    ],
  },
  relics: [
    {
      id: 'aotd-lawyers-pen',
      name: "Lawyer's Pen",
      tier: 1,
      effect: 'All zombies are Shock Mimics.',
      steps: [
        'Reach Round 20.',
        'Throw a Molotov Cocktail (or use Napalm Burst) at red candles in three locations: above the couch next to Juggernog in The Ruby Rabbit (Ashwood), next to a couch inside one of the cabins at Lost Cabins, and on the bedside table in Farmhouse at Vandorn Farm.',
        'Go to Vandorn Farm and interact with the portal at the Barn to start the Relic Trial.',
        'Survive 4 waves of only Shock Mimics.',
      ],
    },
    {
      id: 'aotd-dragon-wings',
      name: 'Dragon Wings',
      tier: 1,
      effect: 'Normal Power-Up spawns are disabled.',
      steps: [
        'Reach Round 20.',
        'Use the Jump Pad from Vandorn Farm to Janus Towers Reception. While in the air, shoot the 3 purple symbols seen on top of the buildings.',
        'Return to Vandorn Farm and interact with the portal at the Barn to start the Relic Trial.',
        'Survive 4 waves — the 1st and 3rd waves are standard zombies, the 2nd and 4th are HVTs. Picking up Power-Ups will damage you.',
      ],
    },
    {
      id: 'aotd-teddy-bear',
      name: 'Teddy Bear',
      tier: 1,
      effect: 'Round start delay is cut down by 75%.',
      steps: [
        'Find 10 Mister Peeks around the map while using Aether Shroud.',
        'Go to Vandorn Farm and interact with the portal at the Barn to start the Relic Trial.',
        'Survive several waves with every shot fired costing 100 Essence.',
      ],
    },
    {
      id: 'aotd-vril-sphere',
      name: 'Vril Sphere',
      tier: 2,
      effect: 'Players can only carry 4 Perk-a-Colas.',
      steps: [
        'Activate Cursed Mode Tier I and reach Round 40.',
        'Spawn a Doppleghast and kill it by launching it with a Jump Pad.',
        'Travel to Zarya Cosmodrome and interact with the portal in front of the rocket launch pad to start the Relic Trial.',
        'Survive 5 waves (2 of which are HVT-only). All purchases are disabled.',
      ],
    },
    {
      id: 'aotd-samanthas-drawing',
      name: "Samantha's Drawing",
      tier: 2,
      effect: 'Every weapon the player has will swap each round, but retain Pack-a-Punch level and rarity.',
      steps: [
        'Activate Cursed Mode Tier I.',
        'Give Chompy a weapon of each rarity: Common (Grey), Uncommon (Green), Rare (Blue), Epic (Purple), and Legendary (Orange).',
        'Reach Round 40 and give Chompy either the Ray Gun or the Ray Gun Mark II.',
        'Travel to Zarya Cosmodrome and interact with the yellow portal near the Exfil cabin near Yuri\'s Lab to start the Relic Trial.',
        'Survive 5 waves of HVTs and zombies while all Max Ammo Power-Ups and Ammo Caches are disabled.',
      ],
    },
    {
      id: 'aotd-focusing-stone',
      name: 'Focusing Stone',
      tier: 2,
      effect: 'No Self-Revive kits.',
      steps: [
        'Activate Cursed Mode Tier I and reach Round 40.',
        'Obtain two wine bottles: kill a Zursa with your melee weapon to drop one; get the other from a Legendary chest from a T.E.D.D. Trial.',
        'Place both bottles among the others on the counter inside the Cabin at Blackwater Lake. The bottles will flash in a specific order — shoot them in that order.',
        'Travel to Zarya Cosmodrome and interact with the portal in front of the rocket launch pad to start the Relic Trial.',
        'Survive multiple waves with all your Essence gone.',
      ],
    },
    {
      id: 'aotd-bus',
      name: 'Bus',
      tier: 3,
      effect: 'Enemy health regenerates.',
      steps: [
        'Activate Cursed Mode Tier II and reach Round 60.',
        'Complete a round without taking any damage. If done correctly, Mr. Peeks\' laugh will be heard.',
        'Travel to Blackwater Lake and interact with the portal against the boat house to start the Relic Trial.',
        'Survive 6 waves where zombies can only be killed by other zombies (Brain Rot required).',
      ],
    },
    {
      id: 'aotd-dragon',
      name: 'Dragon',
      tier: 3,
      effect: 'All Ammo Crates are disabled.',
      steps: [
        'Activate Cursed Mode Tier II.',
        'Complete the Main Quest at Round 60 and continue the match.',
        'Travel to Blackwater Lake and interact with the portal against the cabin to start the Relic Trial.',
        'Survive 6 waves where zombies can only be damaged with explosives.',
      ],
    },
    {
      id: 'aotd-blood-vials',
      name: 'Blood Vials',
      tier: 3,
      effect: 'All Augments are turned off.',
      steps: [
        'Activate Cursed Mode Tier II.',
        'Reach Round 20 and find a ringing red phone around the map. Repeatedly interact with it until it disappears and Mr. Peeks\' laugh is heard. If you fail, the next phone appears at Round 30.',
        'Travel to Blackwater Lake and interact with the portal inside the cabin to start the Relic Trial.',
        'Survive 6 waves where your damage output is reduced by 50%.',
      ],
    },
  ],
};
