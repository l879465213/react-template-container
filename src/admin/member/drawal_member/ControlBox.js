import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import {
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Button,
  TableCell,
  TextField,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { parseSearch, replaceQuery } from "../../services/utils";
import { withRouter } from "react-router";
import consts from "../../libs/consts";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#F0F0F0",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "10px",
    border: "1px solid #B7ACAC",
    marginBottom: "70px",
  },
  divider: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    marginLeft: "30px",
  },
  controlGrid: {
    border: "2px solid #e9e9e9",
  },
  firstGrid: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "50px",
  },
  secondGrid: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "50px",
  },
  thirdGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  radioBtn: {
    marginLeft: "30px",
  },
  initializationBtn: {
    width: "120px",
    backgroundColor: "#fff",
    border: "1px solid #e9e9e9",
    borderRadius: 0,
  },
  searchBtn: {
    width: "120px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  dateGrid: {
    display: "flex",
    justifyContent: "flex-start",
  },
  searchGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  searchBox: {
    "& input": {
      backgroundColor: "#fff",
    },
  },
  dfsc: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  textField: {
    marginLeft: "40px",
    "& div": {
      backgroundColor: "#fff",
    },
  },
  select: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default withRouter(function ControlBox({ onSearch, history, location }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = parseSearch(location);

  const handleRadioBtn = (e) => {
    replaceQuery(history, location, {
      type: e.target.value,
    });
  };

  const handlePrevDate = (e) => {
    replaceQuery(history, location, {
      start: e.target.value,
    });
  };

  const handleNextDate = (e) => {
    replaceQuery(history, location, {
      end: e.target.value,
    });
  };
  const handleDrawalPrevDate = (e) => {
    replaceQuery(history, location, {
      start2: e.target.value,
    });
  };

  const handleDrawalNextDate = (e) => {
    replaceQuery(history, location, {
      end2: e.target.value,
    });
  };

  const handleSearchQuery = (e) => {
    replaceQuery(history, location, {
      keyword: e.target.value,
    });
  };

  const onClickInitialBtn = () => {
    replaceQuery(history, location, {
      ...consts.defaultQuery,
      type: "",
      start: "",
      end: "",
      start2: "",
      end2: "",
      keyword: "",
    });
  };

  const onClickSearchBtn = () => {
    onSearch();
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.firstGrid}>
        <Grid item xs={6} className={classes.dateGrid}>
          <Typography variant="subtitle1" className={classes.text}>
            가입일
          </Typography>
          <input
            type="date"
            value={data.start}
            onChange={handlePrevDate}
            style={{ marginLeft: "40px" }}
          />
          <span> ~ </span>
          <input type="date" value={data.end} onChange={handleNextDate} />
        </Grid>
        <Grid item xs={6} className={classes.dateGrid}>
          <Typography variant="subtitle1">가입일</Typography>
          <input
            type="date"
            value={data.start2}
            onChange={handleDrawalPrevDate}
            style={{ marginLeft: "40px" }}
          />
          <span> ~ </span>
          <input
            type="date"
            value={data.end2}
            onChange={handleDrawalNextDate}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid item xs={12} className={classes.secondGrid}>
        <Grid item xs={6} className={classes.dfsc}>
          <Typography variant="subtitle1" className={classes.text}>
            회원구분
          </Typography>
          <FormControlLabel
            control={
              <Radio
                color="default"
                className={classes.radioBtn}
                checked={data.type === "" || !data.type}
                onChange={handleRadioBtn}
                value=""
              />
            }
            label="전체"
            labelPlacement="end"
          />
          <FormControlLabel
            control={
              <Radio
                color="default"
                className={classes.radioBtn}
                checked={data.type === "user"}
                onChange={handleRadioBtn}
                value="user"
              />
            }
            label="일반회원"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs={6} className={classes.searchGrid}>
          <Typography variant="subtitle1" style={{ minWidth: "50px" }}>
            검색
          </Typography>
          <TextField
            style={{ marginLeft: "40px" }}
            className={classes.searchBox}
            variant="outlined"
            size="small"
            placeholder="이름, 이메일(ID), 휴대폰번호"
            fullWidth
            value={data.keyword}
            onChange={handleSearchQuery}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid item xs={12} className={classes.thirdGrid}>
        <Button
          variant="contained"
          className={classes.initializationBtn}
          onClick={onClickInitialBtn}
        >
          <Typography variant="subtitle1">초기화</Typography>
        </Button>
        <Button
          variant="contained"
          className={classes.searchBtn}
          onClick={onClickSearchBtn}
          style={{ marginLeft: "20px" }}
        >
          <Typography variant="subtitle1">검색</Typography>
        </Button>
      </Grid>
    </Grid>
  );
});
