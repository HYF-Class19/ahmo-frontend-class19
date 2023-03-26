import Head from 'next/head'
import MainLayout from "@/layouts/MainLayout";
import {useGetUserQuery} from "@/services/authService";
import {useEffect} from "react";

export default function Home() {
    const {data, error, isLoading} = useGetUserQuery()

    useEffect(() => {

        console.log(data)
    }, [data])

  return (
    <>
      <Head>
        <title>AHMO chat</title>
        <meta name="description" content="ahmo gaming chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <h1>Initial</h1>
      </MainLayout>
    </>
  ) 
}
