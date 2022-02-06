import type { NextPage } from 'next';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Cpu } from '@prisma/client';
import prisma from '@minos/lib/prisma';

import styles from './CpuPage.module.css';

interface CpuPageProps {
  cpu: Cpu;
}

const CpuPage: NextPage<CpuPageProps> = ({ cpu }) => {
  // Returns page HTML
  return (
    <div className={styles.container}>
      <div className={styles.spacer}>
        <header>
          <h1 className={styles.title}>
            {cpu.brand} {cpu.name}
          </h1>
          <p className={styles.subtitle}>{cpu.family}</p>
        </header>
        <h3 className={styles.description}>Specifications</h3>
        <p className={styles.listItem}>
          <p className={styles.bold}># of Cores:</p>
          <p>{cpu.cores}</p>
        </p>
        <p className={styles.listItem}>
          <p className={styles.bold}># of Threads:</p>
          <p>{cpu.threads}</p>
        </p>
        <p className={styles.listItem}>
          <p className={styles.bold}>Launch Date:</p>
          <p>
            {cpu.launchQuarter} {cpu.launchYear}
          </p>
        </p>
        <p className={styles.listItem}>
          <p className={styles.bold}>Base Frequency:</p>
          <p>{cpu.frequency} GHz</p>
        </p>
        <p className={styles.listItem}>
          <p className={styles.bold}>Cache:</p>
          <p>{cpu.cache} MB</p>
        </p>
        <p className={styles.listItem}>
          <p className={styles.bold}>TDP:</p>
          <p>{cpu.tdp} W</p>
        </p>
        <p className={styles.listItem}>
          <p className={styles.bold}>Lithography:</p>
          <p>{cpu.lithography} W</p>
        </p>
      </div>
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
    cpu = await fetch(`http://localhost:3000/api/cpu/${id}`)
      .then((res) => res.json())
      .then((res) => res.data);
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
