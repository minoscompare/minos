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

const Home: NextPage = () => {
  return (
    <Layout title="Minoscompare Home">
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={500}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            justifySelf="center"
          >
            Welcome to MinosCompare!{' '}
          </Heading>
        </Box>

        <Grid templateColumns="repeat(2,5fr)" gap={5}>
          <NextLink href="/cpu/search">
            <Button h="20" variant="solid">
              <VStack>
                <Text>Search CPUs&rarr;</Text>
                <Text>View details or compare.</Text>
              </VStack>
            </Button>
          </NextLink>
          <NextLink href="/">
            <Button h="20" isDisabled={true} variant="solid">
              <VStack>
                <Text>Search GPUs&rarr;</Text>
                <Text>View details or compare.</Text>
              </VStack>
            </Button>
          </NextLink>
          <NextLink href="/cpu/compare">
            <Button h="20" variant="solid">
              <VStack>
                <Text>Compare Page&rarr;</Text>
                <Text>View current comparisons.</Text>
              </VStack>
            </Button>
          </NextLink>
          <Link href="https://github.com/minoscompare" w="100%">
            <Button h="20" w="100%" variant="solid" rightIcon={<MdLink />}>
              Github
            </Button>
          </Link>
        </Grid>
      </Stack>
    </Layout>
  );
};

export default Home;
