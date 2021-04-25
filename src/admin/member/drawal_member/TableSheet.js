/* eslint-disable no-unreachable-loop */
import React, { useEffect, useState, useRef } from "react";
import useReactRouter from "use-react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  formatPhoneNumber,
  formatTime,
  parseSearch,
  replaceQuery,
} from "../../services/utils";
import {
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  CardMedia,
  Dialog,
  Slide,
  Icon,
  IconButton,
  Button,
  TableCell,
  TextField,
  Radio,
  FormControlLabel,
  Paper,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "50%",
    marginBottom: "50px",
  },
  bold: {
    fontWeight: "bold",
  },
  titleGrid: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  searchResultCountText: {
    color: "red",
    fontWeight: "bold",
  },
  tableCell: {
    textAlign: "center",
    border: "2px solid #B7ACAC",
  },
  detailCell: {
    cursor: "pointer",
    textDecoration: "underline",
  },
});

export default function TableSheet({ listData, length, page }) {
  const classes = useStyles();
  const { history, location, match } = useReactRouter();
  const query = parseSearch(location);

  const onClickRow = (col) => {
    if (col.type === "user") {
      history.push("/member_management/customer_member_detail", {
        userId: col.userId,
      });
    }
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.titleGrid}>
        <Typography variant="h6" className={classes.bold}>
          목록
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ marginLeft: "30px", marginRight: "5px" }}
        >
          검색결과
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.searchResultCountText}
        >
          {length}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#e9e9e9" }}>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">NO</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">가입일시</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">회원구분</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">이름</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">이메일/아이디</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">휴대폰번호</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">탈퇴일시</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.map((col, idx) => {
              return (
                <TableRow
                  key={idx}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onClickRow(col);
                  }}
                >
                  <TableCell className={classes.tableCell}>
                    {length -
                      (idx + 1) +
                      1 -
                      (parseInt(query.page) - 1) * parseInt(query.limit)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatTime(col.createdAt, "YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {col.type}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {col.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {col.username}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatPhoneNumber(col.phone)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {col.carNumber}
                  </TableCell>
                  <TableCell key={idx} className={classes.tableCell}>
                    {formatTime(col.deletedAt, "YYYY-MM-DD HH:mm")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            variant="outlined"
            shape="rounded"
            count={page}
            page={parseInt(query.page)}
            onChange={(e, p) => {
              replaceQuery(history, location, { page: p });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
