/**
 * Retrieve the array key corresponding to the largest element in the array.
 * If all values are null, returns null.
 *
 * @param array Input array
 * @return Index of array element with largest value or null if no largest value found.
 */
export function argMaxWithNull(array: (number | null)[]): number | null {
  const withIndexes = array.map((x, idx) => [x, idx] as const);
  const withoutNullValues = withIndexes.filter((a) => !!a[0]) as Array<
    [number, number]
  >;
  if (withoutNullValues.length === 0) return null;
  const reduced = withoutNullValues.reduce((r, a) => (a[0] > r[0] ? a : r));
  return reduced[1];
}

/**
 * Retrieve the array key corresponding to the smallest element in the array.
 * If all values are null, returns null.
 *
 * @param array Input array
 * @return Index of array element with smallest value or null if no smallest value found.
 */
export function argMinWithNull(array: (number | null)[]): number | null {
  const withIndexes = array.map((x, idx) => [x, idx] as const);
  const withoutNullValues = withIndexes.filter((a) => !!a[0]) as Array<
    [number, number]
  >;
  if (withoutNullValues.length === 0) return null;
  const reduced = withoutNullValues.reduce((r, a) => (a[0] < r[0] ? a : r));
  return reduced[1];
}
