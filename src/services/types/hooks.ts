import { store } from "../..";
import { TypedUseSelectorHook, useSelector as selector, useDispatch as dispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TShopActions } from "./shop";
import { TUserActions } from "./user";

export type TAppActions = TShopActions & TUserActions;

export type TRootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootStore, TAppActions>
>;
export const useSelector: TypedUseSelectorHook<TRootStore> = selector;
export const useDispatch = () => dispatch<AppDispatch | AppThunk>();