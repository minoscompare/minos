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
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import { ReactElement, useEffect, useState } from 'react';
import { Minos } from '@minos/lib/types';
import prisma from '@minos/lib/prisma';
import { useAtom } from 'jotai';
import { comparedCPUIds } from '../_app';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// Props interface
interface PageProps {
  comparedCPUData: Minos.Cpu[];
}

// Spec Displaying Function
function displayCpuSpecRows(cpuList: Minos.Cpu[]) {
  if (cpuList && cpuList.length != 0) {
    return cpuList[0].specs
      .flatMap((category) => category.items)
      .map((field) => (
        <>
          <Tr key={field.name}>
            <Td>{field.name}</Td>
            {cpuList.map((cpu) => (
              <Td key={field.name + cpu.id}>
                {cpu.specs
                  .flatMap((thisCpuCat) => thisCpuCat.items)
                  .find((item) => item.name == field.name)?.value ?? '(?)'}
              </Td>
            ))}
          </Tr>
        </>
      ));
  }
}

// Main page function
const CpuComparison: NextPage<PageProps> = (props: PageProps) => {
  // State management
  const [comparedIDs, setComparedIDs] = useAtom(comparedCPUIds);

  // Routing
  const router = useRouter();

  function updatePageQuery(newComparedIDs: string[]) {
    router.push({
      pathname: window.location.pathname,
      query: {
        comparedIDs: newComparedIDs,
      },
    });
  }

  // Function for removing components
  function removeComparedID(cpuID: string) {
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
        <Center>
          <Table>
            <Thead>
              <Tr>
                <Th>Field</Th>
                {props.comparedCPUData?.map((cpu: Minos.Cpu) => {
                  return <Th key={'CpuHeader' + cpu.id}>{cpu.fullName}</Th>;
                })}
              </Tr>
              <Tr>
                <Th></Th>
                {props.comparedCPUData?.map((cpu: Minos.Cpu) => {
                  return (
                    <Th key={'CpuRemoveButton' + cpu.id}>
                      <Button
                        onClick={() => removeComparedID(cpu.id.toString())}
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
                {props.comparedCPUData?.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuBrand' + cpu.id}>{cpu.brand}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Name</Td>
                {props.comparedCPUData?.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuName' + cpu.id}>{cpu.name}</Td>;
                })}
              </Tr>
              <Tr>
                <Td>Family</Td>
                {props.comparedCPUData?.map((cpu: Minos.Cpu) => {
                  return <Td key={'CpuFamily' + cpu.id}>{cpu.family}</Td>;
                })}
              </Tr>
              {displayCpuSpecRows(props.comparedCPUData)}
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

  if (context.query && context.query.comparedIDs) {
    if (Array.isArray(context.query.comparedIDs)) {
      cpuIDs = context.query.comparedIDs;
    } else {
      cpuIDs.push(context.query.comparedIDs);
    }
  }

  // Fetches the CPUs at the given paths
  for (let i = 0; i < cpuIDs.length; i++) {
    try {
      cpus.push(
        await fetch(`http://localhost:3000/api/cpu/${cpuIDs[i]}`)
          .then((res) => res.json())
          .then((res) => res.data)
      );
    } catch (err) {
      return { notFound: true };
    }
  }

  return {
    props: {
      comparedCPUData: cpus,
    },
  };
};
export default CpuComparison;
