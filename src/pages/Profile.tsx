import React from "react";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import Profile from "../components/Profile/Profile";
import { OrderPage } from ".";
import { ILocationState } from "../services/types/components";

export const ProfilePage = () => {
  const { path } = useRouteMatch();
  const location: any = useLocation<ILocationState>();
  const history = useHistory();

  const isModal = !!(
    location.state && location.state.modal && (history.action !== 'POP')
  );
  
  const orders = location.state ? location.state.orders : [];
  const number = location.state ? location.state.number : undefined;
  return (
    <>
      <Switch location={isModal ? {pathname: path} : location}>
        <Route path={`${path}`} exact>
          <Profile path={path}/>
        </Route>
        <Route path={`${path}/orders`} exact>
          <Profile path={path}/>
        </Route>
        <Route path={`${path}/orders/:id`} exact>
          <OrderPage orders={orders} number={number}/>
        </Route>
      </Switch>
    </>
  );
}