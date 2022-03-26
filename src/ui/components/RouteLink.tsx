import { forwardRef } from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface RouteLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
}

const RouteLink = forwardRef<HTMLAnchorElement, RouteLinkProps>(
  (props, ref) => {
    const { href, ...rest } = props;
    return (
      <NextLink href={href} passHref>
        <ChakraLink ref={ref} {...rest} />
      </NextLink>
    );
  }
);

export default RouteLink;
