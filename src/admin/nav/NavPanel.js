import React, { useState } from "react";
import useReactRouter from "use-react-router";

import { Grid, Icon, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signOut } from "../redux/user/UserActions";
import { useDispatch } from "react-redux";
const useStyles = makeStyles({
  header: {
    backgroundColor: "black",
    width: "100%",
    height: "70px",
  },
  nav: {
    display: "flex",
  },
  logoDiv: {
    width: "200px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  navItem: {
    width: "120px",
    color: "#efefef",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutDiv: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "150px",
    cursor: "pointer",
  },
  logout: {
    color: "#fff",
    marginRight: "5px",
  },
});

export default function NavPanel(props) {
  const classes = useStyles();
  const { history } = useReactRouter();
  const dispatch = useDispatch();

  const { setSelectNavItem } = props;
  const navItem = [
    {
      title: "대쉬보드",
      value: "dashboard",
    },
    {
      title: "회원관리",
      value: "member_management",
    },
  ];

  const logoutBtnClick = () => {
    dispatch(signOut);
  };

  const navItemClick = (value) => {
    setSelectNavItem(value);
    if (value === "dashboard") {
      history.push(`../${value}/current_situation`);
    } else if (value === "member_management") {
      history.push(`../${value}/customer_member`);
    }
  };

  return (
    <Grid container className={classes.header}>
      <Grid item xs={12} className={classes.nav}>
        <div className={classes.logoDiv}>LOGO</div>
        {navItem.map((item, idx) => {
          return (
            <div
              className={classes.navItem}
              key={item.value}
              onClick={() => navItemClick(item.value)}
            >
              {item.title}
            </div>
          );
        })}
        <div className={classes.logoutDiv} onClick={logoutBtnClick}>
          <Icon className={classes.logout}>exit_to_app_outlined</Icon>
          <Typography variant="subtitle1" className={classes.logout}>
            Logout
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
