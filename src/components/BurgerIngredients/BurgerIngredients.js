import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes, { exact } from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal';
import Ingredient from './Ingredient';
import IngredientDetails from './IngredientDetails';
import { getItems, SET_INGREDIENT_MODAL, DELETE_INGREDIENT_MODAL } from '../../services/actions/shop.js';
import { IngredientPage } from '../../pages';
 
function Headline(props) {
  return (
    <p className={'text text_type_main-medium pt-10 pb-6'} style={{width: '100%'}} id={props.id}>{props.children}</p>
  )
}

Headline.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
} 

function Row(props) {
  return (
    <div className={`${styles.columnsPuns}`} style={{textAlign: 'center'}}>
      {props.children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ])
}

function Col(props) {
  return (
    <div className={`${styles.col}`} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ])
}

export default function BurgerIngredients() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  // Ingredients 
  
  const ingredients = useSelector(state => state.shop.ingredients);

  useEffect(() => {
    if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  );  

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);

  const dataToIngredient = (ingredients) => {
    return (
      <Col key={ingredients._id} onClick={() => {handleOpenModal(ingredients)}}>
        <Link to={{
          pathname: `/ingredients/${ingredients._id}`,
          state: {modal: true}
        }}>
          <Ingredient 
            name={ingredients.name} 
            price={ingredients.price}
            img={ingredients.image}
            id={ingredients._id}
            count={ingredients.__v}
          />
        </Link>
      </Col>
    )
  }

  // Modal 

  const [modalVisible, setVisibility] = useState(false);
  
  const handleCloseModal = () => {
    dispatch({type: DELETE_INGREDIENT_MODAL})
    setVisibility(false);
    history.push("/");
  }

  const handleOpenModal = (data) => {
    dispatch({
      type: SET_INGREDIENT_MODAL,
      ingredient: data
    })
    setVisibility(true);
  }

  // Tabs

  const [current, setCurrent] = useState('buns');

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const activateTab = () => {
    const tabs = ['buns', 'sauces', 'mains'];
    const headings = tabs.map((id) => document.getElementById(id))
    const scrollPosition = document.getElementById('ingredients').scrollTop;
    headings.forEach((heading, iter) => {
      const headingPosition = heading.offsetTop;
      if (headingPosition <= scrollPosition + 200 && headingPosition >= scrollPosition - 200) {
        setCurrent(tabs[iter]);
      }
    })
  }

  if (!ingredients.length) return null;

  console.log(`${path}/ingredients/:id`)

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
      {/* <Route path={`${path}ingredients/:id`} render={() => 
        {
        if (modalVisible) {return (
          <Modal header={'Детали ингредиента'} isVisible={modalVisible} onClose={handleCloseModal} box={{w: '720px', h: '540px'}}>
            <IngredientDetails />
          </Modal>
        )} 
        else {return (
          <IngredientPage />
        )}
      }}/> */}
    </>
  )
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.array.isRequired
// }