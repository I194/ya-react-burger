import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={`${styles.containerMain}`}>
          <BurgerIngredients />
          <BurgerConstructor/>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
