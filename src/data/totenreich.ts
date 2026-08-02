import type { MapData } from './types';

export const totenreich: MapData = {
  slug: 'totenreich',
  name: 'Totenreich',
  game: 'Black Ops 7',
  subtitle: 'Vegvisir',
  description:
    'Explore a frozen Norse settlement, build the Jotunn Star atop the lighthouse, gather Uranium cores, and challenge the Dravakar in Tyr\'s arena.',
  wonderWeapon: {
    name: 'Jotunn Star',
    sections: [
      {
        id: 'ww-parts',
        title: 'Collect the Parts',
        steps: [
          { id: 'ww-1', text: 'Chilly Chunks: Back of a truck next to Deadshot Daiquiri in Storm Bridge.' },
          {
            id: 'ww-2',
            text: 'Lantern: Place the Chilly Chunks on the table in Skallen Market. Starting with the 2nd Special Round, a named Zursa will spawn and drop the Lantern when killed.',
          },
          {
            id: 'ww-3',
            text: 'Chain Links: Press the button in Titan Crane to lower a wooden slab in front of the ship. Wall jump towards the bow and interact to get the chains.',
            details: 'The slab stays down for 30 seconds but the button can be pressed again.',
          },
        ],
      },
      {
        id: 'ww-burial',
        title: 'Burial Grounds Constellation',
        steps: [
          { id: 'ww-4', text: 'Reach the Burial Grounds and interact with the door to place the Chain Links. Hold interact to repair it.' },
          { id: 'ww-5', text: 'Place the Lantern on the shrine. It will emit lights on the wall revealing rotating constellations.' },
          {
            id: 'ww-6',
            text: 'Interact with the constellation symbols on the wall matching the shrine. Order: Left, Right, Back, Front (when looking from the stairs).',
          },
          { id: 'ww-7', text: 'Astrid\'s ghost appears above the shrine. Follow her.' },
        ],
      },
      {
        id: 'ww-lighthouse',
        title: 'Reach the Lighthouse',
        steps: [
          { id: 'ww-8', text: 'Follow Astrid to the market. Kill Frost zombies to charge her energy bar.' },
          { id: 'ww-9', text: 'Repeat the charging process when she reaches the lighthouse area.' },
          { id: 'ww-10', text: 'Climb the floating platforms that appear, then climb the lighthouse stairs and outside platforms.' },
          { id: 'ww-11', text: 'Interact with the ladder on top to enter the chamber and pick up the Jotunn Star.' },
        ],
      },
    ],
  },
  mainQuest: {
    name: 'Vegvisir',
    sections: [
      {
        id: 'mq-signal',
        title: 'Wundersignal',
        steps: [
          { id: 'mq-1', text: 'Get the Crowbar from a shelf inside the Lighthouse.' },
          {
            id: 'mq-2',
            text: 'Find a note on the ground (Dry Dock button room or Tyr\'s Foot near a corpse). The message indicates which crate to open.',
            details:
              '"replaced PzGR shipment with parts" = III-6 | "couldn\'t tamper with PzGR" = V-7 | "PzGR shells are gone, robot parts instead" = X-9 | "switch is done, PzGR out, chemical bomb in" = IV-3',
          },
          {
            id: 'mq-3',
            text: 'Find the corresponding crate (War Factory, Dry Dock, Core Foundry, or Fjord Road). Opening the wrong one triggers a 30s penalty.',
          },
          {
            id: 'mq-4',
            text: 'Place the Flak Gun Round in the flak gun near the Lighthouse and hit it with the Jotunn Star.',
            wonderWeaponLink: true,
          },
          { id: 'mq-5', text: 'Go to the Riese robot head in spawn. Hold interact to get the Transmitter. Place it inside Tyr\'s head (2nd floor).' },
          {
            id: 'mq-6',
            text: 'Count the blinks of the two lights inside Tyr\'s head — gives 2 sets of 2-digit numbers.',
          },
          {
            id: 'mq-7',
            text: 'Travel to Core Foundry. Unlock the Ascender with a Molotov. Enter the console and calibrate Amplitude (right) and Frequency (left) using the blink numbers. Enter both sets to trigger barrage strikes.',
          },
          { id: 'mq-8', text: 'Pick up the free Wunderbarrage Controller from the room next to the radio tower.' },
        ],
      },
      {
        id: 'mq-uranium',
        title: 'Atomkraft Core — Obtain 3 Uraniums',
        steps: [
          {
            id: 'mq-u1',
            text: 'Uranium 1: Find a Fishing Rod (Dry Dock, Storm Bridge, Fishery Island, or Beacon Island). Fish for a glowing green fish. This spawns an Irradiated Ravager next round — kill it for the Uranium.',
          },
          {
            id: 'mq-u2',
            text: 'Uranium 2: Get an ARC-XD (free in Eidskallen Square) and melee the vent near stairs/Zipline in Core Foundry. Drive the ARC-XD into the secret room to open the Genetic Lab.',
          },
          {
            id: 'mq-u3',
            text: 'In the lab, match jar letters (A–E) to the numbered radioactive symbols in the corridor (1–5). Place the correct jars in the machine to get the purple jar.',
          },
          {
            id: 'mq-u4',
            text: 'Pick up the Necrospike from the crab arm on the table. Use it on the cell door to complete the lockpicking mini-game. Collect the Uranium.',
          },
          {
            id: 'mq-u5',
            text: 'Uranium 3: Activate a Glocke Drop. While active, shoot all floating zombies to light up the green lights. Repeat until all 3 lights are lit. The Glocke drops the Uranium.',
            details: 'A free Glocke Drop is available during earlier quest steps, or from fishing.',
          },
        ],
      },
      {
        id: 'mq-core',
        title: 'Assemble & Charge the Atomkraft Core',
        steps: [
          {
            id: 'mq-c1',
            text: 'Use the Wunderbarrage Controller to clear debris on stairs outside O2 Building in Dry Dock. Enter the Machine Workshop.',
          },
          {
            id: 'mq-c2',
            text: 'Place all 3 Uraniums in the claw machine. Complete the mini-game: place cylinders so the cursor doesn\'t go over the green section. Configs: 6&3, 7&2, or 7&1&1.',
            details: 'Solver tool available online.',
          },
          {
            id: 'mq-c3',
            text: 'Pick up the Atomkraft Core (no sprinting, ziplines/Tyr will drop it).',
          },
          {
            id: 'mq-c4',
            text: 'Place it on pallets next to Quick Revive. Turn on the generator in the shed. Defend the Core — reboot the generator when needed.',
          },
          {
            id: 'mq-c5',
            text: 'Bring the Charged Atomkraft Core to Storm Bridge and place it on a barrel. A cutscene plays and the Dravakar Shard drops at Tyr\'s Foot.',
          },
        ],
      },
      {
        id: 'mq-vegvisir',
        title: 'Vegvisir',
        steps: [
          { id: 'mq-v1', text: 'Bring the shard to Blodheim Hall and place it on the bonfire. Light it with the Jotunn Star ranged attack.' },
          {
            id: 'mq-v2',
            text: 'Get a Disciple Injection (free in Eidskallen Stave Church) and throw zombies into the bonfire. Triggers a lockdown and spawns a Necropincer HVT.',
          },
          { id: 'mq-v3', text: 'Kill the HVT and pick up the Sunstone.' },
          {
            id: 'mq-v4',
            text: 'Place the Sunstone in the center of Eidskallen Stave Church. Use the Jotunn Star ranged attack on it. A giant circle appears with arrows pointing at runes.',
          },
          {
            id: 'mq-v5',
            text: 'Shoot the wooden piles below each rune around the map with the Jotunn Star in the order shown by the arrow count.',
          },
          { id: 'mq-v6', text: 'Return to Tyr\'s Head and interact with the console to start the boss fight.' },
        ],
      },
      {
        id: 'mq-boss',
        title: 'Dravakar Boss Fight',
        steps: [
          {
            id: 'mq-b1',
            text: 'Phase 1: Dravakar wrestles Tyr. Shoot the red weak spots on Dravakar to help Tyr. Use Flammenfalle traps to counter ice attacks on the arena.',
            details: 'If you completed the Astra Malorum quest, Caltheris\'s Blessing power-up can save a full team wipe.',
          },
          {
            id: 'mq-b2',
            text: 'Phase 2: Dravakar disables Tyr. A Gjallarfrost head appears — stun it with a grenade/Jotunn Star ranged attack in its mouth, then deal damage.',
          },
          {
            id: 'mq-b3',
            text: 'Dravakar fires ice shards in rune patterns — hide behind cover or learn the patterns. Shoot his random red weak spots.',
          },
          {
            id: 'mq-b4',
            text: 'Later phases: Multiple Gjallarfrost heads. Dravakar blocks arena sections, forcing you to middle with no cover. Keep hitting weak spots until defeated.',
          },
        ],
      },
    ],
  },
  relics: [
    {
      id: 'totenreich-power-switch',
      name: 'Power Switch',
      tier: 1,
      effect: 'Tactical and lethal equipment randomizes each round.',
      steps: [
        'Start a game in Cursed Mode.',
        'Find 4 wooden structures outside the map and count the number of deer heads on each: outside Eidskallen Landing (opposite the Rampage Inducer opening), outside Burial Grounds (right of a Mystery Box spawn), outside Core Foundry (left-most mountain top from the left side of the piled crates), and outside Tyr\'s Foot (left of the road). A scoped weapon helps.',
        'Get a Combat Axe and throw it at the corresponding bear pelts in Blodheim Hall in order from fewest to most deer heads (1→4): Burial Grounds pelt (1 shield on left), Tyr\'s Foot pelt (1 shield on each side), Eidskallen Landing pelt (3 round shields + 1 on ground), Core Foundry pelt (4 round shields).',
        'If done correctly, a green portal spawns on the 4-shield pelt. Survive 3 waves where zombies can only be killed with traps.',
      ],
    },
    {
      id: 'totenreich-unknown',
      name: '???',
      tier: 1,
      effect: '???',
      steps: [
        'Reach Round 20.',
        'Steps are currently unknown — check back for an update.',
      ],
    },
    {
      id: 'totenreich-stuffed-elephant',
      name: 'Stuffed Elephant',
      tier: 2,
      effect: 'Health regen delay is increased.',
      steps: [
        'Activate Cursed Mode Tier I and reach Round 40 without buying or getting any Perks.',
        'A yellow portal will spawn on a wall behind Juggernog in Fishery Island.',
        'Shoot 4 Mr. Peeks Eggs around the map and defeat the HVT that spawns for each: lower catwalk at the Lighthouse (Beacon Island), window corner at the house behind Mule Kick (Skallen Market), near Tyr\'s Foot outside Storm Bridge, and on a steel beam next to the roof opening in the RK-9 room (Dry Dock).',
        'Interact with the yellow portal in Fishery Island to start the Relic Trial.',
      ],
    },
    {
      id: 'totenreich-dancing-arnie',
      name: 'Dancing Arnie',
      tier: 2,
      effect: 'All Perk-a-Cola machines give out random Perk-a-Colas.',
      steps: [
        'Activate Cursed Mode Tier I. Do NOT build the Jotunn Star before Step 4.',
        'Get the pot from the ground below a wooden table behind Mule Kick in Skallen Market and place it on the fire at the center of Blodheim Hall.',
        'Add a beer mug (on a wooden barrel near the barge between Loven\'s Antiquities and the Arsenal in Eidskallen Square) and Chilly Chunks (Storm Bridge) to the pot.',
        'Shoot the truck in Storm Bridge with an explosive weapon to get a new fish can, then build the Jotunn Star.',
        'Add two more items to the pot: kill a Necropincer with the Flammenfalle Trap only to get the red lobster, and use fishing spots during a Special Round (Round 41+) to catch a unique fish item.',
        'Mr. Peeks will appear above the pot. Kill 100 zombies with the Jotunn Star near him.',
        'A yellow portal spawns on a wall above Pack-a-Punch in Fishery Island. Survive 5 waves where zombies and HVTs can only take melee damage.',
      ],
    },
    {
      id: 'totenreich-agarthan-device',
      name: 'Agarthan Device',
      tier: 3,
      effect: 'Each round, a different type of zombie will spawn.',
      steps: [
        'Activate Cursed Mode Tier II. One player MUST be playing as Richtofen.',
        'Reach the Urzikstan and Liberty Falls room when ejecting from Tyr\'s head. Pick up the military helmet on a crate (Urzikstan) and grab Mr. Peeks from under the bed (Liberty Falls).',
        'Open the cell in Group 935 Genetic Lab and pick up the radio on the ground under the bench.',
        'Activate Richtofen\'s Echo of the Damned quest (Round 15+). Once the echo of Von List has left, place the items on the seat.',
        'A red portal spawns at Dry Dock. Survive 6 waves where zombies can only be damaged while players are indoors.',
      ],
    },
    {
      id: 'totenreich-music-box',
      name: 'Music Box',
      tier: 3,
      effect: 'Enemies only take critical damage.',
      steps: [
        'Activate Cursed Mode Tier II and reach Round 60.',
        'Enter Tyr\'s Head and from the window, get 5 Critical Kills.',
        'Mr. Peeks will laugh and a red portal will spawn on a wall in Dry Dock near the Melee Macchiato machine.',
        'Survive 6 waves by holding out lockdowns at specific locations on the map.',
      ],
    },
  ],
};
