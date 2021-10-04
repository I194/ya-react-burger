import React from "react";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import Feed from "../components/Feed/Feed";
import OrderDetails from "../components/Feed/OrderDetails";

export const FeedPage = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact>
          <Feed />
        </Route>
        <Route path={`${path}/:id`}>
          <OrderDetails />
        </Route>
      </Switch>
    </>
  );
}