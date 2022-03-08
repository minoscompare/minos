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
import { CpuComparison, MinosCpu } from '@minos/lib/types';
import { compareCpus, getManyCpus } from '@minos/lib/api/data-access/cpu';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';

interface CpuSpecRowProps {
  name: string;
  valueKey: keyof CpuComparison['bestIndices'];
  cpus: MinosCpu[];
  comparison: CpuComparison;
}

function CpuSpecRow({ name, valueKey, cpus, comparison }: CpuSpecRowProps) {
  const green = useColorModeValue('green.400', 'green.600');
  const red = useColorModeValue('red.300', 'red.500');
  const gray = useColorModeValue('gray.300', 'gray.500');
  return (
    <Tr>
      <Td>{name}</Td>
      {cpus.map((cpu, idx) => {
        const isBestValue = comparison.bestIndices[valueKey].includes(idx);
        return (
          <Td
            key={cpu.id}
            color={isBestValue ? green : cpu.specs[valueKey] ? red : gray}
            fontWeight={isBestValue ? 'bold' : 'hairline'}
          >
            {cpu.specs[valueKey] ?? 'Unknown'}
          </Td>
        );
      })}
    </Tr>
  );
}

interface CpuSpecRowsProps {
  cpus: MinosCpu[];
  comparison: CpuComparison;
}

function CpuSpecRows({ cpus, comparison }: CpuSpecRowsProps) {
  return (
    <>
      <CpuSpecRow
        name="# of Cores"
        valueKey="cores"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="# of Threads"
        valueKey="threads"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="# of Threads"
        valueKey="threads"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="Base Frequency"
        valueKey="frequency"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="L1 Cache"
        valueKey="cacheL1"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="L2 Cache"
        valueKey="cacheL2"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="L3 Cache"
        valueKey="cacheL3"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="TDP"
        valueKey="tdp"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="Launch Date"
        valueKey="launchDate"
        cpus={cpus}
        comparison={comparison}
      />
      <CpuSpecRow
        name="Lithography"
        valueKey="lithography"
        cpus={cpus}
        comparison={comparison}
      />
    </>
  );
}

type CpuCompareProps = { cpus: MinosCpu[]; comparison: CpuComparison };

// Main page function
function CpuCompare({ cpus, comparison }: CpuCompareProps) {
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
                {cpus.map((cpu) => {
                  return <Th key={cpu.id}>{cpu.fullName}</Th>;
                })}
              </Tr>
              <Tr>
                <Th></Th>
                {cpus.map((cpu) => (
                  <Th key={cpu.id}>
                    <Button
                      onClick={() => removeComparedID(cpu.id)}
                      colorScheme="red"
                    >
                      Remove
                    </Button>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Brand</Td>
                {cpus.map((cpu) => {
                  return <Td key={cpu.id}>{cpu.brand}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Name</Td>
                {cpus.map((cpu) => {
                  return <Td key={cpu.id}>{cpu.model}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Family</Td>
                {cpus.map((cpu) => {
                  return <Td key={cpu.id}>{cpu.family}</Td>;
                })}
              </Tr>
              <CpuSpecRows cpus={cpus} comparison={comparison} />
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Layout>
  );
}

// GetServerSideProps to get the list of compared components before page render
export const getServerSideProps: GetServerSideProps<CpuCompareProps> = async (
  context
) => {
  // Get array of cpu ids from query params
  const cpuIdStrings = (context.query.ids ?? []) as string[];
  const cpuIds = cpuIdStrings.map((id) => parseInt(id, 10));

  // Creates an array of promises to fetch all individual cpus
  const cpus = await getManyCpus(prisma, { where: { id: { in: cpuIds } } });

  if (cpus.length !== cpuIds.length) {
    // Show not found if one cpu does not exist
    return { notFound: true };
  }

  const comparison = await compareCpus(prisma, cpuIds);

  return {
    props: { cpus, comparison },
  };
};

export default CpuCompare;
