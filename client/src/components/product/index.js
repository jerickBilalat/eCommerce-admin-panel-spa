import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import { fetchProducts } from '../../actions/productActions'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
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

  componentDidMount() {
    this.props.dispatch(fetchProducts())
  }
  doGoToManageProductPage = (id) => {
    this.props.history.push(`/manage_product/${id}`);
  }

  render() {
    const { classes, products} = this.props;
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Products
        </Typography>
        <div className={classes.tableContainer}>
          <ProductTable doGoToManageProductPage={this.doGoToManageProductPage} products={products}/>
        </div>
        <Fab color="primary" aria-label="Add" component={Link} to={"/manage_product"} className={classes.fab}>
          <AddIcon />
        </Fab>
      </Fragment>
    );
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products.products
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles, {withTheme: true})(ProductPage)));