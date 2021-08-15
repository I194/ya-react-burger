import React from 'react';
import logo from './logo.svg';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <body>
        <BurgerIngredients />
      </body>
    </div>
  );
}

export default App;
