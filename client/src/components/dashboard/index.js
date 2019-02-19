import React, {Fragment, Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ProductsTable from "../common/productTable.js";
import OrdersTable from "../common/ordersTable.js";
import PastOrdersTable from "../common/pastOrdersTable.js";

import { fetchProducts } from "../../actions/productActions";



const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tableContainer: {
		maxHeight: 320,
		marginBottom: 20,
  }
};

class Dashboard extends Component{

  render() {
    const {classes, products } = this.props;
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Products
        </Typography>
        <div className={classes.tableContainer}>
          <ProductsTable products={products}/>
        </div>
        <Typography variant="h4" gutterBottom component="h2">
          Current Orders
        </Typography>
        <div className={classes.tableContainer}>
          <OrdersTable />
        </div>
        <Typography variant="h4" gutterBottom component="h2">
          Past Orders
        </Typography>
        <div className={classes.tableContainer}>
          <PastOrdersTable />
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));