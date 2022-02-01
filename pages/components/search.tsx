import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import Link from 'next/link';

const ComponentSearch: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Components</title>
        <meta name="description" content="From minoscompare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Search Components!</h1>
        <p className={styles.description}>
          This page is currently blank.
          <br />
          <Link href="/">
            <a>Return to Home</a>
          </Link>
        </p>
      </main>
    </div>
  );
};

export default ComponentSearch;
