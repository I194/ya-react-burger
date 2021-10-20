import React, { useMemo, useState, useEffect, FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/types/hooks';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Ingredient from './Ingredient';
import { getItems, SET_INGREDIENT_MODAL} from '../../services/actions/shop';
import { ICol, IHeadline } from '../../services/types/components';
 
const Headline: FunctionComponent<IHeadline> = ({id, children}) => {
  return (
    <p className={'text text_type_main-medium pt-10 pb-6'} style={{width: '100%'}} id={id}>{children}</p>
  )
}

const Row: FunctionComponent = ({children}) => {
  return (
    <div className={`${styles.columnsPuns}`} style={{textAlign: 'center'}}>
      {children}
    </div>
  )
}

const Col: FunctionComponent<ICol> = ({onClick, children}) => {
  return (
    <div className={`${styles.col}`} onClick={onClick}>
      {children}
    </div>
  )
}

const BurgerIngredients = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  // Ingredients 
  
  const ingredients = useSelector(state => state.shop.ingredients);

  useEffect(() => {
    if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  );  

  const buns = useMemo(() => ingredients.filter((item: { type: string; }) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item: { type: string; }) => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item: { type: string; }) => item.type === 'sauce'), [ingredients]);

  const dataToIngredient = (ingredients: { _id: string; name: string; price: string | number; image: string; __v: number; }) => {
    return (
      <Col key={ingredients._id} onClick={() => {handleOpenModal(ingredients)}}>
        <Link to={{
          pathname: `/ingredients/${ingredients._id}`,
          state: {modal: true, background: location}
        }}>
          <Ingredient 
            name={ingredients.name} 
            price={ingredients.price}
            image={ingredients.image}
            id={ingredients._id}
            count={ingredients.__v}
          />
        </Link>
      </Col>
    )
  }

  // Modal 

  const handleOpenModal = (data: { _id: string; name: string; price: string | number; image: string; __v: number; }) => {
    dispatch({
      type: SET_INGREDIENT_MODAL,
      ingredient: data
    })
  }

  // Tabs

  const [current, setCurrent] = useState('buns');

  const setTab = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const activateTab = () => {
    const tabs = ['buns', 'sauces', 'mains'];
    const headings = tabs.map((id) => document.getElementById(id))
    const scrollPosition = document.getElementById('ingredients')!.scrollTop;
    headings.forEach((heading, iter) => {
      const headingPosition = heading!.offsetTop;
      if (headingPosition <= scrollPosition + 200 && headingPosition >= scrollPosition - 200) {
        setCurrent(tabs[iter]);
      }
    })
  }

  if (!ingredients.length) return null;

  return (
    <>
      <div className={`${styles.containerMain}`} style={{ textAlign: 'left'}} >
        <p className={'text text_type_main-large pt-10 pb-5'}>Соберите бургер</p>
        <div style={{ display: 'flex', width: '100%' }}>
          <Tab value="buns" active={current === 'buns'} onClick={setTab}>
            Булки
          </Tab>
          <Tab value="sauces" active={current === 'sauces'} onClick={setTab}>
            Соусы
          </Tab>
          <Tab value="mains" active={current === 'mains'} onClick={setTab}>
            Начинки
          </Tab>
        </div>
        <div className={`${styles.ingredients}`} id='ingredients' onScroll={activateTab}>
          <Headline id='buns'>Булки</Headline>
          <Row>{buns.map(dataToIngredient)}</Row>
          <Headline id='sauces'>Соусы</Headline>
          <Row>{sauces.map(dataToIngredient)}</Row>
          <Headline id='mains'>Начинки</Headline>
          <Row>{mains.map(dataToIngredient)}</Row>
        </div>
      </div>
    </>
  )
}

export default BurgerIngredients;