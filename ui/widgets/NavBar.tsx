import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Input,
  VStack,
  Portal,
  Text,
} from '@chakra-ui/react';
import { MdBrightness4, MdBrightness7, MdClose, MdMenu } from 'react-icons/md';
import NextLink from 'next/link';
import { SearchBox, InstantSearch, Hits } from 'react-instantsearch-dom';
import { searchClient } from '@minos/lib/client/typesense';

interface NavLinkProps {
  children: ReactNode;
  href: string;
}

function NavLink({ children, href }: NavLinkProps) {
  return (
    <NextLink href={href}>
      <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
      >
        {children}
      </Link>
    </NextLink>
  );
}

const Links = [
  { name: 'Home', href: '/' },
  { name: 'Search CPUs', href: '/cpu/search' },
  { name: 'Search GPUs', href: '/gpu/search' },
];

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <MdClose /> : <MdMenu />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>Minos</Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(({ name, href }) => (
                <NavLink key={name} href={href}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack>
            <InstantSearch indexName="cpu" searchClient={searchClient}>
              <SearchBox />
              <Portal>hi</Portal>
              {/* <Box>
                <Hits
                  hitComponent={({ hit }) => (
                    <Text>
                      {hit.brand} {hit.name}
                    </Text>
                  )}
                />
              </Box> */}
            </InstantSearch>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MdBrightness4 /> : <MdBrightness7 />}
            </Button>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {Links.map(({ name, href }) => (
                <NavLink key={name} href={href}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
