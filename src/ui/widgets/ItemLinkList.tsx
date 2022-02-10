import React from 'react';
import NextLink from 'next/link';
import { Button, Text, Stack, useColorModeValue } from '@chakra-ui/react';

export interface SearchListItem {
  key: string;
  name: string;
  url: string;
}

interface ComponentProps {
  listItems: SearchListItem[];
}

function ItemLinkList(props: ComponentProps) {
  const detailsColor = useColorModeValue('blue', 'gray');
  const compareColor = useColorModeValue('orange', 'yellow');
  return (
    <Stack>
      {props.listItems.map((item) => {
        return (
          <Stack key={item.key} spacing={10} direction="row" align="center">
            <Text fontWeight="bold" fontSize="6x1" isTruncated flex={1}>
              {item.name}
            </Text>
            <NextLink href={item.url}>
              <Button colorScheme={detailsColor} variant="solid">
                View Details
              </Button>
            </NextLink>

            <Button
              colorScheme={compareColor}
              isActive={false}
              isDisabled={true}
              variant="solid"
            >
              Add to Comparison
            </Button>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default ItemLinkList;
