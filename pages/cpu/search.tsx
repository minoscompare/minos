import type { NextPage } from 'next';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { SearchListItem } from '@minos/ui/widgets/ItemLinkList';
import prisma from '@minos/lib/prisma';
import { Box, Link, Stack, Text, Heading, Spacer } from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';

// Props interface
interface PageProps {
  componentLinks: SearchListItem[];
  currentPageIndex: number;
}

// Helper Function
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

// Main page function
const CpuSearch: NextPage<PageProps> = (props: PageProps) => {
  let pageLinks = getArrayPage(
    props.componentLinks,
    props.currentPageIndex,
    10
  );

  return (
    <Layout title="Search CPUs">
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={500}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            Component List{' '}
            <Text fontSize="2lg">
              <NextLink href="/">
                <Link> Return to Home </Link>
              </NextLink>
            </Text>
          </Heading>
        </Box>
        <Box>
          Select from following list:
          <ItemLinkList listItems={pageLinks} />
        </Box>
      </Stack>
      <br />
    </Layout>
  );
};

// GetStaticProps to get the list of components before building the page
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cpus = await prisma.cpu.findMany({
    take: 100,
    select: { id: true, name: true, brand: true },
  });

  return {
    props: {
      componentLinks: cpus.map((cpu) => ({
        key: cpu.id.toString(),
        name: `${cpu.brand} ${cpu.name}`,
        url: `/cpu/${cpu.id}`,
      })),
      currentPageIndex: 1,
    },
  };
};

// Exports the page function
export default CpuSearch;
