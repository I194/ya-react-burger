import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, FeedPage, IngredientPage, OrderPage } from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Modal from '../Modal/Modal';
import IngredientDetails from '../BurgerIngredients/IngredientDetails';
import OrderDetails from '../Feed/OrderDetails';
import { ILocationState } from '../../services/types/components';

function App() {

  const history = useHistory();
  const location: any = useLocation<ILocationState>();

  const handleCloseModal = () => {
    location.state.modal = false;
    history.push("/");
  }

  const isModal = !!(
    location.state && location.state.modal && (history.action !== 'POP')
  );
  const background = history.action === "PUSH" && location.state && location.state.background;
  
  const orders = location.state ? location.state.orders : [];
  const number = location.state ? location.state.number : undefined;

  return (
    <div className="App">
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password'>
          <ResetPasswordPage />
        </Route>
        <Route path='/feed' exact>
          <FeedPage />
        </Route>
        <Route path='/feed/:id' exact>
          <OrderPage orders={orders} number={number}/>
        </Route>
        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <Route path={`/ingredients/:id`}>
          <IngredientPage />
        </Route>
        <Route path='/'>
          <ConstructorPage />
        </Route>
      </Switch>
      {
        isModal 
        ?
        <Route path={`/ingredients/:id`}>
          <Modal header={'Детали ингредиента'} isVisible={true} onClose={handleCloseModal} box={{w: '720px', h: '540px'}}>
            <IngredientDetails />
          </Modal>
        </Route> 
        :
        null
      }
      {
        isModal 
        ?
        <Route path={`${background.pathname}/:id`}>
          <Modal 
            header={`#${number}`} 
            headerClass={'text text_type_digits-default'} 
            isVisible={true} 
            onClose={handleCloseModal} 
            box={{w: '720px', h: '720px'}}
          >
            <OrderDetails _id={location.state._id} orders={orders}/>
          </Modal>
        </Route> 
        :
        null
      }
    </div>
  );
}

export default App;
