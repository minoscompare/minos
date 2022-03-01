import { useEffect } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Stack,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Center,
  Button,
  propNames,
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import prisma from '@minos/lib/api/utils/prisma';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { MinosCpu } from '@minos/lib/types';
import { getCpuById } from '@minos/lib/api/data-access/cpu';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';

interface CpuSpecRowProps {
  name: string;
  valueKey: keyof MinosCpu['specs'];
  cpus: MinosCpu[];
}

function CpuSpecRow({ name, valueKey, cpus }: CpuSpecRowProps) {
  return (
    <Tr>
      <Td>{name}</Td>
      {cpus.map((cpu) => (
        <Td key={name + cpu.id}>{cpu.specs[valueKey] ?? 'Unknown'}</Td>
      ))}
    </Tr>
  );
}

// Props interface
interface PageProps {
  comparedCPUData: MinosCpu[];
}

// Spec Displaying Function
function displayCpuSpecRows(cpuList: MinosCpu[]) {
  return (
    <>
      <CpuSpecRow name="# of Cores" valueKey="cores" cpus={cpuList} />
      <CpuSpecRow name="# of Threads" valueKey="threads" cpus={cpuList} />
      <CpuSpecRow name="Base Frequency" valueKey="frequency" cpus={cpuList} />
      <CpuSpecRow name="L1 Cache" valueKey="cacheL1" cpus={cpuList} />
      <CpuSpecRow name="L2 Cache" valueKey="cacheL2" cpus={cpuList} />
      <CpuSpecRow name="L3 Cache" valueKey="cacheL3" cpus={cpuList} />
      <CpuSpecRow name="TDP" valueKey="tdp" cpus={cpuList} />
      <CpuSpecRow name="Launch Date" valueKey="launchDate" cpus={cpuList} />
      <CpuSpecRow name="Lithography" valueKey="lithography" cpus={cpuList} />
    </>
  );
}

// Main page function
const CpuComparison: NextPage<PageProps> = (props: PageProps) => {
  // State management
  const [comparedIDs, setComparedIDs] = useCompareCpus();

  // Routing
  const router = useRouter();

  function updatePageQuery(newComparedIDs: number[]) {
    router.push(`/cpu/compare/${newComparedIDs.join('/')}`);
  }

  // Function for removing components
  function removeComparedID(cpuID: number) {
    let newComparedIDs = comparedIDs;
    let index = newComparedIDs.indexOf(cpuID);
    if (index > -1) {
      newComparedIDs.splice(index, 1);
    }
    setComparedIDs(newComparedIDs);
    updatePageQuery(comparedIDs);
  }

  useEffect(() => {
    if (props.comparedCPUData.length == 0 && comparedIDs.length != 0) {
      console.log('a');
      updatePageQuery(comparedIDs);
    }
  });

  // Returns HTML
  return (
    <Layout title="Compare CPUs">
      <Stack spacing={{ base: 6, md: 10 }} direction="column">
        <Box as="header" key="HeaderBox">
          <Heading
            lineHeight={1.1}
            fontWeight={500}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            Comparison Page
          </Heading>
        </Box>
        <Box w={[200, 400, 600]} alignContent="start">
          <Table>
            <Thead>
              <Tr>
                <Th>Field</Th>
                {props.comparedCPUData.map((cpu) => {
                  return <Th key={'CpuHeader' + cpu.id}>{cpu.fullName}</Th>;
                })}
              </Tr>
              <Tr>
                <Th></Th>
                {props.comparedCPUData.map((cpu) => {
                  return (
                    <Th key={'CpuRemoveButton' + cpu.id}>
                      <Button onClick={() => removeComparedID(cpu.id)}>
                        Remove
                      </Button>
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Brand</Td>
                {props.comparedCPUData.map((cpu) => {
                  return <Td key={'CpuBrand' + cpu.id}>{cpu.brand}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Name</Td>
                {props.comparedCPUData.map((cpu) => {
                  return <Td key={'CpuName' + cpu.id}>{cpu.model}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Family</Td>
                {props.comparedCPUData.map((cpu) => {
                  return <Td key={'CpuFamily' + cpu.id}>{cpu.family}</Td>;
                })}
              </Tr>
              {displayCpuSpecRows(props.comparedCPUData)}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Layout>
  );
};

// GetServerSideProps to get the list of compared components before page render
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get array of cpu ids from query params
  const cpuIds = (context.query.ids ?? []) as string[];

  // Creates an array of promises to fetch all individual cpus
  const promises = cpuIds.map((id) => getCpuById(prisma, parseInt(id)));

  let cpus: (MinosCpu | null)[];

  try {
    // Awaits all promises at the same time, fails if one fails
    cpus = await Promise.all(promises);
  } catch (err) {
    return { notFound: true };
  }

  // If one or more cpus are falsy (i.e. cpu does not exist), then redirect to not found
  if (cpus.some((cpu) => !cpu)) {
    return { notFound: true };
  }

  return {
    props: {
      comparedCPUData: cpus,
    },
  };
};
export default CpuComparison;
