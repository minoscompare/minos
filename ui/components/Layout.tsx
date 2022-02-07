import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';
import NavBar from '../widgets/NavBar';

interface LayoutProps {
  title: string;
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant, title }) => {
  return (
    <>
      <NavBar />
      <Wrapper title={title} variant={variant}>
        {children}
      </Wrapper>
    </>
  );
};
