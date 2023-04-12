import { wrapper } from '@/store';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {setUserData} from "@/store/slices/userSlice";

/*import custom pallette*/
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux';
import { CacheProvider,} from '@emotion/react';
import createCache from '@emotion/cache';
import { useEffect } from 'react';
import { useGetUserQuery } from '@/services/authService';
import { CustomTheme } from '@/styles/theme';



const cache = createCache({ key: 'myapp' });

function MyApp({ Component, ...rest }: AppProps) {
    const {store, props} = wrapper.useWrappedStore(rest);
    const {data: user, isLoading, error} = useGetUserQuery()

    useEffect(() => {
        if(user) {
            store.dispatch(setUserData(user));
        }
    }, [user]);
  
    return (
      <Provider store={store}>
        <CacheProvider value={cache}>
          <ThemeProvider theme={CustomTheme}>
          {isLoading && <div>Loading...</div>}
            {!isLoading && <Component {...props.pageProps} />}
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    );
  }

  export default wrapper.withRedux(MyApp);