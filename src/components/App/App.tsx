import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';

const API = 'https://norma.nomoreparties.space/api/ingredients ';

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  })

  useEffect(() => {
    const getAPIdata = async () => {
      setState({...state, isLoading: true, hasError: false});
      try {
        const res = await fetch(API);
        const data = await res.json();
        setState({...state, data: data.data, isLoading: false});
      }
      catch (e) {
        setState({...state, hasError: true, isLoading: false});
        console.log(e.message);
      }
    }

    getAPIdata();
  }, []);

  return (
    <>
      <div className="App">
        <AppHeader />
        { !state.isLoading && !state.hasError &&
        <div className={`${styles.containerMain}`}>
          <BurgerIngredients data={state.data}/>
          <BurgerConstructor />
        </div>
        }
      </div>
    </>
  );
}

export default App;
