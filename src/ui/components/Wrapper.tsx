import React from 'react';
import { Box, Container } from '@chakra-ui/react';
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
    <Container maxW={variant === 'small' ? 'container.lg' : 'container.xl'}>
      {children}
    </Container>
  );
};
