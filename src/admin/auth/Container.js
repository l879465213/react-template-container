import React, { useState } from "react";
import useReactRouter from "use-react-router";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  TextField,
  Icon,
  Button,
  Typography,
} from "@material-ui/core";
import { signIn } from "../redux/user/UserActions";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  paper: {
    width: "300px",
    height: "200px",
  },
  input: {
    marginTop: "10px",
    marginBottom: "30px",
  },
  icon: {
    marginRight: "10px",
  },
  loginBtn: {
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
});

export default function Container() {
  const classes = useStyles();
  const { history } = useReactRouter();

  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  const handleChangeId = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLoginBtn = async () => {
    dispatch(signIn(username, password));
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.grid}>
        {/* 로고위치 Div */}
        {
          // <div style={{ position: "relative", bottom: "100px" }}>LOGO</div>
        }
        <Paper elevation={0} className={classes.paper}>
          <form>
            <TextField
              fullWidth
              value={username}
              onChange={handleChangeId}
              placeholder="아이디"
              InputProps={{
                startAdornment: (
                  <Icon className={classes.icon}>account_circle_outlined</Icon>
                ),
              }}
            />
            <TextField
              className={classes.input}
              fullWidth
              value={password}
              onChange={handleChangePassword}
              type="password"
              placeholder="비밀번호"
              InputProps={{
                startAdornment: (
                  <Icon className={classes.icon}>lock_outlined</Icon>
                ),
              }}
              autoComplete="current-password"
            />
          </form>
          <Button
            variant="contained"
            size="large"
            fullWidth
            className={classes.loginBtn}
            onClick={onClickLoginBtn}
          >
            <Typography variant="subtitle1">로그인</Typography>
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
