import React from 'react';
import { Container } from '@chakra-ui/react';

export type WrapperVariant = 'large' | 'regular' | 'small';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  variant = 'regular',
  children,
}) => {
  return (
    <Container
      maxW={
        {
          large: 'container.xl',
          regular: 'container.lg',
          small: 'container.md',
        }[variant]
      }
      minH="100%"
    >
      {children}
    </Container>
  );
};
