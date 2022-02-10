import React from 'react';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  title: string;
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  title,
  variant = 'regular',
}) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Minos` : 'Minos'}</title>
      </Head>
      <Box
        mt={8}
        mx="auto"
        maxW={variant === 'regular' ? '800px' : '400px'}
        w="100%"
        as="main"
      >
        {children}
      </Box>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
