import React, { useState, useEffect } from "react";
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
  TableCell,
  TextField,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import ChartPanel from "./ChartPanel";
import Member from "./Member";
import Delivery from "./Delivery";
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

export default function Container() {
  const classes = useStyles();
  const [ds, setDs] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    requestGet({ url: consts.apiUrl + "/distributions" })
      .then((x) => {
        setDs([...x.results]);
      })
      .catch((x) => {
        dispatch(popupError(x));
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

  const [deliveryPrevDate, setDeliveryPrevDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [deliveryNextDate, setDeliveryNextDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [orderPrevDate, setOrderPrevDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );
  const [orderNextDate, setOrderNextDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [salesPrevDate, setSalesPrevDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );
  const [salesNextDate, setSalesNextDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [tableDeliveryPrevDate, setTableDeliveryPrevDate] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );
  const [tableDeliveryNextDate, setTableDeliveryNextDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [salesSelectValue, setSalesSelectValue] = useState("item1");
  const [radioSelectValue, setRadioSelectValue] = useState("delivery_count");

  const [distributor, setDistributor] = useState("전체");
  const [order, setOrder] = useState("일반");

  const handleDliveryPrevDate = (e) => {
    setDeliveryPrevDate(e.target.value);
  };

  const handleDliveryNextDate = (e) => {
    setDeliveryNextDate(e.target.value);
  };

  const handleOrderPrevDate = (e) => {
    setOrderPrevDate(e.target.value);
  };

  const handleOrderNextDate = (e) => {
    setOrderNextDate(e.target.value);
  };

  const handleSalesPrevDate = (e) => {
    setSalesPrevDate(e.target.value);
  };

  const handleSalesNextDate = (e) => {
    setSalesNextDate(e.target.value);
  };

  const handleDistributor = (e) => {
    setDistributor(e.target.value);
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        {/* 대분류 */}
        <Grid item xs={12} className={classes.titleGrid}>
          <Typography variant="h5" className={classes.bold}>
            현황
          </Typography>
        </Grid>

        <Divider className={classes.divider} />
        <Member />
      </Grid>
    </Grid>
  );
}
