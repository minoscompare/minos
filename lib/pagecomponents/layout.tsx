import React from 'react';
import { ReactElement } from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import {
	Link, 
	Button, 
	Text, 
	Stack, 
	Box,
	useColorMode,
	useColorModeValue,
	Center
} from '@chakra-ui/react'
import NavBar from '@minos/lib/pagecomponents/navbar';

function Layout(children: ReactElement) {

	//TODO: Implement this properly to have a standard sized container for all pages
  return (
    <>
      {children}
    </>
  );
}
