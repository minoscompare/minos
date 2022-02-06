import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@minos/ui/styles/Home.module.css';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import LinkList from '@minos/lib/pagecomponents/linklist';
import {ListItem} from '@minos/lib/pagecomponents/linklist';
import prisma from '@minos/lib/prisma';



// Props interface
interface PageProps {
  componentLinks: ListItem[];
}

// Main page function
const ComponentSearch: NextPage<PageProps> = (props: PageProps) => {
  //TODO: For testing, add an auto-generated list of all the components that link to their respective components pages.
  
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
          <Link href="/">
            <a>Return to Home</a>
          </Link>
          <br /> 
        </p>
        <p className={styles.code}>
          Select from following list:
          <LinkList listItems={props.componentLinks}/>
        </p>
      </main>
    </div>
  );
};


// GetStaticProps to get the list of components before building the page
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cpus = await prisma.cpu.findMany({ take: 100, select: { id: true, name: true, brand: true } });
  let components : ListItem[] = [];
  
  for(let i = 0; i < cpus.length; i++)
  {
    components.push({name: cpus[i].brand + " " + cpus[i].name, url: "/cpu/"+cpus[i].id});
  }

  return {props: {componentLinks: components}};

}


// Exports the page function
export default ComponentSearch;
