import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter} from "react-router-dom";

import ProductTable from "../common/productTable";

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tableContainer: {
		maxHeight: 320,
		marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
});
class ProductPage extends React.Component {

  doGoToManageProductPage = () => {
    console.log(this.props.history.push("/manage_product"))
  }
  render() {
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Add/Edit Products
        </Typography>
        <div className={this.props.classes.tableContainer}>
          <ProductTable doGoToManageProductPage={this.doGoToManageProductPage}/>
        </div>
        <Fab color="primary" aria-label="Add" className={this.props.classes.fab}>
          <AddIcon />
        </Fab>
      </Fragment>
    );
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, {withTheme: true})(ProductPage));