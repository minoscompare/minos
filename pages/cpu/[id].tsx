import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Cpu } from '@prisma/client';
import prisma from '@minos/lib/prisma';

interface CpuPageProps {
  cpu: Cpu;
}

// Functional Component
const CpuPage: NextPage<CpuPageProps> = ({ cpu }) => {
  // Returns page HTML
  return (
    <div className={styles.container}>
      <Head>
        <title>Component page: </title>
        <meta name="description" content="From minoscompare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>CPU</h1>

        <p className={styles.description}>
          {JSON.stringify(cpu, null, 2)}
          <br />
          <Link href="/">
            <a>Return to Home</a>
          </Link>
        </p>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<CpuPageProps> = async (context) => {
  // Note: if done correctly, id should never be null and should always exist in db!
  const id = context.params?.id;

  if (!id) {
    return { notFound: true };
  }

  let cpu: Cpu;
  try {
    cpu = await fetch(`http://localhost:3000/api/cpu/${id}`).then((res) =>
      res.json()
    );
  } catch (err) {
    return { notFound: true };
  }

  return { props: { cpu } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Gets **ALL** cpu ids in database (thousands of ids)
  const cpus = await prisma.cpu.findMany({ select: { id: true } });
  return {
    paths: cpus.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

// Export Functional Component
export default CpuPage;
