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
function createData(name, createdOn, completedOn, numberOfItems, total) {
  id += 1;
  return { id, name, createdOn, completedOn, numberOfItems, total };
}

const rows = [
  createData('Cory Price', "5/2/18", "5/10/18", 3, "$465.00"),
  createData('Ben Gory', "6/15/18", "7/19/18", 5, "$900.00"),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
              <TableCell align="right">Created On</TableCell>
              <TableCell align="right">Completed On</TableCell>
              <TableCell align="right">Number of Items</TableCell>
              <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.createdOn}</TableCell>
              <TableCell align="right">{row.completedOn}</TableCell>
              <TableCell align="right">{row.numberOfItems}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
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
