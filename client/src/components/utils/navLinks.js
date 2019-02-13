import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import Eject from "@material-ui/icons/Eject";
import LayersIcon from '@material-ui/icons/Layers';

import {Link} from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem 
      button
      component={Link}
      to={"/"}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem 
      button
      component={Link}
      to={"/products"}
    >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary=" Add/Edit Products" />
    </ListItem>
    <ListItem 
      button
      component={Link}
      to={"/orders"}
    >
      <ListItemIcon>
        <ShoppingBasketIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
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