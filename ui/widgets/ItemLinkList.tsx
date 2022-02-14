import React from 'react';
import NextLink from 'next/link';
import {
  Button,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Minos } from '@minos/lib/types';
import { useAtom } from 'jotai';
import { comparedCPUs, comparedCPUIds } from 'pages/_app';

export interface SearchListItem {
  id: string;
  name: string;
  apiURL: string;
  pageURL: string;
}

interface ComponentProps {
  listItems: SearchListItem[];
}

function ItemLinkList(props: ComponentProps) {
  // Sets color scheme data
  const detailsColor = useColorModeValue('blue', 'gray');
  const compareColor = useColorModeValue('purple', 'gray');

  // Gets atoms and set functions
  const [comparedIDs, setComparedIDs] = useAtom(comparedCPUIds);

  function addComparedID(addedID: string) {
    if (!comparedIDs.includes(addedID)) {
      setComparedIDs([...comparedIDs, addedID]);
      console.log('Added ID: ' + addedID);
    }
  }

  return (
    <Stack>
      {props.listItems.map((item) => {
        return (
          <Stack key={item.id} spacing={10} direction="row" align="center">
            <Text fontWeight="bold" fontSize="6x1" isTruncated flex={1}>
              {item.name}
            </Text>
            <NextLink href={item.pageURL}>
              <Button colorScheme={detailsColor} variant="solid">
                View Details
              </Button>
            </NextLink>
            useEffect \{' '}
            <Button
              colorScheme={compareColor}
              variant="solid"
              isDisabled={comparedIDs.includes(item.id)}
              onClick={() => {
                addComparedID(item.id);
              }}
            >
              Add to Comparison
            </Button>{' '}
          </Stack>
        );
      })}
    </Stack>
  );
}

export default ItemLinkList;
