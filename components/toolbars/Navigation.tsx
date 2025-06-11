import React, {FC} from 'react';
import Link from 'next/link';
// material ui
import {makeStyles, AppBar, Toolbar, IconButton} from '@material-ui/core';
// icons
import {Menu as MenuIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavigationBar: FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar style={{background: 'linear-gradient(180deg, #0B488F 0%, #0A376C 100%)'}}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Link href={'/dashboard'}>
          <a>
            {/* <img
                src="https://raw.githubusercontent.com/soulpage/image-assets/master/factsream_logo.JPG"
                className="logo"
              ></img> */}
            <h3 style={{color: '#fff'}}>AlphaStream</h3>
          </a>
        </Link>
        {/* <Button color="inherit">Login</Button>
        <Button color="inherit">Register</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
