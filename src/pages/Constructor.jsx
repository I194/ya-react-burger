import React from "react";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';

import { IngredientPage } from ".";

import styles from './Constructor.module.css';
import Modal from "../components/Modal/Modal";
import IngredientDetails from "../components/BurgerIngredients/IngredientDetails";

export const ConstructorPage = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const isModal = !!(
    location.state && location.state.modal && (history.action !== 'POP')
  );

  const handleCloseModal = () => {
    location.state.modal = false;
    history.push("/");
  }

  return (
    <>
      <Switch location={isModal ? {pathname: '/'} : location}>
        <Route path={`${path}`} exact>
          <DndProvider backend={HTML5Backend}>
            <div className={`${styles.containerMain}`}>
              <BurgerIngredients />
              <BurgerConstructor/>
            </div>
          </DndProvider>
        </Route>
        <Route path={`${path}ingredients/:id`}>
          <IngredientPage />
        </Route>
      </Switch>
      {
        isModal 
        ?
        <Route path={`${path}ingredients/:id`}>
          <Modal header={'Детали ингредиента'} isVisible={true} onClose={handleCloseModal} box={{w: '720px', h: '540px'}}>
            <IngredientDetails />
          </Modal>
        </Route> 
        :
        null
      }
    </>
  )
}