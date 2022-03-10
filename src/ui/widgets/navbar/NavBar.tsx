import { ReactNode, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  useBoolean,
  Text,
} from '@chakra-ui/react';
import {
  MdBrightness4,
  MdBrightness7,
  MdClose,
  MdMenu,
  MdSearch,
} from 'react-icons/md';
import NextLink from 'next/link';
import NavBarSearchBar from './NavBarSearchBar';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';

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

function NavBarLinks() {
  const { ids: cpuIds } = useCompareCpus();
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/cpu/search">Search CPUs</NavLink>
      <NavLink href={`/cpu/compare/${cpuIds.join('/')}`}>
        View Comparison
      </NavLink>
    </>
  );
}

export default function NavBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const drawer = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [isSearchShown, setSearchShown] = useBoolean(false);

  useEffect(() => {
    if (isSearchShown) {
      searchRef.current?.focus();
    }
  }, [isSearchShown]);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={<Center>{drawer.isOpen ? <MdClose /> : <MdMenu />}</Center>}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={drawer.isOpen ? drawer.onClose : drawer.onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Text>Minos</Text>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavBarLinks />
          </HStack>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Center>
                <MdSearch />
              </Center>
            }
            aria-label="Show search bar"
            onClick={setSearchShown.on}
            display={{ base: isSearchShown ? 'none' : 'block', md: 'none' }}
          />
          <Box
            display={{ base: isSearchShown ? 'block' : 'none', md: 'block' }}
          >
            <NavBarSearchBar
              searchRef={searchRef}
              onOutsideClick={setSearchShown.off}
            />
          </Box>
          <IconButton
            icon={
              <Center>
                {colorMode === 'light' ? <MdBrightness4 /> : <MdBrightness7 />}
              </Center>
            }
            aria-label="Toggle Dark Mode"
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>

      {drawer.isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavBarLinks />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
