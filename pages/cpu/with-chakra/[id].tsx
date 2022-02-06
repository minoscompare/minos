import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Cpu } from '@prisma/client';
import prisma from '@minos/lib/prisma';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  useColorMode,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import NavBar from '@minos/lib/pagecomponents/navbar';

interface CpuPageProps {
  cpu: Cpu;
}

const CpuPage: NextPage<CpuPageProps> = ({ cpu }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container>
      <Stack spacing={{ base: 6, md: 10 }}>
        <NavBar/>
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            {cpu.brand} {cpu.name}
          </Heading>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize="2xl"
          >
            {cpu.family}
          </Text>
        </Box>
        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('yellow.500', 'yellow.300')}
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Specifications
          </Text>
          <List spacing={2}>
            <ListItem>
              <Text as="span" fontWeight="bold">
                # of Cores:
              </Text>{' '}
              {cpu.cores}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                # of Threads:
              </Text>{' '}
              {cpu.threads}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                Launch Date:
              </Text>{' '}
              {cpu.launchQuarter} {cpu.launchYear}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                Base Frequency:
              </Text>{' '}
              {cpu.frequency} GHz
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                Cache:
              </Text>{' '}
              {cpu.cache} MB
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                TDP:
              </Text>{' '}
              {cpu.tdp} W
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                Lithography
              </Text>{' '}
              {cpu.lithography} nm
            </ListItem>
          </List>
        </Box>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Stack>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<CpuPageProps> = async (context) => {
  // Note: if done correctly, id should never be null and should always exist in db!
  const id = context.params?.id;

  if (!id) {
    return { notFound: true };
  }

  let cpu: Cpu;
  try {
    cpu = await fetch(`http://localhost:3000/api/cpu/${id}`)
      .then((res) => res.json())
      .then((res) => res.data);
  } catch (err) {
    return { notFound: true };
  }

  return { props: { cpu } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Gets **ALL** cpu ids in database (thousands of ids)
  const cpus = await prisma.cpu.findMany({ select: { id: true } });
  return {
    paths: cpus.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

// Export Functional Component
export default CpuPage;
