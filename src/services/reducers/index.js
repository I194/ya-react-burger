import { combineReducers } from 'redux';
import { shopReducer } from './shop';

export const rootReducer = combineReducers({
  shop: shopReducer,
});