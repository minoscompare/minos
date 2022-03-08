import {
  Box,
  Button,
  HStack,
  Link,
  useColorModeValue,
  useDisclosure,
  usePopper,
} from '@chakra-ui/react';
import { CpuTypesenseDoc } from '@minos/lib/types';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';
import { useCustomHits } from '@minos/lib/utils/search-hooks';
import NextLink from 'next/link';
import { Ref } from 'react';

export function useSearchResultsPopper() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { popperRef, referenceRef } = usePopper({
    placement: 'bottom-start',
    gutter: 0,
  });
  return { isOpen, onOpen, onClose, popperRef, referenceRef };
}

function CustomHits() {
  const { hits } = useCustomHits<CpuTypesenseDoc>();
  // Gets CPU Ids atom and creates a function to modify them
  const [comparedIDs, setComparedIDs] = useCompareCpus();

  function addComparedID(newID: number) {
    if (!comparedIDs.includes(newID)) {
      setComparedIDs([...comparedIDs, newID]);
    }
  }

  // Returns HTML
  return (
    <>
      {hits.map((hit) => (
        <Box key={hit.id} flex={1} mx={3} my={2}>
          <HStack>
            <NextLink href={`/cpu/${hit.id}`} passHref>
              <Link flex={1} isTruncated>
                {hit.fullName}
              </Link>
            </NextLink>
            <NextLink href="/cpu/compare">
              <Button
                size="xs"
                isDisabled={comparedIDs.includes(parseInt(hit.id))}
                onClick={() => addComparedID(parseInt(hit.id))}
              >
                Compare
              </Button>
            </NextLink>
          </HStack>
        </Box>
      ))}
    </>
  );
}

interface NavbarSearchResultsProps {
  popperRef: Ref<HTMLDivElement>;
}

function NavBarSearchResults({ popperRef }: NavbarSearchResultsProps) {
  const popperBg = useColorModeValue('#fff', 'gray.700');
  const popperShadow = useColorModeValue('sm', 'dark-lg');
  return (
    <Box
      ref={popperRef}
      w={{ sm: 260, lg: 360 }}
      bg={popperBg}
      boxShadow={popperShadow}
      color="inherit"
      py={2}
      zIndex={1}
      borderRadius="md"
      borderWidth="1px"
    >
      <CustomHits />
    </Box>
  );
}

export default NavBarSearchResults;
