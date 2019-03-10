import React from "react";
import styles from "../Styles/Materials/DashHeader";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "./Navigation/Navbar";

const Navigation = props => {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <Navbar {...props} />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </div>
    </div>
  );
};

export default withStyles(styles)(Navigation);
