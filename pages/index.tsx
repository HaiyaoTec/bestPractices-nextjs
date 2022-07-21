import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@/components/Link';
import {NextWebVitalsMetric} from "next/app";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Layout from '@/components/Layout';
import useUser from "@/lib/authentication/useUser";

const Home: NextPage = () => {
  const {t} = useTranslation('common')
  const {user} = useUser()
  return (
    <Layout>
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
            {t('你好', {name: user?.userName??'Guest'})}
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export const getStaticProps = async (props: { locale: string }) => {
  const {locale} = props
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}


export default Home;
