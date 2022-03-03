import React from 'react';
import NextLink from 'next/link';
import {
  Button,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  List,
  Box,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';
import { Cpu } from '@prisma/client';
import { CpuSpec } from '@minos/pages/cpu/[id]';
import { MinosCpu } from '@minos/lib/types';
import {
  ExternalLinkIcon,
  InfoOutlineIcon,
  PlusSquareIcon,
} from '@chakra-ui/icons';

export interface SearchListItem {
  id: number;
  name: string;
  apiURL: string;
  pageURL: string;
  cpuData: MinosCpu;
}

interface ComponentProps {
  listItems: SearchListItem[];
}

function ItemLinkList(props: ComponentProps) {
  // Sets color scheme data
  const detailsColor = useColorModeValue('blue', 'gray');
  const compareColor = useColorModeValue('purple', 'gray');

  // Gets atoms and their functions
  const [comparedIDs, setComparedIDs] = useCompareCpus();

  // Creates function to add a new ID to comparison
  function addComparedID(addedID: number) {
    if (!comparedIDs.includes(addedID)) {
      setComparedIDs([...comparedIDs, addedID]);
      console.log('Added ID: ' + addedID);
    }
  }

  // Returns JSX
  return (
    <Stack spacing={1}>
      <Divider />
      {props.listItems.map((item) => {
        return (
          <>
            <Stack key={item.id} spacing={5} direction="row" align="center">
              <Text isTruncated flex={1}>
                {item.name}
              </Text>
              <Flex display={{ base: 'none', md: 'flex' }}>
                <Popover placement="right-end">
                  <PopoverTrigger>
                    <IconButton
                      aria-label="Preview Data"
                      colorScheme={detailsColor}
                      icon={<InfoOutlineIcon />}
                    ></IconButton>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        fontWeight="500"
                        textTransform="uppercase"
                        mb="4"
                      >
                        Specifications
                      </Text>
                      <List spacing={2}>
                        <CpuSpec
                          name="# of Cores"
                          value={item.cpuData.specs.cores}
                        />
                        <CpuSpec
                          name="# of Threads"
                          value={item.cpuData.specs.threads}
                        />
                        <CpuSpec
                          name="Base Frequency"
                          value={item.cpuData.specs.frequency}
                        />
                        <CpuSpec
                          name="L1 Cache"
                          value={item.cpuData.specs.cacheL1}
                        />
                        <CpuSpec
                          name="L2 Cache"
                          value={item.cpuData.specs.cacheL2}
                        />
                        <CpuSpec
                          name="L3 Cache"
                          value={item.cpuData.specs.cacheL3}
                        />
                        <CpuSpec name="TDP" value={item.cpuData.specs.tdp} />
                        <CpuSpec
                          name="Launch Date"
                          value={item.cpuData.specs.launchDate}
                        />
                        <CpuSpec
                          name="Lithography"
                          value={item.cpuData.specs.lithography}
                        />
                      </List>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              <NextLink href={item.pageURL}>
                <a target="_blank">
                  <Button
                    colorScheme={detailsColor}
                    variant="solid"
                    aria-label="Open in new page"
                    rightIcon={<ExternalLinkIcon />}
                    display={{ base: 'none', md: 'flex' }}
                  >
                    View
                  </Button>
                  <IconButton
                    colorScheme={detailsColor}
                    variant="solid"
                    aria-label="Open in new page"
                    icon={<ExternalLinkIcon />}
                    display={{ base: 'flex', md: 'none' }}
                  ></IconButton>
                </a>
              </NextLink>
              <Button
                colorScheme={compareColor}
                variant="solid"
                isDisabled={comparedIDs.includes(item.id)}
                aria-label="Add to comparison"
                onClick={() => {
                  addComparedID(item.id);
                }}
                display={{ base: 'none', sm: 'flex' }}
              >
                Compare
              </Button>
              <IconButton
                colorScheme={compareColor}
                variant="solid"
                isDisabled={comparedIDs.includes(item.id)}
                aria-label="Add to comparison"
                onClick={() => {
                  addComparedID(item.id);
                }}
                display={{ base: 'flex', sm: 'none' }}
                icon={<PlusSquareIcon />}
              ></IconButton>{' '}
            </Stack>
            <Divider />
          </>
        );
      })}
    </Stack>
  );
}

export default ItemLinkList;
