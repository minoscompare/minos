import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

// Props Interface
interface ComponentData {
  reqQuery: string;
  reqMethod: string;
  reqMessage: string;
}

interface ComponentDataProps {
  propsData: ComponentData;
}

// Functional Component
const ComponentPage: NextPage<ComponentDataProps> = ({ propsData }) => {
  // Gets the API data
  const pageQuery = JSON.stringify(propsData.reqQuery);
  const pageAPIMethod = JSON.stringify(propsData.reqMethod);
  const apiResponseMessage = JSON.stringify(propsData.reqMessage);

  // Returns page HTML
  return (
    <div className={styles.container}>
      <Head>
        <title>Component page: </title>
        <meta name="description" content="From minoscompare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Page Query: {pageQuery}
          <br />
          Page Query Method: {pageAPIMethod}
          <br />
          API Response Message: {apiResponseMessage}
        </h1>

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

// GetStaticProps/Paths
export const getStaticProps: GetStaticProps = async (context) => {
  //TODO: Fetch properties for the given path from the database.
  let query = null;
  if (context.params) {
    query = context.params.componentName;
  }

  const res = await fetch(`http://localhost:3000/api/components/${query}`);
  const data = (await res.json()) as ComponentData;

  return {
    props: {
      propsData: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  //TODO: Have this find the paths of all components in api/gpu and api/cpu,
  //      and return them.
  //      Store an array of the returned JSON objects, then save an array of their
  //      IDs, and return that.
  //      Note: Maybe this could be some sort of static function, because it'll be
  //      called in other places too (getting the array of components)
  return {
    paths: [{ params: { componentName: 'Test Component 1' } }],
    fallback: false,
  };
};

// Export Functional Component
export default ComponentPage;
