import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import NavPanel from "../nav/NavPanel.js";
import SidePanel from "../nav/sub/SidePanel.js";
import DashboardPanel from "./sub/Dashboard.js";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default function Container() {
  const classes = useStyles();

  const [selectNavItem, setSelectNavItem] = useState("dashboard");
  const [selectMenu, setSelectMenu] = useState("current_situation");

  return (
    <Grid container className={classes.container}>
      <NavPanel setSelectNavItem={setSelectNavItem} />
      <SidePanel selectNavItem={selectNavItem} selectMenu={selectMenu} />

      {<DashboardPanel />}
    </Grid>
  );
}
