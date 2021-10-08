import React from "react";
import { Route, Switch, useHistory, useRouteMatch, useLocation, useParams } from 'react-router-dom';
import Feed from "../components/Feed/Feed";
import OrderDetails from "../components/Feed/OrderDetails";
import Modal from "../components/Modal/Modal";
import { OrderPage } from ".";

export const FeedPage = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const isModal = !!(
    location.state && location.state.modal && (history.action !== 'POP')
  );

  const handleCloseModal = () => {
    location.state.modal = false;
    history.push(path);
  }

  return (
    <>
      <Switch location={isModal ? {pathname: path} : location}>
        <Route path={`${path}`} exact>
          <Feed path={path}/>
        </Route>
        <Route path={`${path}/:id`}>
          <OrderPage />
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
            <OrderDetails />
          </Modal>
        </Route> 
        :
        null
      }
    </>
  );
}