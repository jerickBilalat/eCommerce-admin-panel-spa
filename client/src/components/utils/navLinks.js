import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddCircle from '@material-ui/icons/AddCircle';

import Eject from "@material-ui/icons/Eject";
import LayersIcon from '@material-ui/icons/Layers';

import {Link} from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem 
      button
      component={Link}
      to={"/products"}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem 
      button
      component={Link}
      to={"/manage_product"}
    >
      <ListItemIcon>
        <AddCircle />
      </ListItemIcon>
      <ListItemText primary="Create Product" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem
      button
      component={Link}
      to={"/signin"}
    >
      <ListItemIcon>
        <Eject />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItem>
  </div>
);