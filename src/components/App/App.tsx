import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';

const API = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {

  const [state, setState] = useState({
    loading: false,
    error: false,
    data: []
  })

  useEffect(() => {
    const getAPIdata = async () => {
      setState({...state, loading: true, error: false});
      try {
        const res = await fetch(API);
        const data = await res.json();
        setState({...state, data: data, loading: false});
      }
      catch (e) {
        setState({...state, error: true, loading: false});
      }
    }

    getAPIdata();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className={`${styles.containerMain}`}>
        <BurgerIngredients data={state.data}/>
        <BurgerConstructor data={state.data}/>
      </div>
    </div>
  );
}

export default App;
