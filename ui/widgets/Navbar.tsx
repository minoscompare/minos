import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Stack, Box, useColorMode, Center } from '@chakra-ui/react';

function Navbar() {
  // Gets router for page routing
  const router = useRouter();

  // Gets colour mode
  const { colorMode, toggleColorMode } = useColorMode();

  // Returns page HTML (Navigation bar at top of page)
  return (
    <Center>
      <Box>
        <Stack direction="row" wrap="wrap" spacing="15px">
          <NextLink href="/">
            <Button>Main Menu</Button>
          </NextLink>
          <NextLink href="/cpu/search">
            <Button>Search CPUs</Button>
          </NextLink>
          <Button isDisabled={true}>Search GPUs</Button>
          <Button isDisabled={true}>Open Comparison Page</Button>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default Navbar;
