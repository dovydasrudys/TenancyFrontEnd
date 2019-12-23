import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux";

import { logout } from "../actions/UserActions";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';

import GavelIcon from '@material-ui/icons/Gavel';
import FaceIcon from '@material-ui/icons/Face';

import { Colors } from "../Colors";
import { Button } from 'react-bootstrap';
import GlobalSnackbar from './GlobalSnackbar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      //width: `calc(100% - ${drawerWidth}px)`,
      //marginLeft: drawerWidth,
    },
    backgroundColor: Colors.fifth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: Colors.second,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64
    },
  },
  content: {
    flexGrow: 1,
    marginTop: "16px"
  },
}));

function Page(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginLogout = () => {
    if(props.user.token){
      props.logout();
      history.push("/");
    }else{
      history.push("/login");
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
          <ListItem key="nav">
            <ListItemAvatar>
              <Avatar alt="Tenancy" src={process.env.PUBLIC_URL + '/Logo.png'}>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Navigation" />
          </ListItem>
      </List>
      <Divider/>
      <List>
          <ListItem button onClick={() => history.push("/")} key="listings">
            <ListItemIcon><GavelIcon></GavelIcon></ListItemIcon>
            <ListItemText primary="All listings" />
          </ListItem>
          <ListItem button disabled={!props.user.token} onClick={() => props.user.token ? history.push("/myhub") : null} key="my hub">
            <ListItemIcon><FaceIcon></FaceIcon></ListItemIcon>
            <ListItemText primary="My hub" />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button disabled key="messaging">
            <ListItemIcon><MessageIcon></MessageIcon></ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" style={{width: "100%"}} align="center" noWrap>
            Tenancy
          </Typography>
          <Button variant={props.user.token ? "danger" : "primary"} onClick={handleLoginLogout}>{props.user.token ? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            style={{backgroundColor: Colors.second}}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
        <GlobalSnackbar></GlobalSnackbar>
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);