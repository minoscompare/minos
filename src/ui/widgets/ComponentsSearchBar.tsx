import { useRef, KeyboardEventHandler, ComponentClass } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
} from 'react-instantsearch-dom';
import { searchClient } from '@minos/lib/utils/typesense';
import NextLink from 'next/link';
import { MdClose, MdSearch } from 'react-icons/md';
import { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { CpuTypesenseDoc } from '@minos/lib/types';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';

const CustomHits = connectHits<CpuTypesenseDoc>(({ hits }) => {
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
            <NextLink href={`/cpu/${hit.id}`}>
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
});

interface CustomSearchBoxProps {
  onClose: () => void;
  onOpen: () => void;
}

const CustomSearchBox = connectSearchBox(
  ({
    currentRefinement,
    isSearchStalled,
    refine,
    onClose,
    onOpen,
  }: CustomSearchBoxProps & SearchBoxProvided) => (
    <form noValidate action="" role="search">
      <InputGroup paddingInlineStart={0}>
        <Input
          variant="outline"
          placeholder="Search"
          type="search"
          value={currentRefinement}
          onChange={(event) => {
            refine(event.currentTarget.value);
            if (event.currentTarget.value === '') {
              onClose();
            }
          }}
          onKeyDown={onOpen}
        />
        <InputRightElement>
          {isSearchStalled ? (
            <CircularProgress isIndeterminate size="1em" />
          ) : currentRefinement === '' ? (
            <MdSearch />
          ) : (
            <MdClose
              onClick={() => {
                refine('');
                onClose();
              }}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  )
) as ComponentClass<CustomSearchBoxProps & SearchBoxExposed, any>;

export default function ComponentsSearchBar() {
  const ref = useRef<HTMLDivElement>(null);
  const menu = useDisclosure();

  useOutsideClick({
    ref,
    handler: menu.onClose,
  });

  return (
    <InstantSearch indexName="cpu" searchClient={searchClient}>
      <Box ref={ref}>
        <Menu isOpen={menu.isOpen}>
          <MenuButton
            mx={1}
            py={[1, 2, 2]}
            // px={4}
            borderRadius={5}
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            aria-label="Search Bar"
            fontWeight="normal"
          >
            <Box pointerEvents="all">
              <CustomSearchBox onOpen={menu.onOpen} onClose={menu.onClose} />
            </Box>
          </MenuButton>
          <MenuList w={[100, 260, 300, 460]}>
            <CustomHits />
          </MenuList>
        </Menu>
      </Box>
    </InstantSearch>
  );
}
