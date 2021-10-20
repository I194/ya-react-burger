import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import update from 'immutability-helper';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { useDrag, useDrop } from "react-dnd";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails';
import { 
  getItems, 
  getOrder,
  ADD_SELECTED_INGREDIENT, 
  DELETE_SELECTED_INGREDIENT, 
  INCREASE_INGREDIENT_COUNT, 
  DECREASE_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT,
  CHANGE_SELECTED_BUN,
  SET_SELECTED_INGREDIENTS,
} from '../../services/actions/shop';
import { updateAccToken } from '../../services/actions/user';
import { IConstructorList, IIngredient, IPrice } from '../../services/types/components';

const Price: FunctionComponent<IPrice> = ({size, price}) => {
  if (!size) size = 'default';

  let iconSize = styles.default;
  if (size === 'medium') iconSize = styles.medium; 

  return (
    <div className={`${styles.price} ${iconSize}`}>
      <p className={`text text_type_digits-${size} mr-2`}>{price}</p>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

const ListElement: FunctionComponent<IConstructorList> = ({index, moveIngredientHandler, type, name, price, image, uid, id}) => {

  const dispatch = useDispatch();

  const ref = useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: 'selectedIngredient',
    hover(item: {index: string | number}, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredientHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const [{handlerId, isDragging}, drag] = useDrag({
    type: 'selectedIngredient',
    item: () => {
      return { id: uid, index: index };
    },
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isDragging: monitor.isDragging(),
    })
  })

  const opacity = isDragging ? 0 : 1;

  let isLocked = false;
  
  if (type === 'top' || type === 'bottom') isLocked = true;
  else drop(ref); drag(ref); 

  return (
    <div className={`${styles.element}`} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <div className='' style={{visibility: `${isLocked ? 'hidden' : 'visible'}`}}>
       <DragIcon type='primary'/>
      </div>
      <ConstructorElement
        text={name + (type === 'top' ? ' (верх)' : '') + (type === 'bottom' ? ' (низ)' : '')}
        price={price}
        thumbnail={image}
        type={type}
        isLocked={isLocked}
        handleClose={() => {
          dispatch({
            type: DECREASE_INGREDIENT_COUNT,
            id: id
          })
          dispatch({
            type: DELETE_SELECTED_INGREDIENT,
            uid: uid
          })
        }}
      />
    </div>
  )
}

const BurgerConstructor = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  // Order details (Modal)
  
  const [modalVisible, setVisibility] = useState(false);

  const getIngredientsId = (ingredient: { id: string; }) => {
    return ingredient.id;
  }

  const handleCloseModal = () => {
    setVisibility(false);
  }

  const handleOpenModal = () => {
    if (!localStorage.refreshToken) return history.push('/login');
    dispatch(getOrder([...selectedIngredients, selectedBun, selectedBun].map(getIngredientsId)));
    setVisibility(true);
  }

  // Ingredients 
  
  const ingredients = useSelector(state => state.shop.ingredients);
  const selectedBun = useSelector(state => state.shop.selectedBun);
  const selectedIngredients = useSelector(state => state.shop.selectedIngredients);

  useEffect(() => {
      if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  ); 

  useEffect(() => {
    dispatch(updateAccToken());
  }, [dispatch])

  const dataToIngredient = (ingredientId: { id: string; uid: string; }, index: number, position: string | undefined) => {
    const ingredient = ingredients.filter((ingr: { _id: string; }) => ingr._id === ingredientId.id)[0];

    return (
      <ListElement 
        name={ingredient.name}
        price={ingredient.price}
        image={ingredient.image}
        id={ingredient._id}
        uid={ingredientId.uid}
        key={ingredientId.uid}
        type={position}
        index={index}
        moveIngredientHandler={moveIngredientHandler}
      />
    )
  }

  // Total price

  const getPrices = (ingredientId: { id: string; }) => {
    if (!ingredientId.id) return 0;
    const ingredient = ingredients.filter((ingr: { _id: string; }) => ingr._id === ingredientId.id)[0];

    return ingredient.price;
  }

  const getTotalPrice = (acc: number, val: number) => acc + val;

  // onDrop (get ingredients from BurgerIngredients)

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngredient) {
      const ingredientFull = ingredients.filter((ingr: { _id: string; }) => ingr._id === ingredient.id)[0];
      if (ingredientFull.type === 'bun') {
        dispatch({
          type: SET_INGREDIENT_COUNT,
          id: selectedBun.id,
          count: 0,
        })
        dispatch({
          type: CHANGE_SELECTED_BUN,
          bunId: ingredient.id
        })
        dispatch({
          type: SET_INGREDIENT_COUNT,
          id: ingredient.id,
          count: 2,
        })
      } else {
        dispatch({
          type: ADD_SELECTED_INGREDIENT,
          ingredient: {...ingredient, uid: Number(new Date())}
        });
        dispatch({
          type: INCREASE_INGREDIENT_COUNT,
          id: ingredient.id
        })
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const borderColor = isHover ? '4px double lightgreen' : '2px double transparent';

  // onDrag (sortable within itself)

  const moveIngredientHandler = useCallback((dragIndex, hoverIndex) => {
    const draggableItem = selectedIngredients[dragIndex];
    const newSelectedIngredients = update(selectedIngredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggableItem],
      ],
    })

    dispatch({
      type: SET_SELECTED_INGREDIENTS,
      ingredients: newSelectedIngredients
    })
  }, [selectedIngredients, dispatch]);

  if (!ingredients.length || ingredients.length === 0) return null;

  return (
    <div className={`${styles.containerMain}`}>
      {
        (selectedIngredients.length || selectedBun.id) 
        ?
        <>
          <div className={'pt-25 pb-10'} style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: borderColor}} ref={dropTarget}>
            {selectedBun.id && [selectedBun].map((bun) => dataToIngredient(bun, -1, 'top'))}
            <div className={`${styles.optionalIngredients}`} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {selectedIngredients.map((ingredient: { id: string; uid: string; }, index: number) => dataToIngredient(ingredient, index, undefined))}
            </div>
            {selectedBun.id && [selectedBun].map((bun) => dataToIngredient(bun, -1, 'bottom'))}
          </div>
          <div className={`${styles.totalInfo}`}>
            <Price price={[...selectedIngredients, selectedBun, selectedBun].map(getPrices).reduce(getTotalPrice)} size='medium'/>
            <div className="pl-10">
              <Button type="primary" size="large" onClick={() => !!selectedBun.id ? handleOpenModal() : null}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </>
        :
        <>
          <div className={'mt-25 pt-30 pb-30'} style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: borderColor}} ref={dropTarget} id='drop-target'>
            <p className={`text text_type_main-medium pb-2 pl-10 pr-10 pt-2`} style={{textAlign: 'center'}}>
              Перенесите в эту область булку и другие ингредиенты для бургера 
            </p>
          </div>
        </>
      }
      {
        modalVisible &&
        <Modal header={''} isVisible={modalVisible} onClose={handleCloseModal} box={{w: '720px', h: '720px'}}>
          <OrderDetails />
        </Modal>
      }
    </div>
  )
}

export default BurgerConstructor;