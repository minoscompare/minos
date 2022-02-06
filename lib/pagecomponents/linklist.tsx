import React from 'react';
import Link from 'next/link'
import styles from '@minos/ui/styles/Home.module.css';

export interface ListItem {
  name: string;
  url: string;
}

interface ComponentProps {
  listItems: ListItem[];
}

function LinkList (props: ComponentProps)
{
  return (
    <ul>
      {props.listItems.map((item) => {
        return (<li key = {item.url}><Link href={item.url}><a>{item.name}</a></Link></li>);
      })}
    </ul>
  );
}

export default LinkList;