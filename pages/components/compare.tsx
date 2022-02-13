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
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import { ReactElement, useEffect, useState } from 'react';
import { Minos } from '@minos/lib/types';
import prisma from '@minos/lib/prisma';
import { useAtom } from 'jotai';
import { comparedCPUs } from '../_app';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// Props interface
interface PageProps {
  comparedCPUListTemporaryName: Minos.Cpu[];
}

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
  const [comparedData, setComparedData] = useAtom(comparedCPUs);

  // Routing
  const router = useRouter();

  // Function for removing components
  function removeComponent(cpuID: number) {
    let newComparedData = comparedData;
    let index = newComparedData.map((cpu) => cpu.id).indexOf(cpuID);
    if (index > -1) {
      newComparedData.splice(index, 1);
    }
    setComparedData(newComparedData);
    router.push(window.location.pathname);
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
                {comparedData.map((cpu: Minos.Cpu) => {
                  return <Th key={'CpuHeader' + cpu.id}>{cpu.fullName}</Th>;
                })}
              </Tr>
              <Tr>
                <Th></Th>
                {comparedData.map((cpu: Minos.Cpu) => {
                  return (
                    <Th key={'CpuRemoveButton' + cpu.id}>
                      <Button onClick={() => removeComponent(cpu.id)}>
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
                {comparedData.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuBrand' + cpu.id}>{cpu.brand}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Name</Td>
                {comparedData.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuName' + cpu.id}>{cpu.name}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Family</Td>
                {comparedData.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuFamily' + cpu.id}>{cpu.family}</Td>;
                })}
              </Tr>
              {displayCpuSpecRows(comparedData)}
            </Tbody>
          </Table>
        </Center>
      </Stack>
    </Layout>
  );
};

// GetServerSideProps to get the list of compared components before page render
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetches data for the cpus passed in context parameters
  let cpuIDs: string[] = [];
  let cpus: Minos.Cpu[] = [];

  if (context.params && Array.isArray(context.params[0])) {
    cpuIDs = context.params[0] as string[];
  }

  // Fetches the CPUs at the given paths
  for (let i = 0; i < cpuIDs.length; i++) {
    try {
      cpuIDs.push(
        await fetch(`http://localhost:3000/api/cpu/${id}`)
          .then((res) => res.json())
          .then((res) => res.data)
      );
    } catch (err) {
      return { notFound: true };
    }
  }

  return {
    props: {
      comparedCPUListTemporaryName: cpus,
    },
  };
};
export default CpuComparison;
