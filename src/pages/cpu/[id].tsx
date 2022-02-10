import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { GetStaticPaths } from 'next';
import prisma from '@minos/server/prisma';
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
import { createAppSSGHelpers } from '@minos/server/trpc';
import { trpc } from '@minos/utils/trpc';
import NextError from 'next/error';

function CpuPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { id } = props;
  const cpuQuery = trpc.useQuery(['cpu.byId', { id }]);

  const gray = useColorModeValue('gray.900', 'gray.400');
  const yellow = useColorModeValue('yellow.500', 'yellow.300');

  if (cpuQuery.error) {
    return (
      <NextError
        title={cpuQuery.error.message}
        statusCode={cpuQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (cpuQuery.status !== 'success') {
    return <>Loading...</>;
  }

  const cpu = cpuQuery.data;

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
          <Text color={gray} fontWeight={300} fontSize="2xl">
            {cpu.family}
          </Text>
        </Box>
        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={yellow}
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
      </Stack>
    </Layout>
  );
}

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

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
) => {
  if (!context.params?.id) {
    return { notFound: true };
  }

  const id = parseInt(context.params.id);

  const ssg = await createAppSSGHelpers();

  await ssg.fetchQuery('cpu.byId', { id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
};
