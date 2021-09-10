import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ChakraProvider,
  ColorModeContext,
  ColorModeProvider,
  ColorModeOptions,
} from "@chakra-ui/react";

import { Toaster } from "react-hot-toast";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
} as ColorModeOptions;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="bottom-left" />
      <ChakraProvider>
        <ColorModeProvider options={config}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
