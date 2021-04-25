import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

export default function Loading({}) {
  const { loading } = useSelector((s) => s.loading, []);
  const classes = useStyle();

  if (!loading) {
    return null;
  }
  return (
    <div className={classes.root}>
      <CircularProgress style={{ color: "#fff" }} color="inherit" size={100} />
    </div>
  );
}

const useStyle = makeStyles({
  root: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
