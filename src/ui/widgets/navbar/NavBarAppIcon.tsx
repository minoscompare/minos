import { Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import MinosIconText from '../MinosIconText';

export default function NavBarAppIcon() {
  return (
    <NextLink href="/" passHref>
      <Center as="a">
        <MinosIconText height={40} width={187} />
      </Center>
    </NextLink>
  );
}
