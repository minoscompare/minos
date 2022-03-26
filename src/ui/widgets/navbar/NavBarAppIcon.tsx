import { HStack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import MinosIcon from '@minos/const/images/minos-icon.svg';

export default function NavBarAppIcon() {
  return (
    <NextLink href="/" passHref>
      <a>
        <HStack>
          <Image height={40} width={40} src={MinosIcon} alt="Minos Icon" />
          <Text>Minos</Text>
        </HStack>
      </a>
    </NextLink>
  );
}
