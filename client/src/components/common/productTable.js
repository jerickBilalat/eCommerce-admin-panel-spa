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

let id = 0;
function createData(name, inStock, sold, price, published) {
  id += 1;
  return { id, name, inStock, sold, price, published };
}

const rows = [
  createData('American Classic 8-foot Billiard table', 159, 6, "$45.00", "true"),
  createData('Cannon 8-foot Billiard table', 237, 9.0, "$1.00", "true"),
  createData('Brunswick 7-foot Billiard table', 262, 16, "$1.00", "false"),
  createData('Olhausen 9-foot Billiard table', 305, 3, "$1.00", "true"),
  createData('Winbrik 7-foot Billiard table', 5, 16.0, "$1.00", "false"),
];

function SimpleTable(props) {
  const { classes, doGoToManageProductPage } = props;

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
            <TableRow hover onClick={() => doGoToManageProductPage()} key={row.id}>
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

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
