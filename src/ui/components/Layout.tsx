import React from 'react';
import NavBar from '@minos/ui/widgets/navbar/NavBar';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { Wrapper, WrapperVariant } from './Wrapper';
import Footer from '@minos/ui/widgets/Footer';

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Flex flexDir="column" minH="100vh">
        <NavBar />
        <Flex py={10} flex={1}>
          <Wrapper variant={variant}>{children}</Wrapper>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};
