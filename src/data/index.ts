import type { MapData } from './types';
import { aotd } from './aotd';
import { kowakujo } from './kowakujo';
import { totenreich } from './totenreich';
import { paradox } from './paradox';
import { astra } from './astra';
import { rexInfernus } from './rexInfernus';

export type { MapData, Section, Step, SubStep, MediaRef } from './types';

export const maps: MapData[] = [aotd, astra, paradox, rexInfernus, totenreich, kowakujo];

export function getMapBySlug(slug: string): MapData | undefined {
  return maps.find((m) => m.slug === slug);
}
