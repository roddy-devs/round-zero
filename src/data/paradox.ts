import type { MapData } from './types';

export const paradox: MapData = {
  slug: 'paradox',
  name: 'Paradox Junction',
  game: 'Black Ops 7',
  subtitle: 'The Dark Heart',
  description:
    'Travel between Normal and Destroyed Nuketown timelines, build the Blundergat/Sundergat, reunite the Twins, and destroy the Dark Heart.',
  wonderWeapon: {
    name: 'Blundergat / Sundergat',
    sections: [
      {
        id: 'ww-parts',
        title: 'Collect the 4 Parts',
        steps: [
          {
            id: 'ww-1',
            text: 'The Sealant: In Normal Nuketown, go to the bedroom in Yellow House Upstairs. Get it from the bottom of the shelf near the window.',
          },
          {
            id: 'ww-2',
            text: 'The Barrel: In Destroyed Nuketown, find the Cyst emitting a humming sound and feed it souls until it drops.',
          },
          {
            id: 'ww-3',
            text: 'The Hammer: Get the SO3 Vial from Destroyed Yellow House Upstairs desk. Interact with the kitchen sink in Destroyed Green House for the H2SO4 Vial (3 uses, refillable at sink).',
          },
          {
            id: 'ww-4',
            text: 'Find the humming mannequin in Destroyed Nuketown (12 possible locations). Return to Normal Nuketown and pour H2SO4 on the corresponding mannequin.',
          },
          {
            id: 'ww-5',
            text: 'Go back to Destroyed Nuketown — the mannequin has dissolved and dropped The Hammer.',
          },
          {
            id: 'ww-6',
            text: 'The Stock: In Destroyed Nuketown, find black goo on a wall emitting a humming sound. Return to Normal Nuketown and throw an explosive at the corresponding wall.',
          },
          {
            id: 'ww-7',
            text: 'Go back to Destroyed Nuketown — The Stock is inside the hole in the wall.',
          },
          {
            id: 'ww-8',
            text: 'Melee the workbench in Destroyed Truck Interior to build the Blundergat.',
          },
        ],
      },
      {
        id: 'ww-upgrade',
        title: 'Sundergat Upgrade',
        steps: [
          {
            id: 'ww-9',
            text: 'In Destroyed Nuketown, wait for a Tortured Zombie (fire tornado) to spawn. Bring it near the bench and kill it with the Blundergat.',
          },
          { id: 'ww-10', text: 'Wait for next round, repeat with a second Tortured Zombie.' },
          {
            id: 'ww-11',
            text: 'Third round: a Tortured Zombie spawns and transforms into a Mimic. Kill it near the bench with the Blundergat.',
          },
          { id: 'ww-12', text: 'Travel to Normal Nuketown and melee the workbench, then place the Blundergat.' },
          { id: 'ww-13', text: 'Return to Destroyed Nuketown. Melee the workbench to pick up the Sundergat.' },
        ],
      },
    ],
  },
  mainQuest: {
    name: 'The Dark Heart',
    sections: [
      {
        id: 'mq-twins-setup',
        title: 'The Twins — Swing Setup',
        steps: [
          { id: 'mq-1', text: 'Obtain the Sundergat.', wonderWeaponLink: true },
          {
            id: 'mq-2',
            text: 'In Normal Nuketown, shoot the swing in Yellow House Backyard and pick up the Swing Seat.',
          },
          {
            id: 'mq-3',
            text: 'In Destroyed Nuketown, find the RC-XD Controller (near PaP boxes, Green House Backyard fence, or Yellow House garage shelves). Trigger and complete the RC-XD race into the garage.',
          },
          { id: 'mq-4', text: 'Enter the garage. A corpse turns to ash — pick up the Chalk.' },
          {
            id: 'mq-5',
            text: 'In Yellow House Backyard, interact with the swing chains to place the Swing Seat and Chalk. The Twins appear.',
          },
        ],
      },
      {
        id: 'mq-tree',
        title: 'Strange Tree, Hopscotch & Music Box',
        steps: [
          {
            id: 'mq-t1',
            text: 'In Destroyed Nuketown, get the Irradiated Seeds from the red toolbox in Yellow House Garage (crouch to interact).',
          },
          {
            id: 'mq-t2',
            text: 'In Normal Nuketown, plant the seeds in the earth mound in Trinity Ave (left of PaP). Kill zombies with the Blundergat/Sundergat to fill the tree with souls.',
          },
          {
            id: 'mq-t3',
            text: 'In Destroyed Nuketown, throw 3 Combat Axes at the grown tree to get 3 Strange Firewood.',
          },
          {
            id: 'mq-t4',
            text: 'In Normal Nuketown, place the firewood in Yellow House fireplace and throw a Molotov to light it.',
          },
          {
            id: 'mq-t5',
            text: 'In Destroyed Nuketown, step on the massive X in Trinity Ave (facing Wunderfizz) until it glows blue and stays blue.',
          },
          {
            id: 'mq-t6',
            text: 'Return to Normal Nuketown, same spot in Trinity Ave. The Twins draw a hopscotch game.',
          },
          {
            id: 'mq-t7',
            text: 'Interact with the white orb to start the trial. Jump from 1→12 then 12→1 while avoiding black smoke (3rd person).',
          },
          {
            id: 'mq-t8',
            text: 'A golden music box spawns. Kill zombies with the Sundergat to fill it with souls and escort it to the fireplace.',
          },
        ],
      },
      {
        id: 'mq-piano',
        title: 'Piano Lesson, Bouncing Ball & Music Sheet',
        steps: [
          {
            id: 'mq-p1',
            text: 'In Destroyed Nuketown, wait in Green House Backyard for the Piano Teacher zombie. Turn it with Brain Rot or Psych Grenade.',
          },
          {
            id: 'mq-p2',
            text: 'Follow the Piano Teacher into Green House. Quickly teleport back to Normal Nuketown — the teacher will play the piano.',
          },
          {
            id: 'mq-p3',
            text: 'In Destroyed Nuketown, find 8 blue notes around the map. Each blinks 1–8 times indicating order. Interact in blink order.',
          },
          {
            id: 'mq-p4',
            text: 'In Normal Nuketown, interact with the piano to play the notes in the wall order.',
            details: 'The order is always: 8-6-7-5-6-5-3-5',
          },
          {
            id: 'mq-p5',
            text: 'In Destroyed Nuketown, kill 3 floating zombies outside the map (Green House or Yellow House Backyard) to free their souls.',
          },
          {
            id: 'mq-p6',
            text: 'In Normal Nuketown, find the Twins drawing a circle in Trinity Ave. Interact with the ball to start the trial.',
          },
          {
            id: 'mq-p7',
            text: 'Kill every zombie launched into the air before the ball hits the ground.',
          },
          {
            id: 'mq-p8',
            text: 'A music sheet appears. Kill zombies with the Sundergat to fill it with souls and escort it to the piano at Green House.',
          },
        ],
      },
      {
        id: 'mq-toybox',
        title: 'Toy Box & Four Square',
        steps: [
          {
            id: 'mq-tb1',
            text: 'In Destroyed Nuketown, shoot the top of the speaker pole in Trinity Ave (outside the map) to drop Goggles. Use Wisp Tea to bring them into the map.',
          },
          {
            id: 'mq-tb2',
            text: 'With Death Perception, find a Headset outline (Cul-De-Sac trash cans, Green House bedroom coat rack, or Yellow House Backyard mannequin).',
          },
          {
            id: 'mq-tb3',
            text: 'In Normal Nuketown, interact with the blue toy box near the chalk circle crates.',
          },
          {
            id: 'mq-tb4',
            text: 'In Destroyed Nuketown, find a red ball (Trinity Ave crates, rooftop, or Yellow House mezzanine). Shoot it to the massive X in Green House Backyard.',
          },
          {
            id: 'mq-tb5',
            text: 'Return to Normal Nuketown. The Twins draw a Four Square. Interact with the ball.',
          },
          {
            id: 'mq-tb6',
            text: 'Melee the ball into different squares until the timer ends. Ball can only bounce once per square.',
          },
          {
            id: 'mq-tb7',
            text: 'Glowing cymbals appear. Kill zombies with the Sundergat to fill them and escort to the toy box at Trinity Ave.',
          },
        ],
      },
      {
        id: 'mq-clock',
        title: 'Clock Tower & Boss Trigger',
        steps: [
          {
            id: 'mq-c1',
            text: 'In Destroyed Nuketown, shoot the crumbled clock to move both hands to 0.',
          },
          {
            id: 'mq-c2',
            text: 'Start teleporting back to Normal Nuketown, but during the animation shoot the hands again to move them.',
          },
          {
            id: 'mq-c3',
            text: 'A white orb appears and triggers a sequence: orb moves to piano → Twins appear → Toy Box → Fireplace → Swing in Yellow House Backyard with a yellow portal.',
          },
        ],
      },
      {
        id: 'mq-boss',
        title: 'The Dark Heart Boss Fight',
        steps: [
          {
            id: 'mq-b1',
            text: 'Phase 1: Three piles of black goo spawn (Trinity Ave, Yellow House Backyard, Green House Backyard). Kill zombies to fill the cyst near each pile, revealing objects (Piano, Music Box, Fireplace).',
          },
          {
            id: 'mq-b2',
            text: 'Defend the Concentration Field as it moves through each object. Redirect fire tornadoes with Molotovs.',
          },
          {
            id: 'mq-b3',
            text: 'Damage the Dark Heart\'s glowing orange areas. Dodge meteors and tornadoes. Max Ammo/Armor spawns after depleting 1/3 health.',
          },
          {
            id: 'mq-b4',
            text: 'Phase 2: Rad-Hounds join. Kill zombies from green orbs above objects to remove goo. Defend Concentration Fields again.',
          },
          {
            id: 'mq-b5',
            text: 'Phase 3: Shock Mimics join. Bring a Tortured Zombie to objects and kill it to remove goo. Defend fields one final time.',
          },
          { id: 'mq-b6', text: 'Damage the Dark Heart until killed. Final cutscene plays.' },
        ],
      },
    ],
  },
  relics: [
    {
      id: 'paradox-rocket',
      name: 'Rocket',
      tier: 1,
      effect: 'No Scorestreaks.',
      steps: [
        'Reach Round 20.',
        'In Normal Nuketown, Brain Rot a Rad-Hound and pet it.',
        'Call in a D.A.W.G.S. killstreak in Destroyed Nuketown, put it in Sentry Mode, and pet it.',
        'Travel to Normal Nuketown and interact with the green portal in Green House Upstairs to start the Relic Trial.',
        'Survive 4 waves — enemies only take damage from their elemental weakness: Shadow Rift for Toxic Zombies and Rad-Hounds, Light Mend for Doppelghasts, Brain Rot for Shock Mimics.',
      ],
    },
    {
      id: 'paradox-summoning-key',
      name: 'Summoning Key',
      tier: 2,
      effect: 'Zombies explode on death, dealing damage to nearby players.',
      steps: [
        'Activate Cursed Mode Tier I.',
        'Throw a grenade into the broken outside chimney of Destroyed Green House near Cul-De-Sac to drop the Dog Collar of Notso.',
        'In Normal Nuketown, turn a Rad-Hound using Brain Rot or Psych Grenade. The dog will start digging in Yellow House Backyard, then stop — pick up the ball in its mouth.',
        'Reach Round 40 and down yourself near the fences at the very back of Green House Backyard, behind the Perk location. A headstone will rise from the ground — interact with it to place the ball and dog collar.',
        'Interact with the yellow portal against the wall of Yellow House Backyard in Normal Nuketown to start the Relic Trial.',
        'Survive 5 waves, killing all enemies before the timer runs out (90 seconds per wave).',
      ],
    },
    {
      id: 'paradox-mangler-helmet',
      name: 'Mangler Helmet',
      tier: 3,
      effect: 'No Arsenal.',
      steps: [
        'Activate Cursed Mode Tier II. Do not pick the Seed Relic for this.',
        'Equip the Mister Peeks Field Upgrade and use the Mystery Box until Mister Peeks appears. Activate the Field Upgrade to drop him, then pick him up. Do this in both Normal and Destroyed Nuketown.',
        'Place Mister Peeks on the mailbox of Yellow House in both versions of Nuketown.',
        'Reach Round 60, then pick up the Ultra Knife found in the now-opened mailbox in either Nuketown. A HVT Mimic will spawn — kill it with the Knife only (it can be Pack-a-Punched). If killed with anything else, the Mimic respawns next round.',
        'Travel to Destroyed Nuketown and interact with the red portal that spawned in front of the Green House front balcony to start the Relic Trial.',
        'Survive 6 waves with all Armor Plates removed and 50 less HP.',
      ],
    },
  ],
};
