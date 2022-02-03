import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

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
const ComponentPage : NextPage<ComponentDataProps> = ({propsData}) => {

    // Gets the API data
    const pageQuery = propsData.reqQuery;
    const pageAPIMethod = propsData.reqMethod;
    const apiResponseMessage = propsData.reqMessage;

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
                Page Query: {pageQuery}<br/>
                Page Query Method: {pageAPIMethod}<br/>
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
}


// GetStaticProps
export const getServerSideProps : GetServerSideProps = async(context) => {
    const query  = context.params;
    const res = await fetch(`http://localhost:3000/api/components/${query}`);
    const data = (await res.json()) as ComponentData;

    return {
        props: { 
            propsData: data
        }
    };
};


// Export Functional Component
export default ComponentPage;
