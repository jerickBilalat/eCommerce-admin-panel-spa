import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ProductsTable from "../common/productTable.js";
import OrdersTable from "../common/ordersTable.js";
import PastOrdersTable from "../common/pastOrdersTable.js";


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

function Dashboard(props) {
  const { classes } = props;

  return (
    <Fragment>
			<Typography variant="h4" gutterBottom component="h2">
				Products
			</Typography>
      <div className={classes.tableContainer}>
        <ProductsTable />
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
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);