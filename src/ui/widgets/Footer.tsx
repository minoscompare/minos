import { ReactNode } from 'react';

import {
  Box,
  Button,
  Center,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import RouteLink from '../components/RouteLink';
import MinosIconText from './MinosIconText';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW="container.lg" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <MinosIconText height={50} width={234} />
            </Box>
            <Text fontSize="sm">© 2022 Minos Compare. All rights reserved</Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Resources</ListHeader>
            <RouteLink href="https://github.com/minoscompare/minos/blob/main/LICENSE.md">
              License
            </RouteLink>
            <RouteLink href="https://analytics.minoscompare.com/minoscompare.com">
              Analytics
            </RouteLink>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Open-Source</ListHeader>
            <RouteLink href="https://github.com/minoscompare/minos">
              GitHub
            </RouteLink>
            <RouteLink href="https://github.com/minoscompare/component-data">
              Component Data
            </RouteLink>
          </Stack>
          <Stack align="flex-start">
            <Button
              colorScheme="gray"
              leftIcon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
              onClick={toggleColorMode}
            >
              Change theme
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
