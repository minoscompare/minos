import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';

export type WrapperVariant = 'large' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Container maxW={variant === 'large' ? 'container.xl' : 'container.lg'}>
      {children}
    </Container>
  );
};
