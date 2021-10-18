import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/types/hooks';
import styles from './BurgerIngredients.module.css';
import Illustration from './Illustration';
import Name from './Name';
import { getItems } from '../../services/actions/shop';
import { INutrDetails } from '../../services/types/components';

const NutritionDetail: FunctionComponent<INutrDetails> = ({ nutritionType, nutritionValue }) => {

  let name = '';
  switch (nutritionType) {
    case 'calories':
      name = 'Калории, ккал';
      break;
    case 'proteins':
      name = 'Белки, г';
      break;
    case 'fat':
      name = 'Жиры, г';
      break;
    case 'carbohydrates':
      name = 'Углеводы, г';
      break;
    default: 
      name = '';
      break;
  }

  return (
    <div className={`${styles.nutritionElement} text_color_inactive`}>
      <p className={'text  text_type_main-default pb-2'}>{name}</p>
      <p className={'text text_type_digits-default '}>{nutritionValue}</p>
    </div>
  )
}

export default function IngredientDetails() {

  const dispatch = useDispatch();

  const { id } = useParams<{id: string}>();
  const ingredients = useSelector(state => state.shop.ingredients);
  
  useEffect(() => {
    if (!ingredients.length) dispatch(getItems());
    },
    [dispatch, ingredients]
  );  
  
  const ingredient = ingredients.filter((ingr: { _id: string | undefined; }) => ingr._id === id)[0];
  
  if (!ingredient) return null;

  return (
    <>
      <Illustration image={ingredient.image_large} alt={ingredient.name}/>
      <Name name={ingredient.name} size={'medium'} box={'pb-8 pt-4'}/>
      <div className={`${styles.nutritionDetails} pb-15`}>
        <NutritionDetail nutritionType={'calories'} nutritionValue={ingredient.calories} />
        <NutritionDetail nutritionType={'proteins'} nutritionValue={ingredient.proteins} />
        <NutritionDetail nutritionType={'fat'} nutritionValue={ingredient.fat} />
        <NutritionDetail nutritionType={'carbohydrates'} nutritionValue={ingredient.carbohydrates} />
      </div>
    </>
  )
}