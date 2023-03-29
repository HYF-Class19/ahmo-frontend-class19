import { wrapper } from '@/store';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {Api} from "@/api";
import {setUserData} from "@/store/slices/userSlice";
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useEffect } from 'react';
import { useGetUserQuery } from '@/services/authService';

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
            {isLoading && <div>Loading...</div>}
            {user && <Component {...props} />}
        </CacheProvider>
      </Provider>
    );
  }

  export default wrapper.withRedux(MyApp);