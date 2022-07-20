import * as React from 'react';
import type {NextPage} from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@/components/Link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const About: NextPage = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  const {defaultLocale, locale, locales} = router
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ENV)
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <Box maxWidth="sm" className='mt-4'>
          <Button variant="contained" onClick={handleClickOpen}>
            dig
          </Button>
        </Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <ul>
              <ul>{defaultLocale}</ul>
              <ul>{locale}</ul>
              <ul>{locales}</ul>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
        <ProTip/>
        <Copyright/>
      </Box>
    </Container>
  );
};

export default About;
