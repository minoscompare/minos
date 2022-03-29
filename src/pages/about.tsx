import { Heading, Text, VStack } from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import RouteLink from '@minos/ui/components/RouteLink';
import { NextSeo } from 'next-seo';

function About() {
  return (
    <Layout variant="small">
      <NextSeo title="About" />
      <VStack spacing={3} alignItems="flex-start">
        <Heading as="h2">About Us</Heading>
        <Text as="p" fontSize="lg">
          Minos Compare is an open-source student project with the goal of
          making computer component comparisons easy for all to understand.{' '}
          <br />
          You can find us on{' '}
          <RouteLink
            href="https://github.com/minoscompare/minos"
            color="brand.500"
            isExternal
          >
            Github
          </RouteLink>
          .
        </Text>
      </VStack>
    </Layout>
  );
}

export default About;
