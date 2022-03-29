import React from 'react';
import { Container } from '@chakra-ui/react';

export type WrapperVariant = 'large' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  variant = 'regular',
  children,
}) => {
  return (
    <Container
      maxW={variant === 'large' ? 'container.xl' : 'container.lg'}
      minH="100%"
    >
      {children}
    </Container>
  );
};
