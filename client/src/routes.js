import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from "./components/layout";

import SignInPage from "./components/signInPage";
import Dashboard from "./components/dashboard";
import ProductPage from "./components/product";
import ManageProductPage from "./components/product/manageProductPage";
import OrderPage from "./components/orderPage";
import AuthHOC from "./components/AuthHOC";

const AuthProductPage = AuthHOC(ProductPage);
const AuthManageProductPage = AuthHOC(ManageProductPage);


const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={SignInPage}/>
        <Route path="/dashboard" exact component={AuthProductPage}/>
        <Route path="/products" exact component={AuthProductPage}/>
        <Route path="/manage_product" exact component={AuthManageProductPage} />
        <Route path="/manage_product/:id" exact component={AuthManageProductPage} />
        <Route path="/signin" exact component={SignInPage}/>
      </Switch>
    </Layout>
  )
}

export default Routes;