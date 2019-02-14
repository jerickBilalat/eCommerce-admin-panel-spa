import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AttachMoney from '@material-ui/icons/AttachMoney';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  priceInputMargin: {
    margin: theme.spacing.unit,
  },
  buttonMargin: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class TextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
    checkedB: true,
  };

  handleChange = name => event => {
    this.setState(prevState => ({[name] : !prevState[name]}));
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">

        <TextField
          required
          id="standard-full-width"
          label="Name"
          style={{ margin: 8 }}
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
    
        <TextField
          required
          className={classes.priceInputMargin}
          style={{width: 150}}
          variant="outlined"
          id="input-with-icon-textfield"
          label="Price"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          required
          className={classes.priceInputMargin}
          style={{width: 150}}
          variant="outlined"
          id="input-with-icon-textfield"
          label="In Stock"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={1}
        />

        <TextField
          required
          className={classes.priceInputMargin}
          style={{width: 150}}
          variant="outlined"
          id="input-with-icon-textfield"
          label="Quantity Sold"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={0}
        />

        <div>
          <Button variant="contained" color="default" className={classes.button}>
            Upload Image
            <CloudUploadIcon className={classes.rightIcon} />
          </Button> 
        </div>

        <TextField
          required
          id="standard-full-width"
          label="Description"
          style={{ margin: 8 }}
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
                color="primary"
              />
            }
            label="Publish"
          />
        </FormGroup>

        <IconButton aria-label="Delete" className={classes.margin}>
          <DeleteIcon />
        </IconButton>
        
        <Button size="medium" variant="contained" color="primary" className={classes.buttonMargin}>
          Save
        </Button>
        
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
