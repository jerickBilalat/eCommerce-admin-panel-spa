const express = require("express");
const app = express();
const mongoose = require('mongoose');
const {Product} = require('./models/product');
const { Order } = require('./models/order');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/minRec_admin', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());

///////////////////////////////////
// Product Routes
//////////////////////////////////

// read all Products sorted by Name
app.get("/api/products", (req,res) => {
  Product.find()
    .sort("name")
    .exec(function(err, products) {
      if(err) return new Error(err);
      res.send(products);
    })
})

// read one by name
app.post("/api/product", (req, res) => {
  const productName = req.body.name;
  Product.findOne({name: productName }, function(err, product) {
   if(err) return new Error(err);
   res.send(product);
 })
})

// read one by ID
app.get("/api/product/:id", (req, res) => {
 Product.findById(req.params.id, function (err, product) {
  if(err) return new Error(err);
  res.send(product);
 });
})

// create a product
app.post('/api/create_product', (req, res) => {
  Product.create(req.body, function(err, product) {
    if(err) return new Error(err);
    res.send(product);
  })
});

// update a product
app.put("/api/edit_product/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, product) {
    if(err) return new Error(err);
    res.send(product);
  });
});

// delete a product
app.delete("/api/delete_product/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, function(err, product) {
    if(err) return new Error(err);
    res.send(product);
  })
})


//////////////////////////////////
// Order Routes
//////////////////////////////////


// read all orders by name desc
app.get("/api/orders", (req,res) => {
  Order.find()
    .sort("name")
    .exec(function(err, order) {
      if(err) return new Error(err);
      res.send(order);
    })
})

// read one order by id
app.get('/api/order/:id',  (req, res) => {
  Order.findById(req.params.id, function (err, order) {
    if(err) return new Error(err);
    res.send(order);
   });
})

// create order
app.post('/api/create_order', (req, res) => {
  Order.create(req.body, function(err, order) {
    if(err) return new Error(err);
    res.send(order);
  })
})

// update order
app.put("/api/edit_order/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, order) {
    if(err) return new Error(err);
    res.send(order);
  });
});

// delete order
app.delete("/api/delete_order/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id, function(err, order) {
    if(err) return new Error(err);
    res.send(order);
  })
});


app.get("/", (req, res) => {
  res.json({
    "message": "hello"
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running at port ${PORT}`)});