import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import fetchJson from "@/lib/fetch/fetchJson";
import {IncomingMessage, ServerResponse} from "http";
import {NextApiRequestCookies} from "next/dist/server/api-utils";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {SnackbarProvider, useSnackbar} from 'notistack';
import useStore from "@/store/index";
import {User} from "@/lib/example/Dto";

function SignIn() {
  const {useUserStore:user} = useStore()
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    user.updateUserInfo(await fetchJson<User>('/api/user/login', {
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
      method: 'post',
    }))
    router.push('/')
  };
  const {enqueueSnackbar} = useSnackbar();
  useEffect(() => {
    user?.userInfo.isLoggedIn && enqueueSnackbar('已登陆')
  }, [])

  const {t} = useTranslation('common')
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('登录')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("邮箱地址")}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("密码")}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            {t('登录')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export const getStaticProps = async function (props: {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
  locale: string
} | any) {
  const {locale} = props
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}
export default function Login() {
  return <SnackbarProvider maxSnack={3}><SignIn/></SnackbarProvider>
}
