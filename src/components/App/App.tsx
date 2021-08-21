import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';
import getIngredients from '../../utils/burger-api';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const loadIngredients = async () => {
      const ingredients : any = await getIngredients();
      setData(ingredients);
    };

    loadIngredients();

  }, []);

  return (
    <div className="App">
      <AppHeader />
      { data.length > 0 &&
      <div className={`${styles.containerMain}`}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor />
      </div>
      }
    </div>
  );
}

export default App;
