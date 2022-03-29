import { useColorModeValue } from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';
import { Optional, Required } from 'utility-types';

type MinosIconTextProps = Required<
  Optional<ImageProps, 'src' | 'alt'>,
  'height' | 'width'
>;

export default function MinosIconText(props: MinosIconTextProps) {
  const icon = useColorModeValue(
    '/static/images/minos-icon-text.svg',
    '/static/images/minos-icon-text-dark.svg'
  );
  return <Image src={icon} alt="Minos Compare" {...props} />;
}
