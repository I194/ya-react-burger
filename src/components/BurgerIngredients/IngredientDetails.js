import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import Illustration from './Illustration';
import Name from './Name';

function NutritionDetail(props) {

  let name = '';
  switch (props.nutritionType) {
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
      <p className={'text text_type_digits-default '}>{props.nutritionValue}</p>
    </div>
  )
}

NutritionDetail.propTypes = {
  nutritionType: PropTypes.string.isRequired,
  nutritionValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default function IngredientDetails() {

  const ingredient = useSelector(state => state.shop.currentIngredient);

  return (
    <>
      <Illustration img={ingredient.image_large} alt={ingredient.name}/>
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