import React from 'react';
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

export default function IngredientDetails(props) {
  return (
    <>
      <Illustration img={props.image_large} alt={props.name}/>
      <Name name={props.name} size={'medium'} box={'pb-8 pt-4'}/>
      <div className={`${styles.nutritionDetails} pb-15`}>
        <NutritionDetail nutritionType={'calories'} nutritionValue={props.calories} />
        <NutritionDetail nutritionType={'proteins'} nutritionValue={props.proteins} />
        <NutritionDetail nutritionType={'fat'} nutritionValue={props.fat} />
        <NutritionDetail nutritionType={'carbohydrates'} nutritionValue={props.carbohydrates} />
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  proteins: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  fat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  carbohydrates: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}