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
} from '@chakra-ui/react';
import { Layout } from '@minos/ui/components/Layout';
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';

// Main page function
const CpuComparison: NextPage = () => {
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
        <Table>
          <Thead>
            <Tr>
              <Th>Field</Th>
              <Th>1 (AMD 3320 EE)</Th>
              <Th>2 (Intel X1010) </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Brand</Td>
              <Td>AMD</Td>
              <Td>Intel</Td>
            </Tr>
            <Tr>
              <Td>Name</Td>
              <Td>3320 EE</Td>
              <Td>X1010</Td>
            </Tr>
            <Tr>
              <Td>Family</Td>
              <Td>AMD Opteron™</Td>
              <Td>Intel® Quark™ SoC X1000 Series</Td>
            </Tr>
            <Tr>
              <Td>Launch Quarter</Td>
              <Td>Q1</Td>
              <Td>Q3</Td>
            </Tr>
            <Tr>
              <Td>Launch Year</Td>
              <Td textColor="green.600">
                <MdArrowCircleUp />
                Lower
              </Td>
              <Td textColor="red.600">
                <MdArrowCircleDown />
                Higher
              </Td>
            </Tr>
            <Tr>
              <Td>Cores</Td>
              <Td textColor="red.600">
                <MdArrowCircleDown />
                Less
              </Td>
              <Td textColor="green.600">
                <MdArrowCircleUp />
                More
              </Td>
            </Tr>
            <Tr>
              <Td>Threads</Td>
              <Td textColor="red.600">
                <MdArrowCircleDown />
                Less
              </Td>
              <Td textColor="green.600">
                <MdArrowCircleUp />
                More
              </Td>
            </Tr>
            <Tr>
              <Td>Frequency</Td>
              <Td textColor="red.600">
                <MdArrowCircleDown />
                Lower
              </Td>
              <Td textColor="green.600">
                <MdArrowCircleUp />
                Higher
              </Td>
            </Tr>
            <Tr>
              <Td>Lithography</Td>
              <Td textColor="green.600">
                <MdArrowCircleUp />
                More
              </Td>
              <Td textColor="red.600">
                <MdArrowCircleDown />
                Less
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
    </Layout>
  );
};

export default CpuComparison;
