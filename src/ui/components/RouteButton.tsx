import { forwardRef } from 'react';
import { ButtonProps, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

type RouteButtonProps = Omit<ButtonProps, 'as'> & { href: string };

const RouteButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  RouteButtonProps
>((props, ref) => {
  const { href, ...rest } = props;
  return (
    <NextLink href={href} passHref>
      <Button ref={ref} as="a" {...rest} />
    </NextLink>
  );
});

export default RouteButton;
