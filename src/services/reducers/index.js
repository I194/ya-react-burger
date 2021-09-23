import { useReducer } from 'react';
import { combineReducers } from 'redux';
import { shopReducer } from './shop';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer
});