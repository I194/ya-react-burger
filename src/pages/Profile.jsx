import React from "react";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import Profile from "../components/Profile/Profile";
import OrderDetails from "../components/Feed/OrderDetails";
import Modal from "../components/Modal/Modal";
import { OrderPage } from ".";

export const ProfilePage = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const isModal = !!(
    location.state && location.state.modal && (history.action !== 'POP')
  );

  const handleCloseModal = () => {
    location.state.modal = false;
    history.push(`${path}/orders`);
  }
  
  const orders = location.state ? location.state.orders : [];
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
          <OrderPage orders={orders}/>
        </Route>
      </Switch>
      {
        isModal 
        ?
        <Route path={`${path}/:id`}>
          <Modal 
            header={`#${location.state._id}`} 
            headerClass={'text text_type_digits-default'} 
            isVisible={true} 
            onClose={handleCloseModal} 
            box={{w: '720px', h: '720px'}}
          >
            <OrderDetails _id={location.state._id} orders={orders}/>
          </Modal>
        </Route> 
        :
        null
      }
    </>
  );
}