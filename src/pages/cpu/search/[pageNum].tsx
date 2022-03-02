import type { NextPage } from 'next';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { SearchListItem } from '@minos/ui/widgets/ItemLinkList';
import prisma from '@minos/lib/api/utils/prisma';
import { Box, Center, Stack, Text, Heading, Button } from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { useRouter } from 'next/router';

// Props interface
interface PageProps {
  componentLinks: SearchListItem[];
  maxPage: number;
  currentPage: number;
}

// Constants
const pageSize = 10;

// Main page function
const CpuSearchPage: NextPage<PageProps> = (props: PageProps) => {
  // Sets router
  const router = useRouter();

  // Utility functions
  function updatePage(changeNum: number) {
    const currentPage = Math.max(
      Math.min(props.currentPage + changeNum, props.maxPage),
      0
    );
    router.push(`${currentPage}`);
  }

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
        <Center>
          <Stack direction="row" w={[300, 400, 500]}>
            <Button size="sm" onClick={() => updatePage(-1)}>
              {'<--'}
            </Button>
            <Text>
              {props.currentPage + 1} / {props.maxPage + 1}
            </Text>
            <Button size="sm" onClick={() => updatePage(1)}>
              {'-->'}
            </Button>
          </Stack>
        </Center>
        <Box width="2xl">
          Select a CPU:
          <ItemLinkList listItems={props.componentLinks} />
        </Box>
      </Stack>
      <br />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const pageIndex = context.params?.pageNum as number | undefined;
  const maxPageIndex = (await prisma.cpu.count()) / pageSize;

  if (!pageIndex || pageIndex > maxPageIndex) {
    return { notFound: true };
  }

  // This gets data for all cpus on the current page
  const cpus = await prisma.cpu.findMany({
    skip: pageSize * pageIndex,
    take: pageSize,
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
      maxPage: maxPageIndex,
      currentPage: pageIndex,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Divides total cpu count by page size, sets paths to each possible value in that range
  const totalPageCount = (await prisma.cpu.count()) / pageSize + 1;

  let paths = [];
  for (let i = 0; i < totalPageCount; i++) {
    paths.push({ params: { pageNum: i.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

// Exports the page function
export default CpuSearchPage;
