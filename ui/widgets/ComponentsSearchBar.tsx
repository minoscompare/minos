import { useRef, KeyboardEventHandler, ComponentClass } from 'react';
import {
  Box,
  CircularProgress,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
} from 'react-instantsearch-dom';
import { searchClient } from '@minos/lib/client/typesense';
import { Minos } from '@minos/lib/types';
import NextLink from 'next/link';
import { MdClose, MdSearch } from 'react-icons/md';
import { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';

const CustomHits = connectHits<Minos.CpuTypesenseDoc>(({ hits }) => (
  <>
    {hits.map((hit) => (
      <Box key={hit.id} flex={1} mx={3} my={2}>
        <NextLink href={`/cpu/${hit.id}`}>
          <Link>
            <Text isTruncated>
              {hit.brand} {hit.name}
            </Text>
          </Link>
        </NextLink>
      </Box>
    ))}
  </>
));

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
            variant="ghost"
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
          <MenuList w={260}>
            <CustomHits />
          </MenuList>
        </Menu>
      </Box>
    </InstantSearch>
  );
}
