
import delay from "./delay";
let productsCollection = [
  {
    "inStock": 4,
    "sold": 0,
    "publish": true,
    "images": [],
    "_id": "5c6962c7dea72f39a079fb04",
    "name": "Bronzic 7-foot Billiard Table",
    "used": false,
    "description": "Brunswick 7-foot Billiard table for your family fun time.",
    "price": "699.00",
    "createdAt": "2019-02-17T13:33:59.273Z",
    "updatedAt": "2019-02-17T13:33:59.273Z"
  },
  {
    "inStock": 3,
    "sold": 1,
    "publish": true,
    "images": [],
    "_id": "5c6ca49c4edbc9280cbe9ee0",
    "name": "Jacky 8-foot Billiard Table",
    "used": false,
    "description": "Modern style Billiard Table",
    "price": "999.00",
    "createdAt": "2019-02-20T00:51:40.508Z",
    "updatedAt": "2019-02-24T16:01:34.941Z"
},
  {
    "inStock": 1,
    "sold": 0,
    "publish": true,
    "images": [],
    "_id": "5c740183a1b35c54c096d2f1",
    "name": "Irish Gold Billiard Table",
    "used": true,
    "description": "Imported pool table from Ireland.",
    "price": "576.00",
    "createdAt": "2019-02-25T14:53:55.630Z",
    "updatedAt": "2019-02-25T14:53:55.630Z"
}];

export function makeCall({method = "GET", body, endpoint}) {
  switch(method) {
    case "GET":
      return fetchProducts();
    case "POST":
      return saveProduct(body);
    case "PUT":
      return saveProduct(body, endpoint.trim().substring(20));
    case "DELETE":
      return deleteProduct(endpoint.trim().substring(20));
    default:
      throw new Error('Unknown or unhandled HTTP request'); 
  }

}

function fetchProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({data: Object.assign([], productsCollection)})
    }, delay);
  })
};

function saveProduct(reqBody, productID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    
      if(!productID) {
        // create
        const productID = `${new Date().toISOString()}`;
        reqBody["_id"] = productID;
        reqBody["createdAt"] = new Date().toISOString();
        reqBody["updatedAt"] = new Date().toISOString();
        productsCollection.push(reqBody);
        return resolve({data: reqBody});
      }

      // else update
      let product = productsCollection.filter( item => {
        return item._id === productID} )[0];

      // build updated product
      for(let key in product) {
        if(reqBody[key]) {
          product[key] = reqBody[key];
        }
      }

      let newDate = new Date().toISOString();
      product.updatedAt = newDate;
      

      let updatedProductCollection = productsCollection.filter( item => item._id !== productID );
      updatedProductCollection.push(product);
      productsCollection = updatedProductCollection;

      return resolve({data: product});

    }, delay);
  })
}

function deleteProduct(productID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let deletedProduct = productsCollection.filter( item => item._id === productID)[0];
      productsCollection = productsCollection.filter( item => item._id !== productID);
      return resolve({data: deletedProduct});
    }, delay);
  })
  
};

