import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { SearchListItem } from '@minos/ui/widgets/ItemLinkList';
import prisma from '@minos/lib/api/utils/prisma';
import { Box, Center, Stack, Text, Heading, Button } from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { useState } from 'react';
import { clamp } from 'lodash';

// Props interface
interface PageProps {
  componentLinks: SearchListItem[];
  pageSize: number;
}

// Utility Functions
function getArrayPage(
  array: SearchListItem[],
  pageIndex: number,
  perPage: number
) {
  let newArray = [];

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
  maxPageIndex: number
) {
  // Updates the current page to current+change, clamped between 0 and max.
  let newPage = currentPageIndex + changeAmount;
  newPage = clamp(newPage, 0, maxPageIndex);

  return newPage;
}

// Main page function
const CpuSearch: NextPage<PageProps> = (props: PageProps) => {
  // Sets constants and state management
  const maxPageIndex = getMaxPageIndex(
    props.componentLinks.length,
    props.pageSize
  );
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
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
            CPU List
          </Heading>
        </Box>

        <Stack direction="row" w={[300, 400, 500]}>
          <Center>
            <Button
              size="sm"
              onClick={() =>
                setCurrentPageIndex(
                  updatePage(currentPageIndex, -1, maxPageIndex)
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
                  updatePage(currentPageIndex, 1, maxPageIndex)
                )
              }
            >
              {'-->'}
            </Button>
          </Center>
        </Stack>
        <Box width="2xl">
          Select a CPU:
          <ItemLinkList listItems={pageLinks} />
        </Box>
      </Stack>
      <br />
    </Layout>
  );
};

// GetServerSideProps to get the list of components before building the page
export const getServerSideProps: GetServerSideProps = async (context) => {
  // This gets data for ALL CPUs in the database, not particularly performant.
  const cpus = await prisma.cpu.findMany({
    select: { id: true, name: true, brand: true },
  });

  return {
    props: {
      componentLinks: cpus.map((cpu) => ({
        id: cpu.id,
        name: `${cpu.brand} ${cpu.name}`,
        pageURL: `/cpu/${cpu.id}`,
        apiURL: `/api/cpu/${cpu.id}`,
      })),
      pageSize: 10,
    },
  };
};

// Exports the page function
export default CpuSearch;
