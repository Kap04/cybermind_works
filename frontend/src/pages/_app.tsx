import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/notifications/styles.css';
import "../theme/theme";
import type { AppProps } from 'next/app';
import theme from '../theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="light"
      withCssVariables
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
