import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import ItemLinkList from '@minos/ui/widgets/ItemLinkList';
import { SearchListItem } from '@minos/ui/widgets/ItemLinkList';
import prisma from '@minos/lib/prisma';
import { Box, Link, Container, Stack, Text, Heading } from '@chakra-ui/react';
import Navbar from '@minos/ui/widgets/Navbar';

// Props interface
interface PageProps {
  componentLinks: SearchListItem[];
}

// Main page function
const ComponentSearch: NextPage<PageProps> = (props: PageProps) => {
  //TODO: For testing, add an auto-generated list of all the components that link to their respective components pages.

  return (
    <Container maxW="container.xl">
      <Head>
        <title>Search CPUs</title>
        <meta name="description" content="From minoscompare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
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
    </Container>
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
export default ComponentSearch;
