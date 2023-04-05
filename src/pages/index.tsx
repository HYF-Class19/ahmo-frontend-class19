import Head from 'next/head'
import MainLayout from "@/layouts/MainLayout";
import styles from '../styles/Main.module.scss'
import ActionAreaCard from '@/components/card';
import WelcomeText from '@/components/welcome-text';

export default function Home() {

  return (
    <>
      <Head>
        <title>AHMO chat</title>
        <meta name="description" content="ahmo gaming chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <WelcomeText />
        <ActionAreaCard />
      </MainLayout>
    </>
  ) 
}
