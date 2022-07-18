import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
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
        <Box maxWidth="sm" className='mt-[10px]'>
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
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default About;
