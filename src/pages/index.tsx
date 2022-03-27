import type { NextPage } from 'next';
import NextLink from 'next/link';
import {
  Box,
  Text,
  Grid,
  Button,
  Stack,
  Heading,
  Link,
  VStack,
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { MdLink } from 'react-icons/md';
import { NextSeo } from 'next-seo';

const Home: NextPage = () => {
  return (
    <Layout>
      <NextSeo title="Home" />
      <Stack spacing={{ base: 6, md: 10 }} padding="4">
        <Heading
          lineHeight={1.1}
          fontWeight={500}
          fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          justifySelf="center"
        >
          Welcome to MinosCompare!{' '}
        </Heading>

        <Grid templateColumns="repeat(2,5fr)" gap={5}>
          <NextLink href="/cpu/search" passHref>
            <Button h="20" variant="solid" size="sm">
              <VStack>
                <Text>Search CPUs&rarr;</Text>
                <Text>View details or compare.</Text>
              </VStack>
            </Button>
          </NextLink>
          <NextLink href="/cpu/compare" passHref>
            <Button h="20" variant="solid" size="sm">
              <VStack>
                <Text>Compare Page&rarr;</Text>
                <Text>View current comparisons.</Text>
              </VStack>
            </Button>
          </NextLink>
          <Link href="https://github.com/minoscompare" w="100%">
            <Button
              h="20"
              w="100%"
              variant="solid"
              rightIcon={<MdLink />}
              size="sm"
            >
              Github
            </Button>
          </Link>
        </Grid>
      </Stack>
    </Layout>
  );
};

export default Home;
