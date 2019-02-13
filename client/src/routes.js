import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from "./components/layout";

import SignInPage from "./components/signInPage";
import Dashboard from "./components/dashboard";
import ProductPage from "./components/product";
import ManageProductPage from "./components/product/manageProductPage";
import OrderPage from "./components/orderPage";

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/products" exact component={ProductPage}/>
        <Route path="/manage_product" exact component={ManageProductPage} />
        <Route path="/orders" exact component={OrderPage}/>
        <Route path="/signin" exact component={SignInPage}/>
      </Switch>
    </Layout>
  )
}

export default Routes;