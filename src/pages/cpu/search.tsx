import { InferGetServerSidePropsType } from 'next';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { SearchListItem } from '@minos/ui/widgets/ItemLinkList';
import prisma from '@minos/server/prisma';
import { Box, Center, Stack, Text, Heading, Button } from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { clamp } from 'lodash';
import { useState } from 'react';

// Utility Functions
function getArrayPage<T>(
  array: SearchListItem<T>[],
  pageIndex: number,
  perPage: number,
) {
  const newArray = [];

  for (let i = 0; i < perPage; i++) {
    newArray.push(array[pageIndex * perPage + i]);
  }

  return newArray;
}

function getMaxPageIndex(arrayLen: number, pageSize: number) {
  return Math.floor(arrayLen / pageSize) - 1;
}

function updatePage(
  currentPageIndex: number,
  changeAmount: number,
  maxPageIndex: number,
) {
  // Updates the current page to current+change, clamped between 0 and max.
  let newPage = currentPageIndex + changeAmount;
  newPage = clamp(newPage, 0, maxPageIndex);

  return newPage;
}

// Main page function
function CpuSearch(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Sets constants
  const maxPageIndex = getMaxPageIndex(
    props.componentLinks.length,
    props.pageSize,
  );
  const pageLinks = getArrayPage(props.componentLinks, currentPageIndex, 10);
  if (currentPageIndex == undefined) setCurrentPageIndex(0);

  // Returns HTML
  return (
    <Layout title="Search CPUs">
      <Stack spacing={{ base: 6, md: 10 }} direction="column">
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={500}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            Component List
          </Heading>
        </Box>
        <Center>
          <Stack direction="row">
            <Button
              size="sm"
              onClick={() =>
                setCurrentPageIndex(
                  updatePage(currentPageIndex, -1, maxPageIndex),
                )
              }
            >
              {'<--'}
            </Button>
            <Text>
              {currentPageIndex + 1} / {maxPageIndex + 1}
            </Text>
            <Button
              size="sm"
              onClick={() =>
                setCurrentPageIndex(
                  updatePage(currentPageIndex, 1, maxPageIndex),
                )
              }
            >
              {'-->'}
            </Button>
          </Stack>
        </Center>
        <Box width="2xl">
          Select a component
          <ItemLinkList listItems={pageLinks} />
        </Box>
      </Stack>
      <br />
    </Layout>
  );
}

// GetStaticProps to get the list of components before building the page
export const getServerSideProps = async () => {
  // This gets ALL THE CPUS in the database, not very performant.
  const cpus = await prisma.cpu.findMany({
    select: { id: true, name: true, brand: true },
  });

  return {
    props: {
      componentLinks: cpus.map((cpu) => ({
        key: cpu.id.toString(),
        id: cpu.id,
        name: `${cpu.brand} ${cpu.name}`,
        url: `/cpu/${cpu.id}`,
      })),
      pageSize: 10,
    },
  };
};

// Exports the page function
export default CpuSearch;
