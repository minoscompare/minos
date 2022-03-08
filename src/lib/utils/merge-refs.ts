import { LegacyRef, MutableRefObject, Ref, RefObject } from 'react';

// Copied from react-merge-refs
// https://github.com/gregberge/react-merge-refs/blob/main/src/index.tsx

export default function mergeRefs<T = any>(
  ...refs: Array<MutableRefObject<T> | LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
        // eslint-disable-next-line eqeqeq
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
