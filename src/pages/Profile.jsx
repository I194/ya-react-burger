import React from "react";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import Profile from "../components/Profile/Profile";
import OrderDetails from "../components/Feed/OrderDetails";

export const ProfilePage = () => {
  const { path } = useRouteMatch();
  
  return (
    <>
      <Switch>
        <Route path={`${path}`} exact>
          <Profile path={path}/>
        </Route>
        <Route path={`${path}/orders`} exact>
          <Profile path={path}/>
        </Route>
        <Route path={`${path}/orders/:id`} exact>
          <OrderDetails />
        </Route>
      </Switch>
    </>
  );
}