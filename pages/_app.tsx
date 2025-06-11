import React, {FC} from 'react';
// next
import Head from 'next/head';
import {AppProps} from 'next/app';
// config
import '../config/axios.config';
// styles
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import '../styles/App.scss';
import '@kenshooui/react-multi-select/dist/style.css';
// layout
import SiteLayout from 'layouts/SiteLayout';

const MyApp: FC<AppProps> = (props) => {
  const {Component, pageProps} = props;

  return (
    <>
      <Head>
        <title>AlphaStream</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ThemeProvider>
      </>
    </>
  );
};

export default MyApp;
