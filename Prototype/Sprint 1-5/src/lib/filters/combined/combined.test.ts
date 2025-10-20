// src/lib/combined/combined.test.ts
import { describe, it, expect } from 'vitest';
import { combinedFilter } from './combined';
import { largestNumbers } from '../biggestWithSameDigits';

describe('combined (mine → peer)', () => {
  it('biggestWithSameNumber sequence', () => {
      const input = [5, 10, 120, 58, 2017, 231];
      const expected = [5, 10, 210, 85, 7210, 321];
      expect(largestNumbers(input)).toEqual(expected);
    });

  it('peer cases', () => {
    const input = [4,2,8,3,9,4,10];
    const expected = [17,23,29,22,28,17,31];
    expect(combinedFilter(input)).toEqual(expected);
  });
});
