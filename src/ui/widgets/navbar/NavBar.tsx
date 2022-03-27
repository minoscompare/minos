import { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useBoolean,
} from '@chakra-ui/react';
import { MdClose, MdMenu, MdSearch } from 'react-icons/md';
import NavBarSearchBar from './NavBarSearchBar';
import NavBarLinks from './NavBarLinks';
import NavBarAppIcon from './NavBarAppIcon';

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
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container maxW="6xl">
        <Flex h={16} justifyContent="space-between" as="nav">
          <HStack gap={2}>
            <IconButton
              size="md"
              icon={drawer.isOpen ? <MdClose /> : <MdMenu />}
              aria-label="Open Menu"
              display={{ md: 'none', base: 'inline-flex' }}
              onClick={drawer.isOpen ? drawer.onClose : drawer.onOpen}
            />
            <NavBarAppIcon />
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavBarLinks />
            </HStack>
          </HStack>
          <HStack>
            <IconButton
              icon={<MdSearch />}
              aria-label="Show search bar"
              onClick={setSearchShown.on}
              display={{
                base: isSearchShown ? 'none' : 'inline-flex',
                md: 'none',
              }}
            />
            <Box
              display={{ base: isSearchShown ? 'block' : 'none', md: 'block' }}
            >
              <NavBarSearchBar
                searchRef={searchRef}
                onOutsideClick={setSearchShown.off}
              />
            </Box>
          </HStack>
        </Flex>

        {drawer.isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              <NavBarLinks />
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
