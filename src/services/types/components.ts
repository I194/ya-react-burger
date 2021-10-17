import { MouseEventHandler } from "react";

export interface INavItem {
  icon?: JSX.Element,
  exact: boolean,
  linkTo: string,
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export interface IIngName {
  box?: string,
  size?: string,
  name: string
}

export interface IPrice {
  price: string | number,
  size?: string
}

export interface ICount {
  count: string | number
}

export interface IIllustration {
  image: string,
  alt: string
}

export interface IHeadline {
  id: string
}

export interface ICol {
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export interface INutrDetails {
  nutritionType: string,
  nutritionValue: string | number
}

export interface IIngredient {
  name: string,
  price: string | number,
  type?: string | undefined,
  count: number,
  image: string,
  image_large?: string,
  calories?: number,
  proteins?: number,
  fat?: number,
  carbohydrates?: number,
  id: string 
}

export interface IConstructorList {
  name: string,
  type: any,
  price:  number,
  drag?: string,
  image: string,
  id: string,
  uid: string,
  index: string | number,
  moveIngredientHandler: Function
}

export interface IModalOverlay {
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export interface IModalHeader {
  headerClass?: string,
  onClick: () => void
}

export interface IModal {
  onClose: () => void,
  header: string,
  box: {w: string, h: string},
  isVisible: boolean,
  headerClass?: string
}

export interface ICompleted {
  text: string,
  number: number
}

export interface IFeed {
  path: string
}

export interface IIngredientsRow {
  name: string,
  count: string | number,
  price: string | number,
  image: string
}

export interface IOrder {
  ingredients: [],
  number: number,
  name: string,
  status: 'done' | 'created' | 'pending',
  createdAt: string,
  _id: string
}

export interface IOrderDetails {
  _id?: string, 
  orders?: IOrder[]
}

export interface IOrderIdTime {
  _id: string,
  time: string
}

export interface IOrderIngredients {
  ingredientsId: string[]
}

export interface ICardOrder {
  path: string,
  _id: string,
  ingredients: [],
  time: string,
  name: string,
  orders: []
}

export interface IOrderList {
  path: string,
  orders: []
}

export interface IProfile {
  path: string
}

export interface ILocationState {
  from: {
    pathname: string
  },
  modal?: boolean,
  orders?: IOrder[],
  _id?: string
}

export interface IOrdersPage {
  orders?: IOrder[]
}

export interface IUser {
  name?: string,
  password?: string,
  email?: string,
}

export interface IUserData {
  user: IUser,
  refreshToken?: string,
  accessToken?: string
}

export interface IProtectedRoute {
  path: string
}