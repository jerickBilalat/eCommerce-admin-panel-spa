const express = require("express");
const app = express();
const mongoose = require('mongoose');
const {Product} = require('./models/product');
const { Order } = require('./models/order');

mongoose.connect('mongodb://localhost:27017/minRec_admin', {useNewUrlParser: true});

app.get("/api/product", async(req, res) => {
  let product = await Product.findOne({name: "American Classic Billiard Table" });
  res.send(product);
})

app.post('/api/product', async (req, res) => {
  let product = new Product({
    name: "Brunswick 7-foot Billiard Table",
    used: false,
    description: "Brunswick 7-foot Billiard table for your family fun time.",
    price: "699.00",
    inStock: 4,
    sold: 0,
    publish: true,
    images: []
  })

  product = await product.save();
  res.send(product);
});

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

app.use((req, res, next) => {

})

app.get("/", (req, res) => {
  res.json({
    "message": "hello"
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running at port ${PORT}`)});