import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, NotFound404 } from '../../pages';
import styles from './App.module.css';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Switch>
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
          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders'>
            <ProfilePage />
          </ProtectedRoute>
          {/* <Route path='/ingredients/:id' exact={true}>
            <IngredientPage />
          </Route> */}
          <Route path='/'>
            <ConstructorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
