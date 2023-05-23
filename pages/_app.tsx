import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { lightTheme, darkTheme } from "@/themes";
import { UIProvider } from "../context/ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  );
}
