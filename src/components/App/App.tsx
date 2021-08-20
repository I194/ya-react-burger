import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';
import getData from '../../utils/burger-api';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const setAPIdata = async () => {
      const apiData : any = await getData(`${BURGER_API_URL}/ingredients`);
      setData(apiData);
    };

    setAPIdata();

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
