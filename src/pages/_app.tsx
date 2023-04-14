import { wrapper } from "@/store";
import { setIsAuth, setUserData } from "@/store/slices/userSlice";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

/*import custom pallette*/

import { IUser } from "@/models/IUser";
import { useGetUserQuery } from "@/services/authService";
import { CustomTheme } from "@/styles/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { parseCookies } from "nookies";
import { useCallback, useEffect } from "react";
import { Provider } from "react-redux";

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
