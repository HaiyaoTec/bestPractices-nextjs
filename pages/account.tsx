import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@/components/Link';
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "@/lib/authentication/session";
import {User} from "@/lib/example/Dto";
import Avatar from "@mui/material/Avatar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {IncomingMessage, ServerResponse} from "http";
import {NextApiRequestCookies} from "next/dist/server/api-utils";
import Layout from '@/components/Layout';
import useUser from "@/lib/authentication/useUser";

const Account: NextPage = () => {
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
          <Avatar
            src={'https://tvax1.sinaimg.cn/crop.0.0.512.512.180/006aN6cCly8g9ipkyinayj30e80e8gm6.jpg?KID=imgbed,tva&Expires=1658406913&ssig=JsCeNMAUUL'}
            sx={{
              width: 100,
              height: 100
            }}
          />
          <Typography variant="h4" component="h1" gutterBottom className={'mt-10 mb-10'}>
            {user?.userName ?? 'Guest'}
          </Typography>
          <Box maxWidth="sm">
            <Button variant="contained" component={Link} noLinkStyle href="/">
              {t('返回首页')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function (props: {
    req: IncomingMessage & {
      cookies: NextApiRequestCookies
    },
    res: ServerResponse
    locale: string
  } | any) {
    const {res, req, locale} = props
    const user = req.session.user
    if (user === undefined) {
      res.setHeader('location', '/login')
      res.statusCode = 302
      res.end()
    }
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      }
    }
  },
  sessionOptions
)

export default Account;
