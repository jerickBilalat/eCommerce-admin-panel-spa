import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ProductTable from "../common/table";

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableContainer: {
    height: 320,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ProductPage(props) {
  const { classes } = props;

  return (
    <Fragment>
      <div className={classes.tableContainer}>
        <Typography variant="h4" gutterBottom component="h2">
          Add/Edit Products
        </Typography>
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
              {data.map(n => (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell align="right">{n.calories}</TableCell>
                  <TableCell align="right">{n.fat}</TableCell>
                  <TableCell align="right">{n.carbs}</TableCell>
                  <TableCell align="right">{n.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>    
      </div>
      <div className={classes.tableContainer}>
        <ProductTable />
      </div>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Fragment>
  );
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ProductPage);