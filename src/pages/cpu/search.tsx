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
  usePagination,
} from 'react-instantsearch-hooks';
import { searchClient } from '@minos/lib/utils/typesense';
import { MdClose, MdSearch } from 'react-icons/md';
import { CpuTypesenseDoc } from '@minos/lib/types';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { GetServerSideProps } from 'next';
import { Layout } from '@minos/ui/components/Layout';
import { getServerState } from 'react-instantsearch-hooks-server';
import {
  useCustomSearchBox,
  useCustomHits,
} from '@minos/lib/utils/search-hooks';
import { NextSeo } from 'next-seo';
import { history } from 'instantsearch.js/es/lib/routers';
import { singleIndex } from 'instantsearch.js/es/lib/stateMappings';
import { StateMapping, UiState } from 'instantsearch.js/es/types';

function CustomHits() {
  const { hits } = useCustomHits<CpuTypesenseDoc>();
  return (
    <ItemLinkList
      listItems={hits.map((cpu) => ({
        id: parseInt(cpu.id, 10),
        name: cpu.fullName,
        cpuData: cpu,
        pageURL: `/cpu/${cpu.id}`,
        apiURL: `/api/cpu/${cpu.id}`,
      }))}
    />
  );
}

function CustomSearchBox() {
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
          onChange={(event) => setInputValue(event.currentTarget.value)}
        />
        <InputRightElement>
          {isSearchStalled ? (
            <CircularProgress isIndeterminate size="1em" />
          ) : inputValue === '' ? (
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
          stateMapping: singleIndex('cpu') as StateMapping<UiState, UiState>,
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
    <Layout>
      <NextSeo title="Search" />
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
