const {Product}= require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// read all products sorted by name
router.get('/',  function(req, res, next) {
  Product.find()
    .sort("name")
    .exec(function(err, products) {
      if(err) return next(err);
      res.send(products);
    });
})

// read one by name
router.post("/", (req, res, next) => {
  const productName = req.body.name;
  Product.findOne({name: productName }, function(err, product) {
   if(err) return next(err);
   res.send(product);
 })
})

// read one by ID
router.get("/id", (req, res, next) => {
  Product.findById(req.params.id, function (err, product) {
   if(err) return next(err);
   res.send(product);
  });
 })

 // create a product
router.post('/create_product', (req, res, next) => {
  console.log('creating product ....')
  console.log(req.body);
  Product.create(req.body, function(err, product) {
    if(err) return next(err);
    res.send(product);
  })
});

// update a product
router.put("/update_product/:id", (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, product) {
    if(err) return next(err);
    res.send(product);
  });
});

// delete a product
router.delete("/delete_product/:id", (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, function(err, product) {
    if(err) return next(err);
    res.send(product);
  })
})

module.exports = router;