import { useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
  usePopper,
} from '@chakra-ui/react';
import { InstantSearch } from 'react-instantsearch-hooks';
import { searchClient } from '@minos/lib/utils/typesense';
import { MdClose, MdSearch } from 'react-icons/md';
import {
  useCustomHits,
  useCustomSearchBox,
} from '@minos/lib/utils/search-hooks';
import { CpuTypesenseDoc } from '@minos/lib/types';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';
import NextLink from 'next/link';

function useSearchResultsPopper() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { popperRef, referenceRef } = usePopper({ placement: 'bottom-start' });
  return { isOpen, onOpen, onClose, popperRef, referenceRef };
}

function CustomHits() {
  const { hits } = useCustomHits<CpuTypesenseDoc>();
  // Gets CPU Ids atom and creates a function to modify them
  const [comparedIDs, setComparedIDs] = useCompareCpus();

  function addComparedID(newID: number) {
    if (!comparedIDs.includes(newID)) {
      setComparedIDs([...comparedIDs, newID]);
    }
  }

  // Returns HTML
  return (
    <>
      {hits.map((hit) => (
        <Box key={hit.id} flex={1} mx={3} my={2}>
          <HStack>
            <NextLink href={`/cpu/${hit.id}`} passHref>
              <Link flex={1} isTruncated>
                {hit.fullName}
              </Link>
            </NextLink>
            <NextLink href="/cpu/compare">
              <Button
                size="xs"
                isDisabled={comparedIDs.includes(parseInt(hit.id))}
                onClick={() => addComparedID(parseInt(hit.id))}
              >
                Compare
              </Button>
            </NextLink>
          </HStack>
        </Box>
      ))}
    </>
  );
}

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

  const popperBg = useColorModeValue('#fff', 'gray.700');
  const popperShadow = useColorModeValue('sm', 'dark-lg');

  return (
    <InstantSearch indexName="cpu" searchClient={searchClient}>
      <Box ref={ref}>
        <Box ref={popper.referenceRef} pointerEvents="all">
          <CustomSearchBox onOpen={popper.onOpen} onClose={popper.onClose} />
        </Box>
        {popper.isOpen && (
          <Box
            ref={popper.popperRef}
            w={{ sm: 260, lg: 360 }}
            bg={popperBg}
            boxShadow={popperShadow}
            color="inherit"
            py={2}
            zIndex={1}
            borderRadius="md"
            borderWidth="1px"
          >
            <CustomHits />
          </Box>
        )}
      </Box>
    </InstantSearch>
  );
}
