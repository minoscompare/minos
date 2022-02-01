import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Minoscompare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Error 404</h1>
        <p className={styles.description}>
          (The page you are looking for could not be found)
          <br />
          <Link href="/">
            <a>Return to Home</a>
          </Link>
        </p>
      </main>
    </div>
  );
};

export default NotFound;
