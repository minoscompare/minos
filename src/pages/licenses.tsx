import {
  Heading,
  HStack,
  Text,
  VStack,
  Link,
  Button,
  Box,
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import RouteButton from '@minos/ui/components/RouteButton';
import { NextSeo } from 'next-seo';

interface LicenseListItemProps {
  title: string;
  author: string;
  license: string;
  authorUrl: string;
  licenseUrl: string;
}

function LicenseListItem({
  title,
  author,
  license,
  authorUrl,
  licenseUrl,
}: LicenseListItemProps) {
  return (
    <Box>
      <Text as="p" fontSize="lg" fontWeight={600}>
        {title}
      </Text>
      <Text as="p" fontSize="sm" color="gray.500">
        ©{' '}
        <Link href={authorUrl} isExternal>
          {author}
        </Link>{' '}
        -{' '}
        <Link href={licenseUrl} isExternal>
          {license}
        </Link>
      </Text>
    </Box>
  );
}

function Licenses() {
  return (
    <Layout variant="small">
      <NextSeo title="Licenses" />
      <VStack spacing={3} alignItems="flex-start">
        <Heading as="h2">Licenses</Heading>
        <LicenseListItem
          title="Source Code"
          author="Minos Compare"
          license="MIT License"
          authorUrl="https://github.com/minoscompare/minos"
          licenseUrl="https://github.com/minoscompare/minos/blob/main/LICENSE.md"
        />
        <LicenseListItem
          title="Illustrations"
          author="Katerina Limpitsouni"
          license="unDraw License"
          authorUrl="https://undraw.co/"
          licenseUrl="https://undraw.co/license"
        />
      </VStack>
    </Layout>
  );
}

export default Licenses;
