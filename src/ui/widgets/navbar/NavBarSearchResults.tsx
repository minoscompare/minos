import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  usePopper,
} from '@chakra-ui/react';
import { CpuTypesenseDoc } from '@minos/lib/types';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';
import { useCustomHits } from '@minos/lib/utils/search-hooks';
import NextLink from 'next/link';
import { Ref } from 'react';
import { MdAdd, MdCompareArrows } from 'react-icons/md';

export function useSearchResultsPopper() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { popperRef, referenceRef } = usePopper({
    placement: 'bottom-start',
    gutter: 0,
    matchWidth: true,
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
            <Tooltip label="Add to comparison" aria-label="Comparison tooltip">
              <IconButton
                size="xs"
                isDisabled={comparedIDs.includes(parseInt(hit.id))}
                onClick={() => addComparedID(parseInt(hit.id))}
                icon={<MdAdd />}
                aria-label="Compare"
              />
            </Tooltip>
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
      bg={popperBg}
      boxShadow={popperShadow}
      color="inherit"
      zIndex={1}
      borderBottomRadius="md"
      borderWidth="1px"
    >
      <CustomHits />
    </Box>
  );
}

export default NavBarSearchResults;
