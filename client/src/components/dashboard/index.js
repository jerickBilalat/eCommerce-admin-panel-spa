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

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableContainer: {
		marginTop: "45px",
    height: 320,
  }
};

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

function Dashboard(props) {
  const { classes } = props;

  return (
    <Fragment>
      <div className={classes.tableContainer}>
        <Typography variant="h4" gutterBottom component="h2">
          Products
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat (g)</TableCell>
                <TableCell align="right">Carbs (g)</TableCell>
                <TableCell align="right">Protein (g)</TableCell>
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
				<Typography variant="h4" gutterBottom component="h2">
					Orders
				</Typography>
				<Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Dess (1  ffdfddfd 00g serving)</TableCell>
								<TableCell align="right">Calories</TableCell>
								<TableCell align="right">Fat (g)</TableCell>
								<TableCell align="right">Carbs (g)</TableCell>
								<TableCell align="right">Protein (g)</TableCell>
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
				<Typography variant="h4" gutterBottom component="h2">
					Order History
				</Typography>
				<Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Dessert (100g serving)</TableCell>
								<TableCell align="right">Calories</TableCell>
								<TableCell align="right">Fat (g)</TableCell>
								<TableCell align="right">Carbs (g)</TableCell>
								<TableCell align="right">Protein (g)</TableCell>
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
    </Fragment>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);