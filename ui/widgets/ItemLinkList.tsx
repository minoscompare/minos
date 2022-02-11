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
import { comparedCPUPaths } from 'pages/_app';

export interface SearchListItem {
  key: string;
  name: string;
  apiURL: string;
  pageURL: string;
}

interface ComponentProps {
  listItems: SearchListItem[];
}

function ItemLinkList(props: ComponentProps) {
  const detailsColor = useColorModeValue('blue', 'gray');
  const compareColor = useColorModeValue('purple', 'gray');
  const [comparedPaths, setComparedPaths] = useAtom(comparedCPUPaths);

  function addComparedPath(path: string) {
    if (comparedPaths.length > 1) {
      console.log(
        'WARNING: DO NOT ADD MORE THAN 2 ITEMS TO THE COMPARISON, IT CAN CRASH YOUR BROWSER.'
      );
      return;
    }
    if (!comparedPaths.includes(path)) {
      setComparedPaths([...comparedPaths, path]);
    }
  }

  return (
    <Stack>
      {props.listItems.map((item) => {
        return (
          <Stack key={item.key} spacing={10} direction="row" align="center">
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
              onClick={() => addComparedPath(item.apiURL)}
            >
              Add to Comparison
            </Button>
            \{' '}
          </Stack>
        );
      })}
    </Stack>
  );
}

export default ItemLinkList;
