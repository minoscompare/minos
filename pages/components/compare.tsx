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
import { useState } from 'react';
import { Minos } from '@minos/lib/types';
import prisma from '@minos/lib/prisma';

// Main page function
const CpuComparison: NextPage = () => {
  // Sets state management
  const [comparedList, setComparedList] = useState(Array<Minos.Cpu>());

  // (Placeholder) sets the compared CPUs statically for now, TODO add dynamic storing of cpus from global state
  if (comparedList.length == 0) {
    setComparedList([
      {
        brand: 'AMD',
        id: 0,
        name: '3320 EE',
        family: 'AMD Opteron™',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'AMD Opteron™ 3320 EE',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
      {
        brand: 'Intel',
        id: 1,
        name: 'i7 423455647',
        family: 'Intel Pentium',
        updatedAt: '0',
        createdAt: '0',
        fullName: 'Intel Pentium i7 423455647',
        specs: [],
      },
    ]);
  }

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
                  return <Th key={cpu.id}>{cpu.fullName}</Th>;
                })}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Brand</Td>
                {comparedList.map((cpu: Minos.Cpu) => {
                  return <Td key={cpu.id}>{cpu.brand}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Name</Td>
                {comparedList.map((cpu: Minos.Cpu) => {
                  return <Td key={cpu.id}>{cpu.name}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Family</Td>
                {comparedList.map((cpu: Minos.Cpu) => {
                  return <Td key={cpu.id}>{cpu.family}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>...Remaining fields TODO</Td>
              </Tr>
            </Tbody>
          </Table>
        </Center>
      </Stack>
    </Layout>
  );
};

export default CpuComparison;
