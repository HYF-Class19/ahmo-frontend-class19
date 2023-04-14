import { wrapper } from "@/store";
import { setIsAuth, setUserData } from "@/store/slices/userSlice";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

/*import custom pallette*/

import { useGetUserQuery } from "@/services/authService";
import { CustomTheme } from "@/styles/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Provider } from "react-redux";

const cache = createCache({ key: "myapp" });

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { data: user, isLoading, error } = useGetUserQuery();

  useEffect(() => {
    const { authToken } = parseCookies();
    if (authToken) {
      store.dispatch(setIsAuth(true));
    } else {
      store.dispatch(setIsAuth(false));
    }
  }, []);

  useEffect(() => {
    if (user) {
      store.dispatch(setUserData(user));
    }
  }, [user]);

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
