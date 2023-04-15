import { wrapper } from "@/store";
import { setIsAuth, setUserData } from "@/store/slices/userSlice";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

/*import custom pallette*/

import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { CacheProvider,} from '@emotion/react';
import createCache from '@emotion/cache';
import { useCallback, useEffect } from 'react';
import { useGetUserQuery } from '@/services/authService';
import { CustomTheme } from '@/styles/theme';
import { IUser } from "@/models/IUser";
import { parseCookies } from "nookies";

const cache = createCache({ key: "myapp" });

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { data: user, isLoading, error } = useGetUserQuery();

  const setIsAuthCallback = useCallback(
    (isAuth: boolean) => {
      store.dispatch(setIsAuth(isAuth));
    },
    [store]
  );

  const setUserDataCallback = useCallback(
    (userData: IUser) => {
      store.dispatch(setUserData(userData));
    },
    [store]
  );

  useEffect(() => {
    const { authToken } = parseCookies();
    if (authToken) {
      setIsAuthCallback(true);
    } else {
      setIsAuthCallback(false);
    }
  }, [setIsAuthCallback]);

  useEffect(() => {
    if (user) {
      setUserDataCallback(user);
    }
  }, [user, setUserDataCallback]);

  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={CustomTheme}>
          <Component {...props.pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
