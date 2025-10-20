// src/lib/combined/combined.ts
import { largestNumbers as myLargestNumbers } from '../biggestWithSameDigits';
//Import peers package filter
import { multipleXors as peerXors } from 'peer-filter-c00281735/src/lib/filters/xor21.ts';

export function combinedFilter(xs: number[]): number[] {
    return peerXors(xs);
}