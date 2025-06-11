import React from 'react';
// components
import {SignInForm} from 'components/forms';
// material ui
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '50px',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 425,
    },
    input: {
      width: '100%',
    },
    signinBtn: {
      marginTop: '15px',
    },
    label: {
      fontSize: '14px',
      color: '#111111',
    },
    forgetPassword: {
      color: '#0091FF',
      fontSize: '12px',
      float: 'right',
    },
  })
);

function SignIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SignInForm />
    </div>
  );
}
export default SignIn;
