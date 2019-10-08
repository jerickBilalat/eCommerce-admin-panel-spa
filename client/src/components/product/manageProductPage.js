import React from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import cloudinary  from 'cloudinary-core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import {API_BASE_URL} from '../../constants';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AttachMoney from '@material-ui/icons/AttachMoney';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {saveProduct, deleteProduct} from "../../actions/productActions";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  card: {
    minWidth: 100
  },
  media: {
    height: 100
  },
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

class ManageProductPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      product: {...this.props.product},
      errors: {},
      saving: this.props.isSaving,
      uploadedProductImagesLinks: [...this.props.product.images],
      isUploading: false,
      isWidgetCreated: false,
      isFormValid: false
    };
  }
  
  updateFormField = name => event => {
    let product = {...this.state.product}
    product[name] = event.target.value;
    this.setState({ product: product })
  };

  updateFormSwitch = name => event => {
    let product = {...this.state.product}
    product[name] = event.target.checked;
    this.setState({ product: product })
  }

  isFormValid = () => {
    const {product} = this.state;
    let formIsValid = true;
    let errors = {
      name: "",
      price: "",
      inStock: "",
      sold: "",
      description: ""
    };
    const inputNames = ["name", "price", "inStock", "sold", "description"];

    inputNames.forEach( inputName => {

      if(product[inputName].length <= 0) {
        errors[inputName] = `${inputName} is required; `;
        formIsValid = formIsValid && false;
      }

      if(["price", "inStock"].includes(inputName) && (product[inputName] === "0" || product[inputName] === 0) ) {
        errors[inputName] += `${inputName} can not be 0; `;
        formIsValid = formIsValid && false;
      }

      if(["name", "description"].includes(inputName) && product[inputName].length < 4 ) {
        errors[inputName] += `${inputName} needs to be more than 4 chracters; `;
        formIsValid = formIsValid && false;
      }

    });
    
    this.setState({ errors, isFormValid: formIsValid });
    return formIsValid;

  }


  onFormSubmit = (event) => {
    event.preventDefault();
    if(!this.isFormValid()) return;

    const { product: unmodifiedProduct } = this.props;
    const productID = this.props.match.params.id;
    let updateBody;
    if(productID) {
      const { product: modifiedProduct } =  this.state;
      updateBody = {};
      modifiedProduct.images = [...this.state.uploadedProductImagesLinks]
      for( let key in modifiedProduct) {
        if(unmodifiedProduct[key] !== modifiedProduct[key]) {
          updateBody[key] = modifiedProduct[key]
        }
      }
      
    }
    
    const requestBody = updateBody || this.state.product;

    this.setState({ saving: true });
    this.props.dispatch(saveProduct(requestBody, productID))
      .then( () => this.props.history.push("/products") )
      .catch( err => {
        this.setState({ saving: false});
      });
    return;
  }

  doDeleteProduct = (id) => {
    this.props.dispatch(deleteProduct(id))
      .then( () => {
        this.props.history.push('/products');
      })
  }

  updateImageLinks = (links) => {
    this.setState({ uploadedProductImagesLinks: [...this.state.uploadedProductImagesLinks, ...links], isUploading: false})
  }
  openUploadImageWidget=() => {
    if(!this.isFormValid()) return;
    this.setState({isUploading: true}, () => {
      const that = this;
      let links = []
      window.cloudinary.openUploadWidget({ 
        cloud_name: 'minnesotarec', 
        upload_preset: 'mnhermanrex',
        multiple: true,
        },
          function(error, result) {
            // todo handle error  
            if(result.event === "success") {
              links = [...links, result.info.url]
            }
            if(result.event === "close") {
              return that.updateImageLinks(links)
            }
          });
    })
    
  }

  removePhoto= (url) => {
    // todo unstable because it relies on and number of chracters
    const startIdx = url.indexOf('mnhermanrex_unsigned/');
    const endIdx = url.indexOf('.jpg') || url.indexOf('.jpeg'); // todo convert all uploaded images to jpg
    const image_public_id = url.substring(startIdx, endIdx);
    axios.get(`${API_BASE_URL}/api/removeImage?public_id=${image_public_id}`)
    .then( res => {
      this.setState({uploadedProductImagesLinks: [...this.state.uploadedProductImagesLinks.filter( x => x !== url)]})
    })
  }

  renderForm() {
    const { classes } = this.props;
    const { product, errors, saving } = this.state;
    return product ? (
      <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={product.used}
                        onChange={this.updateFormSwitch('used')}
                        value="used"
                        color="primary"
                      />
                    }
                    label="Used"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={product.publish}
                        onChange={this.updateFormSwitch('publish')}
                        value="publish"
                        color="primary"
                      />
                    }
                    label="Publish"
                  />
                </FormGroup>
              </Grid>
    
              <Grid item xs={12} md={6}>
                  <TextField
                    error={errors["name"] ? true : false}
                    helperText={errors["name"] ? errors["name"] : ""}
                    required
                    id="standard-full-width"
                    label="Name"
                    onChange = {this.updateFormField('name')}
                    defaultValue={product.name}
                    fullWidth
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  error={errors["price"] ? true : false}
                  helperText={errors["price"] ? errors["price"] : ""}
                  className={classes.priceInputMargin}
                  style={{width: 150}}
                  variant="outlined"
                  id="input-with-icon-textfield"
                  label="Price"
                  type="number"
                  onChange = {this.updateFormField('price')}
                  defaultValue={product.price}
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
                  error={errors["inStock"] ? true : false}
                  helperText={errors["inStock"] ? errors["inStock"] : ""}
                  className={classes.priceInputMargin}
                  style={{width: 150}}
                  variant="outlined"
                  id="input-with-icon-textfield"
                  onChange = {this.updateFormField('inStock')}
                  label="In Stock"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={product.inStock}
                />
    
                <TextField
                  required
                  error={errors["sold"] ? true : false}
                  helperText={errors["sold"] ? errors["sold"] : ""}
                  className={classes.priceInputMargin}
                  style={{width: 150}}
                  variant="outlined"
                  id="input-with-icon-textfield"
                  onChange = {this.updateFormField('sold')}
                  label="Quantity Sold"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={product.sold}
                />
              </Grid>
    
              <Grid item xs={12}>
                <TextField
                  required
                  error={errors["description"] ? true : false}
                    helperText={errors["description"] ? errors["description"] : ""}
                  id="standard-full-width"
                  label="Description"
                  style={{ margin: 8 }}
                  onChange = {this.updateFormField('description')}
                  fullWidth
                  multiline
                  margin="normal"
                  defaultValue={product.description}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
    
              <Grid item xs={12}>
                <Button variant="contained" color="default" className={classes.button} onClick={this.openUploadImageWidget}>
                  Upload Image
                  {this.state.isUploading 
                    ? <CircularProgress
                        style={{margin: "5px"}}
                        size={14}
                        thickness={5}
                      />
                    : <CloudUploadIcon className={classes.rightIcon} />
                  }
                </Button>
              </Grid>

              <Grid item xs={12}>
                  {this.state.uploadedProductImagesLinks.length > 0 ? 
                    <span style={{color: "red"}}>
                      {" "}Tap on picture to remove
                    </span>
                  : <span>Fill out all info before uploading</span>  
                  }
                  <Grid container direction="row" justify="center" spacing={8}>
                    <Grid item>
                    </Grid>
                    {this.state.uploadedProductImagesLinks.length > 0 &&
                      this.state.uploadedProductImagesLinks.map( url => (
                        <Grid item key={url}>
                          <Card className={classes.card} onClick={() => this.removePhoto(url)}>
                            <CardMedia
                              className={classes.media}
                              image={url}
                            />
                          </Card>
                        </Grid>
                      ))
                    }
                  </Grid>
              </Grid>
              
            </Grid>
            
    
            <Grid container justify="flex-end" spacing={24} style={{marginTop: 20}}>

                {this.props.match.params.id &&
                  (<IconButton aria-label="Delete" className={classes.margin} onClick={ e => this.doDeleteProduct(this.props.match.params.id, e)}>
                  <DeleteIcon />
                </IconButton>)  
                }
                
                
                <Button disabled={saving} onClick={this.onFormSubmit} type="submit" size="medium" variant="contained" color="primary" className={classes.buttonMargin}>
                  {saving? "Saving..." : "Save"}
                </Button>
            </Grid>
            
          </form>
    )
    : (<h1>Loading ...</h1>);
  }
  render() {

    return (
      this.renderForm()
    )
  }
}

ManageProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function selectById(products, id) {
  let product = products.filter( item => item._id === id)[0];
  if(!product) return null
  return product;
}

function mapStateToProps(state, ownProps){
  const products = state.products.products;
  const productId = ownProps.match.params.id;
  let product;

  if(!productId) {
    product = {
      name: "",
      used: false,
      description: "",
      price: "",
      inStock: 1,
      sold: 0,
      publish: true,
      images: []
    }
  } 

  if(products && products.length > 0 && productId) {
    product = {...selectById(products, productId)};
  }
  return {
    product: product,
    isSaving: state.products.isSaving
  }
  
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ManageProductPage)));
