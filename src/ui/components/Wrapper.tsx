import React from 'react';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <div>
      <Box
        mt={8}
        mx="auto"
        maxW={variant === 'regular' ? '800px' : '400px'}
        w="100%"
      >
        {children}
      </Box>
    </div>
  );
};
