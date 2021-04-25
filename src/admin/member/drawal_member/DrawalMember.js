import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

import { Divider, Grid, Typography } from "@material-ui/core";
import ControlBox from "./ControlBox.js";
import TableSheet from "./TableSheet.js";
import useReactRouter from "use-react-router";
import { parseSearch, replaceQuery } from "../../services/utils.js";
import { useDispatch } from "react-redux";
import { requestGet } from "../../services/network.js";
import consts from "../../libs/consts.js";
import { popupError } from "../../redux/popup/PopupActions.js";
const useStyles = makeStyles({
  container: {
    width: "calc(100% - 200px)",
    height: "100%",
    overflow: "auto",
    paddingTop: "30px",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "50px",
  },
  container2: {
    width: "calc(100% - 200px)",
    height: "100%",
    overflow: "auto",
  },
  titleGrid: {
    height: "50px",
  },
  divider: {
    width: "100%",
    height: "3px",
    backgroundColor: "#7C7878",
    marginBottom: "20px",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default function DrawalMember() {
  const classes = useStyles();
  const { history, location } = useReactRouter();
  const data = parseSearch(location);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const fetch = () => {
    requestGet({
      url: consts.apiUrl + "/members/delete",
      query: data,
    })
      .then((x) => {
        setTotal(x.totalCount);
        setList([...x.results]);
      })
      .catch((e) => {
        dispatch(popupError(e));
      });
  };

  useEffect(() => {
    if (data.page) {
      fetch();
    }
  }, [data.page]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.titleGrid}>
          <Typography variant="h5" className={classes.bold}>
            탈퇴회원
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <ControlBox
            onSearch={() => {
              if (data.page === "1") {
                fetch();
              } else {
                replaceQuery(history, location, {
                  page: 1,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TableSheet
            setListData={setList}
            listData={list}
            length={total}
            onFetch={fetch}
            page={Math.ceil(total / parseInt(data.limit))}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
