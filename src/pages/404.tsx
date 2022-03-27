import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import NextLink from 'next/link';

export default function NotFound() {
  return (
    <Layout>
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" as="h2" size="2xl">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color="gray.500" mb={6}>
          The page you&apos;re looking for does not seem to exist
        </Text>

        <NextLink href="/" passHref>
          <Button as="a" variant="solid">
            Go to Home
          </Button>
        </NextLink>
      </Box>
    </Layout>
  );
}
