import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';

import styles from './Constructor.module.css';

// interface ILocation extends ILocationState, Location {};

export const ConstructorPage = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact>
          <DndProvider backend={HTML5Backend}>
            <div className={`${styles.containerMain}`}>
              <BurgerIngredients />
              <BurgerConstructor/>
            </div>
          </DndProvider>
        </Route>
      </Switch>
    </>
  )
}