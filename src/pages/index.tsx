import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import RouteButton from '@minos/ui/components/RouteButton';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

function Home() {
  return (
    <Layout>
      <NextSeo title="Home" />
      <Stack minH="100%" direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align="center" justify="center">
          <Stack spacing={6} w="full" maxW="lg">
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as="span">Find and compare</Text>
              <br />{' '}
              <Text as="span" color="brand.500">
                CPUs
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.500">
              View and compare cpu specifications
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <RouteButton
                href="/cpu/search"
                colorScheme="brand"
                rounded="full"
              >
                Search for a CPU
              </RouteButton>
              {/* <Button rounded="full">How It Works</Button> */}
            </Stack>
          </Stack>
        </Flex>
        <Center flex={1}>
          <Box w={{ base: 400, md: '100%' }}>
            <Image
              alt="Login Image"
              width="100%"
              height="100%"
              layout="responsive"
              src={require('@minos/const/images/undraw_performance_overview.svg')}
            />
          </Box>
        </Center>
      </Stack>
    </Layout>
  );
}

export default Home;
