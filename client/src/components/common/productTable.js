import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function createData(id,name, inStock, sold, price, published) {
  return { id, name, inStock, sold, price, published };
}


function ProductTable(props) {
  const { classes,
    doGoToManageProductPage,
    products } = props;
  const rows = products.map(product => {
    let {_id: id, name, inStock, sold, price, publish} = product;
    publish = publish ? "yes" : "no";
    return createData(id, name, inStock, sold, price, publish);
  })
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
              <TableCell align="right">In Stock</TableCell>
              <TableCell align="right">Sold</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow hover onClick={(e) => doGoToManageProductPage(row.id, e)} key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.inStock}</TableCell>
              <TableCell align="right">{row.sold}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

ProductTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductTable);
