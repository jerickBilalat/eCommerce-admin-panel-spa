const express = require("express");
const app = express();
const mongoose = require('mongoose');
const {Product} = require('./models/product');
const { Order } = require('./models/order');

mongoose.connect('mongodb://localhost:27017/minRec_admin');


app.get("/api/product", async(req, res) => {
  let product = await Product.findOne({name: "American Classic Billiard Table" });
  res.send(product);
})

app.post('/api/product', async (req, res) => {
  let product = new Product({
    name: "American Classic Billiard Table",
    used: false,
    description: "Classic Billiard table for your classic bar",
    price: "899.00",
    inStock: 2,
    sold: 0,
    publish: true,
    images: []
  })

  product = await product.save();
  res.send(product);
});

app.post('/api/order', async (req, res) => {
  let order = new Order({
    name: "John Doe",
    email: "john@gmail.com",
    phone: "9533846789",
    message: "Hello World",
    products: ["5c6755de920f2b084094f755"],
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

app.use((req, res, next) => {

})

app.get("/", (req, res) => {
  res.json({
    "message": "hello"
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running at port ${PORT}`)});