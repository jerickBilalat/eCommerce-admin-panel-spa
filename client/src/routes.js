import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from "./components/layout";

import SignInPage from "./components/signInPage";
import Dashboard from "./components/dashboard";
import ProductPage from "./components/productPage";
import OrderPage from "./components/orderPage";

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/products" exact component={ProductPage}/>
        <Route path="/orders" exact component={OrderPage}/>
        <Route path="/signin" exact component={SignInPage}/>
      </Switch>
    </Layout>
  )
}

export default Routes;