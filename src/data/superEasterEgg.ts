export interface SeeStep {
  text: string;
  note?: string;
  image?: string;
  imageCaption?: string;
}

export interface SeeSection {
  id: string;
  title: string;
  subtitle: string;
  steps: SeeStep[];
}

const IMG = '/images/super-easter-egg';

/**
 * "Playdate with the Twins" — the cross-map super easter egg.
 * Collect a toy from each of the five maps and bring them to Rex Infernus
 * for the final boss rush. Sourced from the map PDF guides.
 */
export const superEasterEgg: {
  title: string;
  subtitle: string;
  intro: string;
  credits: string;
  sections: SeeSection[];
} = {
  title: 'Super Easter Egg',
  subtitle: 'Playdate with the Twins',
  intro:
    'Collect a toy from each of the five maps and transfer them to the Rex Infernus house, then start the final encounter — a boss rush against every toy you gathered.',
  credits: 'Freckleston1, MrDalekJD, UFO, BeaK, Vini, ZoneX Discord',
  sections: [
    {
      id: 'astra',
      title: 'Astra Malorum',
      subtitle: 'Collect the Toy Caltheris',
      steps: [
        { text: 'Load into Astra Malorum.' },
        {
          text: 'The Toybox has multiple spawn locations, all outside the zombie barriers. It starts floating out in space — throw a grenade at it or shoot it with Packed 1911s (Mustang & Sally).',
          image: `${IMG}/astra-toybox-1911s.webp`,
          imageCaption: 'The floating Toybox out in space near The Luminarium.',
        },
        {
          text: 'It will then move to a new position — hit it again with a grenade or Packed 1911s, and it will float down into spawn.',
          image: `${IMG}/astra-toybox-moved.webp`,
        },
        { text: 'Throw a Kazimir Grenade at the floating Toybox to make it land.' },
        { text: 'Turn on Power / Pack-a-Punch.' },
        { text: 'Do the DG-2 Turret space jump, then place it on Tessie.' },
        { text: 'Kill O.S.C.A.R. with the DG-2 Turret to open the box.' },
        {
          text: 'Go to the Telescope at Pack-a-Punch — a shooting star will appear on the Telescope.',
          image: `${IMG}/astra-telescope-star.webp`,
        },
        {
          text: 'Do the Slow Down Time side easter egg: rapidly melee 5 grandfather clocks around the map (one in The Luminarium by the bookshelves, one in Museum Infinitum near Speed Cola, two in Machina Astralis, one in Archive of Orbis next to Stamin-Up).',
          note: 'If done correctly, all enemies move slowly for 60 seconds. Repeatable once per round.',
        },
        {
          text: 'Use the Telescope and look directly at the UFO. It will blink at you and fly away, and the Twins will say "I think you scared him with your face."',
          note: 'If you fail, the Twins instead say "Woah he\'s so fast."',
        },
        { text: "Progress the Main Quest up to the Boss Fight, but don't start it." },
        { text: 'Go to Mars. In the right-hand corner there are disks blinking with a blue light.' },
        {
          text: 'Craft Shock Charges at a crafting table and throw them at the blinking lights (finicky — there is a sound cue when done correctly).',
        },
        {
          text: 'The UFO flies in, floats, and blinks its light in Morse code, giving you 4 initials for the 4 items in the chambers on the left side of the Mars arena.',
          image: `${IMG}/astra-mars-chambers.webp`,
        },
        {
          text: 'The four items are: Flamingo, Lava Lamp, Space Suit, and Toilet.',
          image: `${IMG}/astra-four-items.webp`,
          imageCaption: 'The four chamber items.',
        },
        {
          text: 'Do the Lantern Wisp side easter egg. There are 9 lanterns against walls (two in Crash Site, three in the courtyard in front of The Luminarium, two at the back of The Luminarium, two in Scholar\'s Way). Find the lantern blinking with a white wisp and aim at it to obtain the wisp — it orbits around you. Your melee button throws the wisp before it returns.',
        },
        {
          text: 'To upgrade the wisp, place it inside all 9 lanterns by throwing it and retrieving it. Once it is in the last lantern, pass the round.',
          note: 'The wisp turns yellow/orange and becomes available from any lantern. You can carry up to 5 wisps at a time.',
        },
        {
          text: 'Return to Mars and interact with the chambers using the wisps, giving the UFO the items in the order of your Morse code.',
        },
        { text: 'Once you give the Toilet, the UFO drops the Alien.' },
        { text: 'Return to the Toybox at spawn and place the Alien inside to receive the Toy Caltheris.' },
        { text: 'Use the Exfil Booth to transfer the Toy Caltheris to the Rex Infernus house.' },
      ],
    },
    {
      id: 'ashes',
      title: 'Ashes of the Damned',
      subtitle: 'Collect the Toy Ol\u2019 Tessie',
      steps: [
        { text: 'Load into Ashes of the Damned.' },
        { text: 'Open up the map and switch on all 3 Power Stations.' },
        {
          text: 'Find the Twins around the map — they can spawn on the fog road between Blackwater and Ashwood, in Ashwood, on the boat in the fog, or by the right side of the cabin near Blackwater lake (the tier-3 relic telephone cabin).',
          image: `${IMG}/ashes-twins-cabin.webp`,
        },
        { text: 'Approach them and they will teleport to Vandorn Farm.' },
        { text: 'Go to the farm — the Twins will be sat on top of the barn.' },
        { text: 'The Toybox will be floating in front of the windmill.' },
        {
          text: 'Craft the Necrofluid Gauntlet and pull the Toybox down.',
          note: 'Credit: Freckleston1',
          image: `${IMG}/ashes-necrofluid-toybox.webp`,
        },
        { text: 'Use Dark Flare to open the box; the Twins will say "help us find our toy."' },
        {
          text: 'Pick up the Fumigator from the Spore side easter egg (multiple locations: spawn, the shed behind the cabin at Blackwater Lake, the 115 Diner near the garage, or Ashwood near Double Tap).',
        },
        {
          text: 'Three pink crystals appear between Blackwater Lake and Janus Towers. Pull them down with the Necrofluid Gauntlet, then interact with them using the Fumigator.',
          image: `${IMG}/ashes-pink-crystals.webp`,
        },
        {
          text: 'Once all 3 crystals are collected, a 115 Meteor crashes in the Blackwater fog near the gate.',
          image: `${IMG}/ashes-meteor.webp`,
        },
        { text: 'Flip the round, then interact with the meteor to get the Toy Ol\u2019 Tessie.' },
        { text: 'Return to the Toybox at the farm and place it inside.' },
        { text: 'Use the Exfil Booth to transfer the Toy Ol\u2019 Tessie to the Rex Infernus house.' },
      ],
    },
    {
      id: 'totenreich',
      title: 'Totenreich',
      subtitle: 'Collect the Toy Guardian',
      steps: [
        { text: 'Load into Totenreich.' },
        { text: 'Turn on Power / Pack-a-Punch.' },
        {
          text: 'Open up the map and build the Jotunn Star (for Lighthouse Island). A tiny iceberg will appear in the water.',
          image: `${IMG}/totenreich-jotunn-star.webp`,
        },
        {
          text: 'Get the Fishing Rod from one of four spawn locations: Dry Dock, Storm Bridge, Fishery Island, or Beacon Island.',
        },
        {
          text: 'Use the Fishing Rod with Wildfire to set it on fire, then fish the iceberg out of the water (Wildfire melts it).',
          note: 'You can soft-lock this by interacting too quickly. Place the rod, then activate Wildfire and the rod should catch fire.',
          image: `${IMG}/totenreich-fishing-iceberg.webp`,
        },
        { text: 'The Twins will say "the box likes presents."' },
        {
          text: 'King Draugvald spawns in the burial grounds — it has a lot of health and deals heavy damage.',
        },
        {
          text: 'Complete the Wonder Weapon quest (may not be required) to open Lighthouse Island. Head to the first floor (you can wall-jump up) and pick up the grey crossbow "The Silent Heir" on a broken ledge. The Twins will say "that\u2019s a big kid toy."',
          image: `${IMG}/totenreich-silent-heir.webp`,
        },
        { text: 'Kill King Draugvald with the crossbow and he will drop The Crown — pick it up.' },
        { text: 'Return to the Toybox at the dock and place The Crown inside to receive the Toy Guardian.' },
        { text: 'Use the Exfil Booth to transfer the Toy Guardian to the Rex Infernus house.' },
      ],
    },
    {
      id: 'kowakujo',
      title: 'Kowakujo',
      subtitle: 'Collect the Toy Z-Rex',
      steps: [
        { text: 'Load into Kowakujo.' },
        { text: 'Turn on Power / open Pack-a-Punch.' },
        {
          text: 'The Toybox will appear on the Castle roof.',
          image: `${IMG}/kowakujo-toybox-roof.webp`,
        },
        { text: 'Ensure all 4 cherry trees are alive by meleeing them.' },
        {
          text: 'Get the Tornado Flower Power from the tree inside the Castle, and run in a circle below the box. This causes it to fly down and open.',
        },
        {
          text: 'A bird flies out and circles the castle tree. Activate it by meleeing it 5 times, and it will perch on the roof.',
        },
        {
          text: 'Activate the other cherry trees in order: Kitchens tree, Staging Area tree, Training Area tree.',
        },
        {
          text: 'The bird perches near each tree as you activate them. Once it is perched near the Training Area, use the Flower Power in front of the Tom Kane tree.',
        },
        { text: 'This drops an Origami Bird.' },
        { text: 'Return to the Toybox at the Castle and place the Origami Bird inside to receive the Toy Z-Rex.' },
        { text: 'Use the Exfil Booth to transfer the Toy Z-Rex to the Rex Infernus house.' },
      ],
    },
    {
      id: 'rex',
      title: 'Rex Infernus',
      subtitle: 'Collect the Toy Warden & start the Final Encounter',
      steps: [
        {
          text: 'Once you have collected the previous 5 toys, load into Rex Infernus.',
          note: 'Collecting them in map order may not be strictly required but makes sense.',
        },
        {
          text: 'Each of the toy items appears on the shelf inside the house.',
          image: `${IMG}/rex-toy-shelf.webp`,
          imageCaption: 'All five toys collected on the house shelf.',
        },
        { text: 'Turn on Pack-a-Punch to activate the Void Claw.' },
        { text: 'Complete the Easter Egg up to building the Warden\u2019s Blight.' },
        { text: 'Shoot the basketball at the house and complete the House Symbols part of the Main Quest.' },
        {
          text: 'On an exfil round, teleport to her house by shooting the symbols, then get the Eye to upgrade the Void Claw into the Void Talon (red grapple).',
        },
        { text: 'Go to Nyxara\u2019s Passage — in a gap there will be a lock.' },
        { text: 'Grapple to the lock and you will teleport to an obstacle course.' },
        {
          text: 'You have 2 minutes to climb to the Toybox on the front of the house.',
          image: `${IMG}/rex-obstacle-course.webp`,
        },
        { text: 'Use Aether Shroud and interact with the box to open it.' },
        {
          text: 'Three horses now float in the air near perk machines (near Juggernog, near Widow\u2019s Wine, near PhD Flopper). They spawn in order.',
        },
        {
          text: 'The horses are Soulboxes. Grapple them to pull them down, then melee them — they turn into ghost items showing an action to complete: Skates = PhD kills, Shoes = kills while jumping, Laces = Frenzied Guard kills.',
        },
        { text: 'Once each Soulbox is complete, pick up every part.' },
        { text: 'On an exfil round, a portal appears in front of the house to teleport there.' },
        { text: 'Place the parts in the Toybox to receive the Toy Warden.' },
        {
          text: 'Go to the shelf and the Toy Warden is placed on it.',
          note: 'In co-op, make sure all players do this or they will not get the rewards.',
        },
        {
          text: 'You can now start The Final Encounter. It is permanently on the shelf and can be started every Rex game, even from round 1.',
        },
      ],
    },
    {
      id: 'boss-rush',
      title: 'The Final Encounter',
      subtitle: 'Veytharion\u2019s Boss Rush',
      steps: [
        { text: 'You teleport to Veytharion\u2019s Boss Fight Chamber — this is a boss rush.' },
        {
          text: 'You start with 2500 Salvage and 10K Essence for free. The arena has a crafting table, Wunderfizz, and Pack-a-Punch.',
        },
        {
          text: 'After each boss is defeated you get a 1-minute buffer before Playtime continues.',
          note: 'It is unclear whether the bosses appear in a set order or are randomized.',
        },
        { text: 'Z-Rex — weakness unknown.' },
        { text: 'Guardian — weakness unknown.' },
        {
          text: 'Demolition Derby — you get two Tessies. Kill 400 zombies, then Abominations spawn; kill 400 more zombies, then a wave of bears spawns in.',
        },
        { text: 'Caltheris — you go zero-gravity during this fight and damage is capped.' },
        { text: 'The Warden — for the final fight you are teleported to the Rex Infernus arena, reportedly with new attacks.' },
        {
          text: 'Once you complete the boss rush you get a long cutscene of moments from across the Dark Aether story with the "Remember Us" song playing over it.',
        },
      ],
    },
  ],
};
