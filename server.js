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
  console.log('reading one by ID');
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
app.post('/api/order', async (req, res) => {
  let order = new Order({
    name: "Thomas  Edison",
    email: "tomed@gmail.com",
    phone: "9534846504",
    message: "call in the morning",
    products: ["5c6755de920f2b084094f755", "5c6962c7dea72f39a079fb04"],
    isCompleted: false
  });

  order = await order.save();
  res.send(order);
  

})

app.get('/api/order', async (req, res) => {
  let orders = await Order.findOne({name: "John Doe"}).populate("products");
  console.log(orders.productCount);
  res.send(orders);
})


app.get("/", (req, res) => {
  res.json({
    "message": "hello"
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running at port ${PORT}`)});