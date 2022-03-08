import {
  Box,
  Button,
  Center,
  CircularProgress,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
  useHits,
  usePagination,
  useSearchBox,
} from 'react-instantsearch-hooks';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import { searchClient } from '@minos/lib/utils/typesense';
import { MdClose, MdSearch } from 'react-icons/md';
import { CpuTypesenseDoc } from '@minos/lib/types';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { GetServerSideProps } from 'next';
import { Layout } from '@minos/ui/components/Layout';
import { getServerState } from 'react-instantsearch-hooks-server';
import { Hit } from 'react-instantsearch-core';
import { FormEvent, useEffect, useRef, useState } from 'react';

function CustomHits() {
  const hits = useHits().hits as unknown as Hit<CpuTypesenseDoc>[];
  return (
    <ItemLinkList
      listItems={hits.map((cpu) => ({
        id: parseInt(cpu.id),
        name: cpu.fullName,
        cpuData: cpu,
        pageURL: `/cpu/${cpu.id}`,
        apiURL: `/api/cpu/${cpu.id}`,
      }))}
    />
  );
}

function CustomSearchBox() {
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

  return (
    <form noValidate action="" role="search" onSubmit={handleSubmit}>
      <InputGroup paddingInlineStart={0}>
        <Input
          ref={inputRef}
          variant="outline"
          placeholder="Search"
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
        />
        <InputRightElement>
          {isSearchStalled ? (
            <CircularProgress isIndeterminate size="1em" />
          ) : query === '' ? (
            <MdSearch />
          ) : (
            <MdClose onClick={handleReset} cursor="pointer" />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

function CustomPagination() {
  const { currentRefinement, nbPages, refine } = usePagination();
  const currentPage = currentRefinement + 1;
  return (
    <Center dir="row">
      <Button
        size="sm"
        onClick={() => refine(currentRefinement - 1)}
        disabled={currentPage === 1}
      >
        {'<--'}
      </Button>
      <Text>
        {currentPage} / {nbPages}
      </Text>
      <Button
        size="sm"
        onClick={() => refine(currentRefinement + 1)}
        disabled={currentPage === nbPages}
      >
        {'-->'}
      </Button>
    </Center>
  );
}

type CpuSearchProps = {
  searchState?: InstantSearchServerState;
  url?: string;
};

function CpuSearch({ searchState, url }: CpuSearchProps) {
  return (
    <InstantSearchSSRProvider {...(searchState ?? {})}>
      <InstantSearch
        indexName="cpu"
        searchClient={searchClient}
        routing={{
          router: history({
            getLocation() {
              if (typeof window === 'undefined') {
                return new URL(url!) as unknown as Location;
              }

              return window.location;
            },
          }),
        }}
      >
        <CustomSearchBox />
        <br />
        <CustomPagination />
        <br />
        <CustomHits />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

function SearchPage({ searchState, url }: CpuSearchProps) {
  return (
    <Layout title="Search CPUs">
      <Stack spacing={{ base: 6, md: 10 }} direction="column">
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={500}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            CPU Search
          </Heading>
        </Box>
        <Center></Center>
        <Box width={[300, 500, 700]}>
          <CpuSearch searchState={searchState} url={url} />
        </Box>
      </Stack>
      <br />
    </Layout>
  );
}

// GetServerSideProps to get the list of components before building the page
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = new URL(
    req.headers.referer || `https://${req.headers.host}${req.url}`
  ).toString();

  const searchState = await getServerState(<CpuSearch url={url} />);

  return {
    props: {
      searchState,
      url,
    },
  };
};

// Exports the page function
export default SearchPage;
