import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@/components/Link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import {NextWebVitalsMetric} from "next/app";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useEffect} from "react";

const Home: NextPage = () => {
  const {t} = useTranslation('common')
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t('hello')}
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip/>
        <Copyright/>
      </Box>
    </Container>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export const getStaticProps = async (props: { locale: string }) => {
  const {locale} = props
  console.log(process.env.SECRET_COOKIE_PASSWORD)
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}



export default Home;
