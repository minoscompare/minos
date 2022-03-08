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
  Center,
} from '@chakra-ui/react';
import { MdBrightness4, MdBrightness7, MdClose, MdMenu } from 'react-icons/md';
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
  const [comparedCpuIds] = useCompareCpus();
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/cpu/search">Search CPUs</NavLink>
      <NavLink href={`/cpu/compare/${comparedCpuIds.join('/')}`}>
        View Comparison
      </NavLink>
    </>
  );
}

export default function NavBar() {
  const drawer = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={
              drawer.isOpen ? (
                <Center>
                  <MdClose />
                </Center>
              ) : (
                <Center>
                  <MdMenu />
                </Center>
              )
            }
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={drawer.isOpen ? drawer.onClose : drawer.onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>Minos</Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavBarLinks />
            </HStack>
          </HStack>
          <HStack>
            <NavBarSearchBar />

            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MdBrightness4 /> : <MdBrightness7 />}
            </Button>
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
    </>
  );
}
