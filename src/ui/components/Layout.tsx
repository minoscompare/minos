import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';
import NavBar from '@minos/ui/widgets/navbar/NavBar';
import { Center } from '@chakra-ui/react';

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Center>
        <Wrapper variant={variant}>{children}</Wrapper>
      </Center>
    </>
  );
};
