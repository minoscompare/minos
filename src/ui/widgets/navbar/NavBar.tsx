import { useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  useBoolean,
} from '@chakra-ui/react';
import { MdClose, MdMenu, MdSearch } from 'react-icons/md';
import NavBarSearchBar from './NavBarSearchBar';
import NavBarLinks from './NavBarLinks';
import NavBarAppIcon from './NavBarAppIcon';
import ThemeToggle from '@minos/ui/components/ThemeToggle';

export default function NavBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const drawer = useDisclosure();

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
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavBarAppIcon />
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
          <ThemeToggle />
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
