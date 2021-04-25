import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import SignInContainer from "./admin/auth/Container.js";
import DashboardContainer from "./admin/dashboard/Container.js";


import CustomerMemberContainer from "./admin/member/customer_member/Container.js";
import WithDrawalMemberContainer from "./admin/member/drawal_member/Container.js";

import { useDispatch, useSelector } from "react-redux";
import { initUser } from "./admin/redux/user/UserActions.js";
import { useEffect } from "react";

import Loading from "./admin/redux-components/loading/Loading.js";
import Popup from "./admin/redux-components/popup/Popup.js";

function App() {
  const dispatch = useDispatch();
  const { init, signed } = useSelector((s) => s.user, []);

  useEffect(() => {
    dispatch(initUser);
  }, []);

  if (!init) {
    return null;
  }

  return (
    <>
      <Loading />
      <Popup />
      <BrowserRouter>
        {signed ? (
          <Switch>
            <Route exact path={"/signin"} component={SignInContainer} />
            <Redirect to="/signin" />
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path={"/dashboard/current_situation"}
              component={DashboardContainer}
            />
            <Route
              exact
              path={"/delivery_management/order_search"}
              component={OrderSearchContainer}
            />
            <Route
              exact
              path={"/member_management/customer_member"}
              component={CustomerMemberContainer}
            />
            <Route
              exact
              path={"/member_management/withdrawal_member"}
              component={WithDrawalMemberContainer}
            />
            <Redirect to={"/dashboard/current_situation"} />
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
