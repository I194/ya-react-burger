import IngredientDetails from '../components/BurgerIngredients/IngredientDetails';

import styles from './Ingredient.module.css';

export const IngredientPage = () => {
  console.log('hey!')
  return (
    <div className={`${styles.ingredient}`}>
      <IngredientDetails />
    </div>
  )
}