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
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import { ReactElement, useEffect, useState } from 'react';
import { Minos } from '@minos/lib/types';
import prisma from '@minos/lib/prisma';
import { useAtom } from 'jotai';
import { comparedCPUPaths } from '../_app';

// Spec Displaying Function
function displayCpuSpecRows(cpuList: Minos.Cpu[]) {
  if (cpuList.length != 0) {
    return cpuList[0].specs
      .flatMap((category) => category.items)
      .map((field) => (
        <>
          <Tr key={field.name}>
            <Td>{field.name}</Td>
            {cpuList.map((cpu) => (
              <Td key={field.name + cpu.id}>
                {
                  cpu.specs
                    .flatMap((thisCpuCat) => thisCpuCat.items)
                    .find((item) => item.name == field.name)?.value
                }
              </Td>
            ))}
          </Tr>
        </>
      ));
  }
}

// Main page function
const CpuComparison: NextPage = () => {
  // State management
  const [comparedList, setComparedList] = useState(Array<Minos.Cpu>());
  const [comparedPaths, setComparedPaths] = useAtom(comparedCPUPaths);

  function addToComparedList(newCPU: Minos.Cpu) {
    if (!comparedList.map((cpu) => cpu.id).includes(newCPU.id)) {
      setComparedList([...comparedList, newCPU]);
    }
  }

  useEffect(() => {
    const fetchData = async (url: string) => {
      let foundCPU = await fetch(`${url}`)
        .then((res) => res.json())
        .then((res) => res.data);

      if (!comparedList.map((cpu) => cpu.id).includes(foundCPU.id)) {
        addToComparedList(foundCPU);
      }
    };

    comparedPaths.map((url) => fetchData(url).catch(console.error));
  });

  // Returns HTML
  return (
    <Layout title="Compare CPUs">
      <Stack spacing={{ base: 6, md: 10 }} direction="column">
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={500}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            Comparison Page
          </Heading>
        </Box>
        <Center>
          <Table>
            <Thead>
              <Tr>
                <Th>Field</Th>
                {comparedList.map((cpu: Minos.Cpu) => {
                  return <Th key={'CpuHeader' + cpu.id}>{cpu.fullName}</Th>;
                })}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Brand</Td>
                {comparedList.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuBrand' + cpu.id}>{cpu.brand}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Name</Td>
                {comparedList.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuName' + cpu.id}>{cpu.name}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Family</Td>
                {comparedList.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuFamily' + cpu.id}>{cpu.family}</Td>;
                })}
              </Tr>
              {displayCpuSpecRows(comparedList)}
            </Tbody>
          </Table>
        </Center>
      </Stack>
    </Layout>
  );
};

export default CpuComparison;
