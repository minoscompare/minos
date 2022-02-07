import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '@minos/lib/prisma';
import {
  Box,
  Container,
  Stack,
  Text,
  Button,
  Heading,
  useColorModeValue,
  List,
  ListItem,
  useColorMode,
} from '@chakra-ui/react';
import NavBar from '@minos/ui/widgets/Navbar';
import { Minos } from '@minos/lib/types';

interface CpuPageProps {
  cpu: Minos.Cpu;
}

const CpuPage: NextPage<CpuPageProps> = ({ cpu }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container>
      <Stack spacing={{ base: 6, md: 10 }}>
        <NavBar />
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            {cpu.fullName}
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
            {cpu.specs
              .flatMap((category) => category.items)
              .map(({ name, value }) => (
                <ListItem key={name}>
                  <Text as="span" fontWeight="bold">
                    {name}
                  </Text>{' '}
                  {value ?? 'Unknown'}
                </ListItem>
              ))}
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

  let cpu: Minos.Cpu;
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
    paths: cpus.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
};

// Export Functional Component
export default CpuPage;
