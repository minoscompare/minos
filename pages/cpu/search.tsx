import type { NextPage } from 'next';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { SearchListItem } from '@minos/ui/widgets/ItemLinkList';
import prisma from '@minos/lib/prisma';
import { Box, Link, Stack, Text, Heading } from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';

// Props interface
interface PageProps {
  componentLinks: SearchListItem[];
}

// Main page function
const CpuSearch: NextPage<PageProps> = (props: PageProps) => {
  //TODO: For testing, add an auto-generated list of all the components that link to their respective components pages.

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
          <ItemLinkList listItems={props.componentLinks} />
        </Box>
      </Stack>
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
    },
  };
};

// Exports the page function
export default CpuSearch;
