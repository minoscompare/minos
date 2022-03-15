import React, { Fragment } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Text,
  Stack,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  List,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';
import { CpuSpec } from '@minos/pages/cpu/[id]';
import { CpuTypesenseDoc } from '@minos/lib/types';
import {
  ExternalLinkIcon,
  InfoOutlineIcon,
  PlusSquareIcon,
} from '@chakra-ui/icons';
import { typesenseCpuToMinosCpu } from '@minos/lib/utils/cpu';

export interface SearchListItem {
  id: number;
  name: string;
  apiURL: string;
  pageURL: string;
  cpuData: CpuTypesenseDoc;
}

interface Props {
  listItems: SearchListItem[];
}

function ItemLinkList({ listItems }: Props) {
  const detailsColor = useColorModeValue('blue', 'gray');
  const compareColor = useColorModeValue('purple', 'gray');

  const comparedCpus = useCompareCpus();

  return (
    <Stack spacing={1}>
      <Divider />
      {listItems.map((item) => {
        const cpu = typesenseCpuToMinosCpu(item.cpuData);
        return (
          <Fragment key={item.id}>
            <Stack spacing={5} direction="row" align="center">
              <Text isTruncated flex={1}>
                {cpu.fullName}
              </Text>
              <Flex display={{ base: 'none', md: 'flex' }}>
                <Popover placement="right-end">
                  <PopoverTrigger>
                    <IconButton
                      aria-label="Preview Data"
                      colorScheme={detailsColor}
                      icon={<InfoOutlineIcon />}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text
                        fontSize={{ base: '14px', lg: '16px' }}
                        fontWeight="500"
                        mb="4"
                      >
                        {cpu.model}
                      </Text>
                      <Text
                        fontSize={{ base: '14px', lg: '16px' }}
                        fontWeight="500"
                        textTransform="uppercase"
                        mb="4"
                      >
                        Specifications
                      </Text>
                      <List spacing={2}>
                        <CpuSpec name="# of Cores" value={cpu.specs.cores} />
                        <CpuSpec
                          name="# of Threads"
                          value={cpu.specs.threads}
                        />
                        <CpuSpec
                          name="Base Frequency"
                          value={cpu.specs.frequency}
                        />
                        <CpuSpec name="L1 Cache" value={cpu.specs.cacheL1} />
                        <CpuSpec name="L2 Cache" value={cpu.specs.cacheL2} />
                        <CpuSpec name="L3 Cache" value={cpu.specs.cacheL3} />
                        <CpuSpec name="TDP" value={cpu.specs.tdp} />
                        <CpuSpec
                          name="Launch Date"
                          value={cpu.specs.launchDate}
                        />
                        <CpuSpec
                          name="Lithography"
                          value={cpu.specs.lithography}
                        />
                      </List>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              <NextLink href={item.pageURL} passHref>
                <a>
                  <Button
                    colorScheme={detailsColor}
                    variant="solid"
                    aria-label="Open in new page"
                    display={{ base: 'none', md: 'flex' }}
                    rightIcon={<ExternalLinkIcon />}
                  >
                    View
                  </Button>
                  <IconButton
                    colorScheme={detailsColor}
                    variant="solid"
                    aria-label="Open in new page"
                    display={{ base: 'flex', md: 'none' }}
                    icon={<ExternalLinkIcon />}
                  />
                </a>
              </NextLink>
              <Button
                colorScheme={compareColor}
                variant="solid"
                isDisabled={comparedCpus.ids.includes(item.id)}
                aria-label="Add to comparison"
                onClick={() => comparedCpus.addId(item.id)}
                display={{ base: 'none', sm: 'flex' }}
              >
                Compare
              </Button>
              <IconButton
                colorScheme={compareColor}
                variant="solid"
                isDisabled={comparedCpus.ids.includes(item.id)}
                aria-label="Add to comparison"
                onClick={() => comparedCpus.addId(item.id)}
                display={{ base: 'flex', sm: 'none' }}
                icon={<PlusSquareIcon />}
              />{' '}
            </Stack>
            <Divider />
          </Fragment>
        );
      })}
    </Stack>
  );
}

export default ItemLinkList;
