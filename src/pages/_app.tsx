import { wrapper } from '@/store';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {Api} from "@/api";
import {setUserData} from "@/store/slices/userSlice";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

/*import custom pallette*/
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { dark, light } from '@mui/material/styles/createPalette';


const darkTheme = createTheme ({
    palette: {
        primary: {
            main: '#000000',
            light: '#0E1014',
            dark: '#1A1E28',
            contrastText: '#F3FB8C'
        },
        secondary: {
            main: '#F3FB8C',
            light: '#f7fcac',
            dark: '#dbe096',
            contrastText: '#ffffff'
        }
    }
})

function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
    </ThemeProvider>
    )
}

App.getInitialProps = wrapper.getInitialAppProps(
    (store) =>
        async ({ctx, Component}) => {
            try {
                const userData = await Api(ctx).user.getMe();
                store.dispatch(setUserData(userData));
            } catch (err) {
                if (ctx.asPath === '/write') {
                    ctx.res?.writeHead(302, {
                        location: '/403',
                    });
                    ctx.res?.end();
                }
                console.log(err);
            }
            return {
                pageProps: {
                    ...(Component.getInitialProps
                        ? await Component.getInitialProps({...ctx, store})
                        : {}),
                },
            };
        }
);

export default wrapper.withRedux(App);