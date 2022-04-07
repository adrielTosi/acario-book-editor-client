import "../styles/index.scss";

import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import { GlobalStyle } from "styles/global";
import { Navbar } from "components/Navbar";
import { Box } from "components/ui/Box";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Box paddingTop="2em">
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}
export default MyApp;
