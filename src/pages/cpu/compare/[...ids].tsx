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
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import prisma from '@minos/lib/api/utils/prisma';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { MinosCpu } from '@minos/lib/types';
import {
  getManyCpusUnformatted,
  prismaCpuToMinosCpu,
} from '@minos/lib/api/data-access/cpu';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';
import { Cpu } from '@prisma/client';

interface CpuSpecRowProps {
  name: string;
  prismaCPUValueKey: keyof Cpu;
  minosCPUValueKey: keyof MinosCpu['specs'];
  cpus: Cpu[];
  bestValue: number;
}

function findExtremePropertyValue(
  cpus: Cpu[],
  prismaCPUValueKey: keyof Cpu,
  highOrLow: boolean
) {
  // Note: "highOrLow" represents whether to find highest or lowest value. True = highest, False = lowest.
  // Stops if the first CPU is nonexistent
  if (cpus.length == 0 || !cpus[0] || cpus[0][prismaCPUValueKey] == null) {
    return 0;
  } else {
    let extremeValue = parseInt(cpus[0][prismaCPUValueKey] as string);
    for (let i = 0; i < cpus.length; i++) {
      // Ignores this CPU if it's null
      if (cpus[i][prismaCPUValueKey] == null) {
        continue;
      }

      // Sets the extreme value according to whether to get highest or lowest
      if (highOrLow) {
        extremeValue = Math.max(
          parseInt(cpus[i][prismaCPUValueKey] as string),
          extremeValue
        );
      } else {
        extremeValue = Math.min(
          parseInt(cpus[i][prismaCPUValueKey] as string),
          extremeValue
        );
      }
    }

    // Returns the extreme value found
    console.log(
      `Extreme Value: ${extremeValue}, valueKey: ${prismaCPUValueKey}`
    );
    return extremeValue;
  }
}

function CpuSpecRow({
  name,
  prismaCPUValueKey,
  minosCPUValueKey,
  cpus,
  bestValue,
}: CpuSpecRowProps) {
  return (
    <Tr>
      <Td>{name}</Td>
      {cpus.map((cpu) => (
        <Td
          key={name + cpu.id}
          color={cpu[prismaCPUValueKey] == bestValue ? 'green.400' : 'red.300'}
          fontWeight={cpu[prismaCPUValueKey] == bestValue ? 'bold' : 'hairline'}
        >
          {prismaCpuToMinosCpu(cpu).specs[minosCPUValueKey] ?? 'Unknown'}
        </Td>
      ))}
    </Tr>
  );
}

// Props interface
interface PageProps {
  comparedCPUData: Cpu[];
}

// Spec Displaying Function
function displayCpuSpecRows(cpuList: Cpu[]) {
  return (
    <>
      <CpuSpecRow
        name="# of Cores"
        prismaCPUValueKey="cores"
        minosCPUValueKey="cores"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'cores', true)}
      />
      <CpuSpecRow
        name="# of Threads"
        prismaCPUValueKey="threads"
        minosCPUValueKey="threads"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'threads', true)}
      />
      <CpuSpecRow
        name="Base Frequency"
        prismaCPUValueKey="frequency"
        minosCPUValueKey="frequency"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'frequency', true)}
      />
      <CpuSpecRow
        name="L1 Cache"
        prismaCPUValueKey="cacheL1"
        minosCPUValueKey="cacheL1"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'cacheL1', true)}
      />
      <CpuSpecRow
        name="L2 Cache"
        prismaCPUValueKey="cacheL2"
        minosCPUValueKey="cacheL2"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'cacheL2', true)}
      />
      <CpuSpecRow
        name="L3 Cache"
        prismaCPUValueKey="cacheL3"
        minosCPUValueKey="cacheL3"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'cacheL3', true)}
      />
      <CpuSpecRow
        name="TDP"
        prismaCPUValueKey="tdp"
        minosCPUValueKey="tdp"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'tdp', true)}
      />
      <CpuSpecRow
        name="Launch Date"
        prismaCPUValueKey="launchYear"
        minosCPUValueKey="launchDate"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'launchYear', true)}
      />
      <CpuSpecRow
        name="Lithography"
        prismaCPUValueKey="lithography"
        minosCPUValueKey="lithography"
        cpus={cpuList}
        bestValue={findExtremePropertyValue(cpuList, 'lithography', false)}
      />
    </>
  );
}

// Main page function
const CpuComparison: NextPage<PageProps> = (props: PageProps) => {
  // Colours
  const removeColor = useColorModeValue('red', 'red.800');

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
                  return (
                    <Th key={'CpuHeader' + cpu.id}>
                      {prismaCpuToMinosCpu(cpu).fullName}
                    </Th>
                  );
                })}
              </Tr>
              <Tr>
                <Th></Th>
                {props.comparedCPUData.map((cpu) => {
                  return (
                    <Th key={'CpuRemoveButton' + cpu.id}>
                      <Button
                        onClick={() => removeComparedID(cpu.id)}
                        colorScheme="red"
                      >
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
                  return <Td key={'CpuName' + cpu.id}>{cpu.name}</Td>;
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
  const cpuIdStrings = (context.query.ids ?? []) as string[];
  const cpuIds = cpuIdStrings.map((id) => parseInt(id, 10));

  // Creates an array of promises to fetch all individual cpus
  const cpus = await getManyCpusUnformatted(prisma, {
    where: { id: { in: cpuIds } },
  });

  if (cpus.length !== cpuIds.length) {
    // Show not found if one cpu does not exist
    return { notFound: true };
  }

  return {
    props: { comparedCPUData: cpus },
  };
};
export default CpuComparison;
