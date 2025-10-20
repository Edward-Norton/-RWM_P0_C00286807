// Pure helper function: return the largest number of a single value
function BiggestWithSameDigits(x: number): number{
    var num = String(x).split('').sort().reverse().join('');
    return Number(num)
}

// Map over a sequence of numbers
export function largestNumbers(xs: number[]): number[] {
    return xs.map(BiggestWithSameDigits)
}
