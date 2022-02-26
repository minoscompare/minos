import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '@minos/lib/api/utils/prisma';
import {
  Box,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { MinosCpu } from '@minos/lib/types';
import { getCpuById } from '@minos/lib/api/data-access/cpu';

interface CpuSpecProps {
  name: string;
  value: string | null;
}

function CpuSpec({ name, value }: CpuSpecProps) {
  return (
    <ListItem>
      <Text as="span" fontWeight="bold">
        {name}
      </Text>{' '}
      {value ?? 'Unknown'}
    </ListItem>
  );
}

interface CpuPageProps {
  cpu: MinosCpu;
}

const CpuPage: NextPage<CpuPageProps> = ({ cpu }) => {
  return (
    <Layout title="Search CPUs">
      <Stack spacing={{ base: 6, md: 10 }}>
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
            <CpuSpec name="# of Cores" value={cpu.specs.cores} />
            <CpuSpec name="# of Threads" value={cpu.specs.threads} />
            <CpuSpec name="Base Frequency" value={cpu.specs.frequency} />
            <CpuSpec name="L1 Cache" value={cpu.specs.cacheL1} />
            <CpuSpec name="L2 Cache" value={cpu.specs.cacheL2} />
            <CpuSpec name="L3 Cache" value={cpu.specs.cacheL3} />
            <CpuSpec name="TDP" value={cpu.specs.tdp} />
            <CpuSpec name="Launch Date" value={cpu.specs.launchDate} />
            <CpuSpec name="Lithography" value={cpu.specs.lithography} />
          </List>
        </Box>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<CpuPageProps> = async (context) => {
  const id = context.params?.id as string | undefined;

  if (!id) {
    return { notFound: true };
  }

  try {
    const cpu = await getCpuById(prisma, parseInt(id));

    if (!cpu) {
      return { notFound: true };
    }

    return { props: { cpu: cpu } };
  } catch (err) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Gets **ALL** cpu ids in database (thousands of ids)
  const cpus = await prisma.cpu.findMany({ select: { id: true } });

  const paths = cpus.map((cpu) => ({ params: { id: cpu.id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

// Export Functional Component
export default CpuPage;
