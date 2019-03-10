import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { withStyles } from "@material-ui/core/styles";
import styles from "../../Styles/Materials/DashHeader";
import classNames from "classnames";
import mainList from "../../routes";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import "../../index.css";
class Navbar extends React.PureComponent {
  state = {
    open: true,
    anchorEl: null
  };

  navBarRoutes = (route, index) => {
    if (route.nav) {
      return (
        <ListItem
          key={index + 50}
          button
          onClick={() => this.redirect(route.path)}
        >
          <ListItemIcon>{route.icon ? <route.icon /> : ""}</ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItem>
      );
    }
  };

  redirect = path => this.props.history.push(path);

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  };
  editUserProfileLink = () => {
    this.props.history.push("/user/edit");
  };
  render() {
    const { classes } = this.props;

    return (
      <>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="black"
              noWrap
              className={classes.title}
            >
              DEATH PARADE
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            {"    "}Death Parade{"    "}
            <IconButton onClick={this.handleDrawerClose}>
              <MenuIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.appBarSpacer}>
            {mainList.map(this.navBarRoutes)}
          </List>
        </Drawer>
      </>
    );
  }
}
export default withStyles(styles)(Navbar);
