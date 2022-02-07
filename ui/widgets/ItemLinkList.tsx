import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';

export interface SearchListItem {
  name: string;
  url: string;
}

interface ComponentProps {
  listItems: SearchListItem[];
}

function ItemLinkList(props: ComponentProps) {
  // Gets a router to route links
  const router = useRouter();

  // Returns page HTML (Unordered list with elements)
  return (
    <Stack>
      {props.listItems.map((item) => {
        return (
          <Stack spacing={10} direction="row" align="center">
            <Text fontWeight="bold" fontSize="6x1">
              {item.name}
            </Text>
            <Spacer />
            <NextLink href={item.url}>
              <Button
                colorScheme={useColorModeValue('blue', 'gray')}
                variant="solid"
              >
                View Details
              </Button>
            </NextLink>

            <Button
              colorScheme={useColorModeValue('orange', 'yellow')}
              isActive={false}
              isDisabled={true}
              variant="outline"
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
