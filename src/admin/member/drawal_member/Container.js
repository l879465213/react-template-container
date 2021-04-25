/* eslint-disable multiline-ternary */

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import NavPanel from "../../nav/NavPanel.js";
import SidePanel from "../../nav/sub/SidePanel.js";
import DrawalMember from "./DrawalMember.js";
import React, { useEffect, useState } from "react";

import consts from "../../libs/consts.js";
import { replaceQuery } from "../../services/utils.js";
const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default function Container({ history, location }) {
  const classes = useStyles();

  const [selectNavItem, setSelectNavItem] = useState("member_management");
  const [selectMenu, setSelectMenu] = useState("withdrawal_member");
  useEffect(() => {
    if (history.action === "PUSH") {
      replaceQuery(history, location, consts.defaultQuery);
    }
  });
  return (
    <Grid container className={classes.container}>
      <NavPanel setSelectNavItem={setSelectNavItem} />
      <SidePanel selectNavItem={selectNavItem} selectMenu={selectMenu} />
      {<DrawalMember />}
    </Grid>
  );
}
