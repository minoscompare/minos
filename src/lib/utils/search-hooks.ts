import { FormEvent, useEffect, useRef, useState } from 'react';
import { useHits, useSearchBox } from 'react-instantsearch-hooks';
import { BaseHit } from 'instantsearch.js/es/types';
import { HitsRenderState } from 'instantsearch.js/es/connectors/hits/connectHits';

export function useCustomSearchBox() {
  const { query, isSearchStalled, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current?.blur();
  }

  function handleReset() {
    setInputValue('');
    inputRef.current?.focus();
  }

  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    if (query !== inputValue) {
      refine(inputValue);
    }
  }, [inputValue, refine]);

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // Bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (document.activeElement !== inputRef.current && query !== inputValue) {
      setInputValue(query);
    }
  }, [query]);

  return {
    inputRef,
    inputValue,
    setInputValue,
    isSearchStalled,
    handleReset,
    handleSubmit,
  };
}

export function useCustomHits<T extends BaseHit>() {
  return useHits() as HitsRenderState<T>;
}
