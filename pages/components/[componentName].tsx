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
const ComponentPage : NextPage<ComponentDataProps> = ({propsData}) => {

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


// GetStaticProps/Paths
export const getStaticProps : GetStaticProps = async(context) => {
    let query = null
    if(context.params) 
    {
        query = context.params.componentName;
    }

    const res = await fetch(`http://localhost:3000/api/components/${query}`);
    const data = (await res.json()) as ComponentData;

    return {
        props: { 
            propsData: data
        }
    };
};

export const getStaticPaths : GetStaticPaths = async () => {
    
    // Note: This currently returns a preset list of paths.
    //       In the future, have it get the list of paths from the database.
    return {
        paths: 
        [
            { params:  { componentName: "Test Component 1"} },
        ],
    fallback: false
  };
}


// Export Functional Component
export default ComponentPage;
