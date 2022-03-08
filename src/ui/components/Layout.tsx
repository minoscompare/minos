import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';
import NavBar from '@minos/ui/widgets/navbar/NavBar';
import { Center } from '@chakra-ui/react';

interface LayoutProps {
  title: string;
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant, title }) => {
  return (
    <>
      <NavBar />
      <Center>
        <Wrapper title={title} variant={variant}>
          {children}
        </Wrapper>
      </Center>
    </>
  );
};
