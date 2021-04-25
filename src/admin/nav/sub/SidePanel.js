/* eslint-disable multiline-ternary */
import React, { useState, useRef } from "react";
import useReactRouter from "use-react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  sidePanel: {
    width: "200px",
    height: "100%",
    backgroundColor: "#000",
  },
  sideItem: {
    paddingLeft: "20px",
    display: "flex",
    alignItems: "center",
    height: "50px",
    cursor: "pointer",
  },
  sideItemText: {
    color: "#fff",
  },
});

export default function SidePanel(props) {
  const classes = useStyles();
  const { history, location } = useReactRouter();
  const { selectNavItem, selectMenu } = props;

  const dashboardArr = [
    {
      title: "현황",
      value: "current_situation",
    },
  ];
  const memberArr = [
    {
      title: "고객회원",
      value: "customer_member",
    },
    {
      title: "탈퇴회원",
      value: "withdrawal_member",
    },
  ];

  const onClickMenu = (navItem, value, idx) => {
    if (
      location.pathname.split("?")[0] ===
      (navItem === "sales_details" ? `/${navItem}/` : `/${navItem}/${value}`)
    ) {
      return;
    }

    if (navItem === "sales_details") {
      history.push(`/${navItem}/`);
    } else {
      history.push(`/${navItem}/${value}`);
    }
  };

  return (
    <Grid container className={classes.sidePanel}>
      <Grid item xs={12}>
        {selectNavItem === "dashboard" ? (
          dashboardArr.map((item, idx) => {
            return (
              <div
                className={classes.sideItem}
                onClick={() => onClickMenu(selectNavItem, item.value, idx)}
                key={item.value}
                style={
                  selectMenu === dashboardArr[idx].value
                    ? { backgroundColor: "#615A5A" }
                    : null
                }
              >
                <Typography
                  variant="subtitle1"
                  className={classes.sideItemText}
                >
                  {item.title}
                </Typography>
              </div>
            );
          })
        )  : selectNavItem === "member_management" ? (
          memberArr.map((item, idx) => {
            return (
              <div
                className={classes.sideItem}
                onClick={() => onClickMenu(selectNavItem, item.value, idx)}
                key={item.value}
                style={
                  selectMenu === memberArr[idx].value
                    ? { backgroundColor: "#615A5A" }
                    : null
                }
              >
                <Typography
                  variant="subtitle1"
                  className={classes.sideItemText}
                >
                  {item.title}
                </Typography>
              </div>
            );
          })
        ) : (
          <div> 데이터가 없습니다.</div>
        )}
      </Grid>
    </Grid>
  );
}
