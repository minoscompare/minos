/**
 * Retrieve the array indices corresponding to the largest elements in the array.
 * If all values are identical, returns an empty array.
 *
 * @example
 * argMaxWithNull([2, 3, 4, 1]); // [2]
 * argMaxWithNull([null, 4, 3, 1, 4]); // [1, 4]
 * argMaxWithNull([null, null, null]); // []
 * argMaxWithNull([1, 1, 1, 1, 1]); // []
 * @param array Input array
 * @return Indices of array elements with the largest value
 */
export function argMaxWithNull(array: (number | null)[]): number[] {
  const withIndexes = array.map((x, idx) => [x, idx] as const);
  const withoutNullValues = withIndexes.filter((a) => !!a[0]) as Array<
    [number, number]
  >;
  if (withoutNullValues.length === 0) return [];

  let maxIndices = [withoutNullValues[0][1]];

  for (const [val, idx] of withoutNullValues.slice(1)) {
    if (val > array[maxIndices[0]]!) {
      maxIndices = [idx];
    } else if (val === array[maxIndices[0]]!) {
      maxIndices.push(idx);
    }
  }

  // If all values are identical, return an empty array
  if (maxIndices.length === withoutNullValues.length) {
    return [];
  }

  return maxIndices;
}

/**
 * Retrieve the array indices corresponding to the smallest elements in the array.
 * If all values are identical, returns an empty array.
 *
 * @example
 * argMinWithNull([2, 3, 4, 1]); // [2]
 * argMinWithNull([null, 4, 3, 1, 4]); // [1, 4]
 * argMinWithNull([null, null, null]); // []
 * argMinWithNull([1, 1, 1, 1, 1]); // []
 * @param array Input array
 * @return Indices of array elements with the smallest value
 */
export function argMinWithNull(array: (number | null)[]): number[] {
  const withIndexes = array.map((x, idx) => [x, idx] as const);
  const withoutNullValues = withIndexes.filter((a) => !!a[0]) as Array<
    [number, number]
  >;
  if (withoutNullValues.length === 0) return [];

  let minIndices = [withoutNullValues[0][1]];

  for (const [val, idx] of withoutNullValues.slice(1)) {
    if (val < array[minIndices[0]]!) {
      minIndices = [idx];
    } else if (val === array[minIndices[0]]!) {
      minIndices.push(idx);
    }
  }

  // If all values are identical, return an empty array
  if (minIndices.length === withoutNullValues.length) {
    return [];
  }

  return minIndices;
}
