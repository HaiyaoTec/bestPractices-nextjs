import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '@/lib/mui/theme';
import createEmotionCache from '@/lib/mui/createEmotionCache';
import '@/styles/globals.css'
import ErrorBoundary from "@/components/ErrorBoundary";
import fetchJson from '@/lib/fetch/fetchJson'

import {SWRConfig} from 'swr'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
import {appWithTranslation} from 'next-i18next'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const swrError = (err: Error) => {
    console.log(err)
  }
  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline/>
          <SWRConfig value={{
            fetcher: fetchJson,
            onError: swrError,
          }}>
            <Component {...pageProps} />
          </SWRConfig>
        </ThemeProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
