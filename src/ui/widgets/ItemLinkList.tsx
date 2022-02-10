import React from 'react';
import NextLink from 'next/link';
import { Button, Text, Stack, useColorModeValue } from '@chakra-ui/react';

// A brief explanation of TypeScript Generics:
// Generics are used when you want to define a specific shape but make it extendable
// and reusable.
//
// type MyGeneric1<T> = { val: T };                 // A typescript generic
//
// let myVal1: MyGeneric1<'apples'>;                // { val: 'apples' }
// let myVal2: MyGeneric1<3>;                       // { val: 3 }
// let myVal3: MyGeneric1<string>;                  // { val: string }
//
// type MyGeneric2<T extends string> = { val: T };  // Generic extending the string type
//
// let myVal4: MyGeneric2<'carrots'>;               // { val: 'carrots' }
// let myVal5: MyGeneric2<string>;                  // { val: string }
// let myVal6: MyGeneric2<4>;                       // ERROR: T must extend string
//
// Note: in the first example (MyGeneric1), T implicitely extends any
//       i.e. MyGeneric1<T> is equivalent to MyGeneric1<T extends any>
//
// type MyGeneric2<T extends string = 'apples'> = { val: T }; // same as before, but now with a default value
//
// let myVal4: MyGeneric2;                          // { val: 'apples' }
// let myVal4: MyGeneric2<'carrots'>;               // { val: 'apples' }
// let myVal5: MyGeneric2<string>;                  // { val: string }
// let myVal6: MyGeneric2<4>;                       // ERROR: T must extend string (same as before)
//
//
//
// In pseudo-code, SearchListItem is equivalent to
// type SearchListItem<T extends any object with strings as keys = empty object>
//    = { key: string; name: string; url: string } combined with T;
//
// Examples:
// SearchListItem;                                    // { key: string; name: string; url: string; }
// SearchListItem<{ snacks: string }>;                // { key: string; name: string; url: string; snacks: string; }
// SearchListItem<{ id: number }>;                    // { key: string; name: string; url: string; id: number; }
// SearchListItem<{ id: number, snacks: 'apples' }>;  // { key: string; name: string; url: string; id: number; snacks: 'apples' }

export type SearchListItem<
  T extends Record<string, any> = Record<string, unknown>,
> = { key: string; name: string; url: string } & T;

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
