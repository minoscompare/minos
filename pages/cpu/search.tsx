import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import ItemLinkList from '@minos/lib/pagecomponents/itemlinklist';
import { SearchListItem } from '@minos/lib/pagecomponents/itemlinklist';
import prisma from '@minos/lib/prisma';
import {
  Box,
  chakra,
  Link,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  useColorMode,
  Center
} from '@chakra-ui/react';
import NavBar from '@minos/lib/pagecomponents/navbar';

// Props interface
interface PageProps {
  componentLinks: SearchListItem[];
}

// Main page function
const ComponentSearch: NextPage<PageProps> = (props: PageProps) => {
  //TODO: For testing, add an auto-generated list of all the components that link to their respective components pages.

  return (
    <Container maxW='container.xl'>
      <Head>
        <title>Search CPUs</title>
        <meta name="description" content="From minoscompare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <NavBar/>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as="header">
            <Heading  
              lineHeight={1.1}
              fontWeight={500}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              Component List
              {' '}
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
  let components: SearchListItem[] = [];

  for (let i = 0; i < cpus.length; i++) {
    components.push({
      name: cpus[i].brand + ' ' + cpus[i].name,
      url: '/cpu/with-chakra/' + cpus[i].id,
    });
  }

  return { props: { componentLinks: components } };
};

// Exports the page function
export default ComponentSearch;
