import { describe, it, expect } from 'vitest';
import { largestNumbers } from './biggestWithSameDigits';

describe('BiggestWithSameNumber filter', () => {
  it('biggestWithSameNumber sequence', () => {
    const input = [5, 10, 120, 58, 2017, 231];
    const expected = [5, 10, 210, 85, 7210, 231];
    expect(largestNumbers(input)).toEqual(expected);
  });
});