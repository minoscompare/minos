import { useRef } from 'react';
import {
  Box,
  CircularProgress,
  Input,
  InputGroup,
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

interface CustomSearchBoxProps {
  onClose: () => void;
  onOpen: () => void;
}

function CustomSearchBox({ onClose, onOpen }: CustomSearchBoxProps) {
  const {
    inputRef,
    inputValue,
    setInputValue,
    isSearchStalled,
    handleReset,
    handleSubmit,
  } = useCustomSearchBox();

  return (
    <form noValidate action="" role="search" onSubmit={handleSubmit}>
      <InputGroup paddingInlineStart={0}>
        <Input
          ref={inputRef}
          variant="outline"
          placeholder="Search"
          type="search"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.currentTarget.value);
            if (event.currentTarget.value === '') {
              onClose();
            }
          }}
          onKeyDown={onOpen}
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
                onClose();
              }}
              cursor="pointer"
            />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default function ComponentsSearchBar() {
  const ref = useRef<HTMLDivElement>(null);

  const popper = useSearchResultsPopper();

  useOutsideClick({
    ref: ref,
    handler: popper.onClose,
  });

  return (
    <InstantSearch indexName="cpu" searchClient={searchClient}>
      <Box ref={ref}>
        <Box ref={popper.referenceRef} pointerEvents="all">
          <CustomSearchBox onOpen={popper.onOpen} onClose={popper.onClose} />
        </Box>
        {popper.isOpen && <NavBarSearchResults popperRef={popper.popperRef} />}
      </Box>
    </InstantSearch>
  );
}
