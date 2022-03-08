import { FocusEventHandler, Ref, useRef } from 'react';
import {
  Box,
  CircularProgress,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useOutsideClick,
} from '@chakra-ui/react';
import { InstantSearch } from 'react-instantsearch-hooks';
import { searchClient } from '@minos/lib/utils/typesense';
import { MdClose, MdSearch } from 'react-icons/md';
import { useCustomSearchBox } from '@minos/lib/utils/search-hooks';
import NavBarSearchResults, {
  useSearchResultsPopper,
} from './NavBarSearchResults';
import mergeRefs from '@minos/lib/utils/merge-refs';

interface InputPropsWithRef extends InputProps {
  /**
   * React Ref that gets passed to the Chakra Input element
   */
  searchRef?: Ref<HTMLInputElement>;
}

interface CustomSearchBoxProps extends InputPropsWithRef {
  /**
   * Function that hides the results panel.
   */
  hideResults: () => void;
  /**
   * Function that shows the results panel.
   */
  showResults: () => void;
}

function CustomSearchBox({
  hideResults,
  showResults,
  searchRef,
  ...inputProps
}: CustomSearchBoxProps) {
  const {
    inputRef,
    inputValue,
    setInputValue,
    isSearchStalled,
    handleReset,
    handleSubmit,
  } = useCustomSearchBox();

  const ref = searchRef ? mergeRefs(inputRef, searchRef) : inputRef;

  return (
    <form
      noValidate
      action=""
      role="search"
      onSubmit={(event) => {
        handleSubmit(event);
        hideResults();
      }}
    >
      <InputGroup paddingInlineStart={0}>
        <Input
          ref={ref}
          variant="outline"
          placeholder="Search"
          type="search"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.currentTarget.value);
            if (event.currentTarget.value === '') {
              hideResults();
            } else {
              showResults();
            }
          }}
          onFocus={(event) => {
            if (event.currentTarget.value !== '') {
              showResults();
            }
          }}
          {...inputProps}
        />
        <InputRightElement>
          {isSearchStalled ? (
            <CircularProgress isIndeterminate size="1em" />
          ) : inputValue === '' ? (
            <MdSearch />
          ) : (
            <MdClose
              onClick={() => {
                handleReset();
                hideResults();
              }}
              cursor="pointer"
            />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default function NavBarSearchBar(props: InputPropsWithRef) {
  const ref = useRef<HTMLDivElement>(null);

  const popper = useSearchResultsPopper();

  useOutsideClick({ ref, handler: popper.onClose });

  return (
    <InstantSearch indexName="cpu" searchClient={searchClient}>
      <Box ref={ref}>
        <Box ref={popper.referenceRef} pointerEvents="all">
          <CustomSearchBox
            showResults={popper.onOpen}
            hideResults={popper.onClose}
            {...props}
          />
        </Box>
        {popper.isOpen && <NavBarSearchResults popperRef={popper.popperRef} />}
      </Box>
    </InstantSearch>
  );
}
