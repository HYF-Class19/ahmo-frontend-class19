import { wrapper } from '@/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Api} from "@/api";
import {setUserData} from "@/store/slices/userSlice";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

function App({ Component, pageProps }: AppProps) {

  return (
      <Component {...pageProps} />
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req }: GetServerSidePropsContext) => {
        console.log("req:", req)
            try {
                const userData = await Api(req).user.getMe();
                store.dispatch(setUserData(userData));
            } catch (err) {
                console.log(err);
            }
            return {
                props: {},
            };
        }
);

export default wrapper.withRedux(App);