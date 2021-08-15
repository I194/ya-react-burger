import React from 'react';
import logo from './logo.svg';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <body>
        <div className={'containerMain'}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </body>
    </div>
  );
}

export default App;
