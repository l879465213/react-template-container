import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import ChartPanel from "./ChartPanel";
import { requestGet } from "../../services/network";
import consts from "../../libs/consts";
import { useDispatch } from "react-redux";
import { popupError } from "../../redux/popup/PopupActions";

const useStyles = makeStyles({
  container: {
    width: "calc(100% - 200px)",
    height: "100%",
    overflow: "auto",
    paddingTop: "30px",
    paddingLeft: "30px",
    paddingBottom: "50px",
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
  dashboardItem: {
    marginBottom: "30px",
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
    wordBreak: "break-all",
  },
  dateRowGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "30px",
  },
  tableGrid: {
    marginTop: "10px",
    textAlign: "center",
  },
  tableCell: {
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "2px solid #000",
    borderCollapse: "separate",
  },
  salesSelectGrid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  companySelect: {
    width: "150px",
    textAlign: "center",
  },
  radioForm: {
    display: "flex",
    justifyContent: "flex-end",
  },
  radioBtn: {
    marginLeft: "30px",
  },
  carInfoGrid: {
    display: "flex",
  },
  carInfoSubGrid: {
    display: "flex",
    height: "100px",
    justifyContent: "flex-start",
    alignItems: "space-around",
    textAlign: "center",
  },
  carInfoSubCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70px",
  },
  df: {
    display: "flex",
  },
  dfsc: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  dfcc: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dfcs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  dffec: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  box: {
    border: "2px solid #656565",
    display: "flex",
    flexDirection: "column",
    width: "200px",
    height: "200px",
    "&+&": {
      marginLeft: "20px",
    },
  },
  boxHeader: {
    height: "50px",
    borderBottom: "2px solid #656565",
  },
  boxContent: {
    backgroundColor: "#BABABA",
  },
  selectForm: {
    cursor: "pointer",
    paddingLeft: "5px",
    paddingTop: "5px",
    paddingBottom: "5px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0, 0.1)",
    },
  },
});

export default function Member() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    activeDriver: 0,
    activeUser: 0,
    exitDriver: 0,
    exitUser: 0,
    todayDriver: 0,
    todayUser: 0,
  });
  useEffect(() => {
    requestGet({ url: consts.apiUrl + "/admins/dashboard/member" })
      .then((x) => {
        setData({ ...x });
      })
      .catch((e) => {
        popupError(e);
      });
  }, []);

  const fakeDataArr = (length) => {
    const itemArr = [];
    let item;
    for (let i = 0; i < length; i++) {
      item = {
        name: "item" + (i + 1),
        value: parseInt(Math.random() * 100 + 1),
      };
      itemArr.push(item);
    }
    return itemArr;
  };

  return (
    <Grid
      item
      xs={12}
      className={[classes.dashboardItem, classes.carInfoGrid].join(" ")}
    >
      <Grid item xs={4}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.bold}>
            고객회원
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  style={{
                    padding: "10px",
                    minWidth: "100px",
                    backgroundColor: "#e9e9e9",
                  }}
                >
                  오늘가입
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{
                    padding: "10px",
                    minWidth: "100px",
                    backgroundColor: "#e9e9e9",
                  }}
                >
                  전체
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{
                    padding: "10px",
                    minWidth: "100px",
                    backgroundColor: "#e9e9e9",
                  }}
                >
                  탈퇴
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  style={{ minWidth: "100px" }}
                >
                  {data.todayUser}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ minWidth: "100px" }}
                >
                  {data.activeUser}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ minWidth: "100px" }}
                >
                  {data.exitUser}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Grid>
  );
}
