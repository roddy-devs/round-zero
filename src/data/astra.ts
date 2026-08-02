import type { MapData } from './types';

export const astra: MapData = {
  slug: 'astra',
  name: 'Astra Malorum',
  game: 'Black Ops 7',
  subtitle: 'Astra Malorum',
  description:
    'Explore a Victorian-era space observatory, build the LGM-1, decode Dr. Thurston\'s secrets, travel to Mars, and battle Caltheris.',
  wonderWeapon: {
    name: 'LGM-1',
    sections: [
      {
        id: 'ww-parts',
        title: 'Collect Items',
        steps: [
          { id: 'ww-1', text: 'Damaged Drone: Destroy one of O.S.C.A.R.\'s flying drones.' },
          { id: 'ww-2', text: 'Aberrant Wiring: Find a blinking lamp post and shoot it.' },
          {
            id: 'ww-3',
            text: 'Car Battery: With a Pack-a-Punched gun, shoot the gearbox of Ol\' Tessie in Crash Site.',
          },
          {
            id: 'ww-4',
            text: 'Absolute Zero Shards (×3): With Cryofreeze equipped, find and shoot Aether Crystals around the map.',
          },
        ],
      },
      {
        id: 'ww-traps',
        title: 'Kill O.S.C.A.R. with 3 Traps (one per round)',
        steps: [
          {
            id: 'ww-5',
            text: 'Rocket Thrusters (Museum Infinitum): Interact with thrusters while holding Absolute Zero Shards. Bring O.S.C.A.R. to the activated thrusters.',
            details: 'If O.S.C.A.R. survives, recollect 3 more shards.',
          },
          {
            id: 'ww-6',
            text: 'Electro-Volt Projector (Luminarium): Place Damaged Drone, Car Battery, and Aberrant Wiring in the trap. Bring O.S.C.A.R. inside and activate. Hold it in the room until it overheats.',
          },
          {
            id: 'ww-7',
            text: 'Telescope (Observatory Dome): Shoot 5 fuming valves around the room within a time limit to activate the telescope.',
            details: 'Valve locations: 2 above telescope, 2 under, 3 on walls, 1 on pillar behind sparking box, 1 in small room from Machina Astralis.',
          },
          {
            id: 'ww-8',
            text: 'Bring O.S.C.A.R. beneath the telescope. Interact with the organ and place the cursor on the Sun to fire the laser.',
          },
          {
            id: 'ww-9',
            text: 'The final O.S.C.A.R. killed drops the LGM-1.',
          },
        ],
      },
    ],
  },
  mainQuest: {
    name: 'Astra Malorum',
    sections: [
      {
        id: 'mq-code',
        title: 'Observatory Code',
        steps: [
          { id: 'mq-1', text: 'Acquire the LGM-1.', wonderWeaponLink: true },
          {
            id: 'mq-2',
            text: 'Starting at Round 10, follow O.S.C.A.R. until it plays a recording. Dr. Thurston recites three planet names.',
          },
          {
            id: 'mq-3',
            text: 'Convert planets to numbers by distance from the Sun (Mercury=1 ... Neptune=8). Enter the 3-digit code into the terminal in Observatory Dome.',
          },
          {
            id: 'mq-4',
            text: 'A lift drops down. Take the key from the corpse and open the cryopod in Machina Astralis (adjacent room to Scholar\'s Way).',
          },
        ],
      },
      {
        id: 'mq-brain',
        title: 'Dr. Thurston\'s Brain',
        steps: [
          {
            id: 'mq-5',
            text: 'Get the Rock Saw from behind a glass display in Museum Infinitum (shoot the glass).',
          },
          {
            id: 'mq-6',
            text: 'Return to the cryopod and hold interact on Thurston\'s head to collect his brain (immune during animation).',
          },
          {
            id: 'mq-7',
            text: 'In The Luminarium, interact with the brain jar to replace the monkey brain with Thurston\'s. Interact again to trigger a lockdown — defend the brain.',
          },
          {
            id: 'mq-8',
            text: 'Pick up the brain jar and place it in the machine near the portal in Machina Astralis. Hold interact to connect.',
          },
        ],
      },
      {
        id: 'mq-books',
        title: 'Archive of Orbis',
        steps: [
          {
            id: 'mq-9',
            text: 'The machine displays book titles on its left screen (9 possible titles).',
          },
          {
            id: 'mq-10',
            text: 'In Archive of Orbis, there are 3 busts with 3 bookshelves each. Find which shelves contain the displayed titles.',
          },
          {
            id: 'mq-11',
            text: 'Quickly interact with each bust a number of times equal to how many matching titles are in its bookshelf set.',
          },
          {
            id: 'mq-12',
            text: 'A panel opens above the ladder. Climb up, get the Neptune model, and place it in the display at the top of Machina Astralis.',
          },
        ],
      },
      {
        id: 'mq-planets',
        title: 'Planet Alignment & Mars Code',
        steps: [
          {
            id: 'mq-13',
            text: 'Find three pages around the map (Luminarium table, Machina Astralis desk, Archive of Orbis table). Each shows a planet and a compass direction.',
          },
          {
            id: 'mq-14',
            text: 'Shoot the corresponding planets on the model display to align each in its noted direction (compass is below the Sun model).',
          },
          {
            id: 'mq-15',
            text: 'Use the telescope in Observatory Dome. Look for Mars and note its declination (DEC) — a 4-digit code.',
          },
          {
            id: 'mq-16',
            text: 'Enter the code in the machine on the 2nd floor of Machina Astralis.',
          },
          {
            id: 'mq-17',
            text: 'Interact with the machine to reboot the portal. Destroy O.S.C.A.R.\'s flying saucers and defend the portal until the reboot completes. Teleported to Mars on success.',
          },
        ],
      },
      {
        id: 'mq-mars',
        title: 'Mars',
        steps: [
          {
            id: 'mq-18',
            text: 'Pick up Thurston\'s brain jar from the center. Place it in the machine at the top of the stairs and interact to create a portal.',
          },
          {
            id: 'mq-19',
            text: 'Interact with the machine to play music (once per round). The Ascendant Eye flies near the giant head outside.',
          },
          {
            id: 'mq-20',
            text: 'Shoot the 4 pylons in order: Back Right → Back Left → Front Right → Front Left, then the pylon above the machine to bring the Ascendant Eye into the arena.',
            details: 'Shoot the temple pylon repeatedly to keep music playing and the Eye in the arena.',
          },
          {
            id: 'mq-21',
            text: 'Wait for the Ascendant Eye to fly low. Jump and interact with it to grab it. Easier with low gravity enabled.',
          },
          {
            id: 'mq-22',
            text: 'Place the Ascendant Eye in the device on the right side of the arena. Shoot the 5 pillar antennas with the LGM-1 — each plays a note and displays a symbol.',
          },
          {
            id: 'mq-23',
            text: 'Return to Observatory Dome and interact with the organ. The right screen shows the 5 symbols in order with one hidden by distortion.',
          },
          {
            id: 'mq-24',
            text: 'Return to Mars. Interact with the pillars in the organ\'s shown order. The hidden symbol corresponds to one remaining pillar.',
          },
          {
            id: 'mq-25',
            text: 'Interact with the machine at the top of the stairs to start the fight against Caltheris.',
          },
        ],
      },
      {
        id: 'mq-boss',
        title: 'Caltheris Boss Fight',
        steps: [
          {
            id: 'mq-b1',
            text: 'Phase 1: Kill zombies to charge the Tesla coil. When full, interact with the machine to fire a beam (drains 1/3 health). Repeat 3 times. Caltheris gains new attacks each time (meteors/flames, toxic gas, toxic zombies).',
          },
          {
            id: 'mq-b2',
            text: 'Phase 2 (Rock Golem): Caltheris chases you, slaps you airborne, and throws rocks. Damage her until a blue weak point appears — hit it for critical damage.',
          },
          {
            id: 'mq-b3',
            text: 'Phase 3 (Caltheris Ascendant): Similar to Phase 2 with added slam attack — jump to avoid damage. Armored zombies spawn during immunity periods for armor plate restocking.',
          },
          {
            id: 'mq-b4',
            text: 'Phase 4 (Caltheris the Needle): All attacks empowered. Rock throw creates electric pools. Faster movement. Wider slam. Keep dealing damage until defeated.',
            details: 'If AOTD quest is complete, Veytharion\'s Blessing spawns at the top of the arena (infinite ammo + equipment for a duration).',
          },
        ],
      },
    ],
  },
  relics: [
    {
      id: 'astra-gong',
      name: 'Gong',
      tier: 1,
      effect: 'Field Upgrade starts charged, but can only be charged by full power.',
      steps: [
        'Equip Tesla Storm as your Field Upgrade, and at least one weapon with Dead Wire.',
        'Starting at Round 20, a zombie will spawn each round with a lightning rod embedded in its body.',
        'Three doorways around the map have a light bulb above them: The Luminarium (near the brain jar), Observatory Dome (near the portal room), and Archive of Orbis (next to the portal room).',
        'Bring the lightning rod zombie below a bulb, activate Tesla Storm, then shoot the zombie with Dead Wire to send electricity to the bulb. Repeat for all three.',
        'Find the green portal outside between Observatory Dome and Stargazer\'s Courtyard. Survive 4 waves where zombies can only be damaged with electric damage.',
      ],
    },
    {
      id: 'astra-seed',
      name: 'Seed',
      tier: 1,
      effect: 'Mystery Box is disabled.',
      steps: [
        'Reach Round 20.',
        'A pistol will spawn on the ground somewhere on the map. Pick it up.',
        'Kill exactly as many enemies as the current round number (e.g. Round 21 = 21 kills). Once done, pass the round using any other weapon. The pistol can be Pack-a-Punched.',
        'Travel to Observatory Dome and interact with the green portal to start the Relic Trial.',
        'Survive 4 waves with only a Pack-a-Punched pistol.',
      ],
    },
    {
      id: 'astra-spider-fang',
      name: 'Spider Fang',
      tier: 2,
      effect: 'Perk costs at machines never decrease.',
      steps: [
        'Activate Cursed Mode Tier I and reach Round 40.',
        'Defeat O.S.C.A.R. with a melee weapon while the Wisp Tea spirit is attacking it. O.S.C.A.R. can be damaged by other means, but the killing blow must be melee.',
        'Travel to Archive of Orbis and interact with the yellow portal to start the Relic Trial.',
        'Survive 5 waves while all perks are disabled.',
      ],
    },
    {
      id: 'astra-matryoshka-doll',
      name: 'Matryoshka Doll',
      tier: 2,
      effect: 'Salvage drop rate halved.',
      steps: [
        'Activate Cursed Mode Tier I, open the portal to Mars, and reach Round 40.',
        'Place a C4 on each of the three gut piles found on the central platform on Mars.',
        'Gather a group of zombies in the middle of the platform and detonate the C4. If done correctly, Mr. Peeks will be heard laughing.',
        'Travel to the side room of Machina Astralis and interact with the yellow portal to start the Relic Trial.',
        'Survive 5 waves while zombies and HVTs can only be killed with Field Upgrades.',
      ],
    },
    {
      id: 'astra-golden-spork',
      name: 'Golden Spork',
      tier: 3,
      effect: 'Enemies deal double damage.',
      steps: [
        'Activate Cursed Mode Tier II, open the portal to Mars, and reach Round 60.',
        'Get a Mangler Cannon and travel to Mars. Shoot the portal with the Mangler Cannon, then teleport back to Machina Astralis.',
        'After a few seconds, the shot will leave the portal heading toward Archive of Orbis. Gather a group of zombies inside the red circle on the ground near the portal (use Decoys).',
        'If enough zombies were killed, a red portal appears on a wall at Crash Site. Interact with it to start the Relic Trial.',
        'Survive 6 waves while zombies and HVTs only take damage from hip-fire.',
      ],
    },
    {
      id: 'astra-civil-protector-head',
      name: 'Civil Protector Head',
      tier: 3,
      effect: 'Perk decay — every 100 kills you lose a perk.',
      steps: [
        'Activate Cursed Mode Tier II, reach Round 60, and make sure to have PhD Flopper.',
        'Get Energy Mine and trigger a mine next to Ol\' Tessie. The headlights will flash three times, then the headlights and brake lights will each light up in a sequence — this is the order for the chandeliers in Museum Infinitum.',
        'The two chandeliers near the doorway to Stargazer\'s Courtyard are the headlights; the two near Crash Site are the brake lights.',
        'Wall jump to reach each chandelier and put out the candles in the order shown by Ol\' Tessie.',
        'Travel to Crash Site and interact with the red portal to start the Relic Trial.',
        'Survive 6 waves by killing HVTs while all zombies are turned into sprinters.',
      ],
    },
  ],
};
