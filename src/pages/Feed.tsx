import React from "react";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import Feed from "../components/Feed/Feed";
import OrderDetails from "../components/Feed/OrderDetails";
import Modal from "../components/Modal/Modal";
import { OrderPage } from ".";
import { ILocationState } from "../services/types/components";

export const FeedPage = () => {
  const { path } = useRouteMatch();
  const location: any = useLocation<ILocationState>();
  const history = useHistory();

  const isModal = !!(
    location.state && location.state.modal && (history.action !== 'POP')
  );

  const handleCloseModal = () => {
    location.state.modal = false;
    history.push(path);
  }
  
  const orders = location.state ? location.state.orders : [];
  return (
    <>
      <Switch location={isModal ? {pathname: path} : location}>
        <Route path={`${path}`} exact>
          <Feed path={path}/>
        </Route>
        <Route path={`${path}/:id`}>
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