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
import { comparedCPUs } from 'pages/_app';

export interface SearchListItem {
  key: string;
  name: string;
  apiURL: string;
  pageURL: string;
  cpuData: Minos.Cpu;
}

interface ComponentProps {
  listItems: SearchListItem[];
}

function ItemLinkList(props: ComponentProps) {
  // Sets color scheme data
  const detailsColor = useColorModeValue('blue', 'gray');
  const compareColor = useColorModeValue('purple', 'gray');

  // Gets atoms and set functions
  const [comparedData, setComparedData] = useAtom(comparedCPUs);

  function addComparedData(addedCPU: Minos.Cpu) {
    if (!comparedData.map((cpu) => cpu.id).includes(addedCPU.id)) {
      setComparedData([...comparedData, addedCPU]);
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
              isDisabled={comparedData
                .map((cpu) => cpu.id)
                .includes(item.cpuData.id)}
              onClick={() => {
                addComparedData(item.cpuData);
              }}
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
