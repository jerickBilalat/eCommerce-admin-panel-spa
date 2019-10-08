const {PoolTable}= require('../models/PoolTableProduct');
const mongoose = require('mongoose');
const express = require('express');
const requireLogin = require('../middleware/requireLogin')
const router = express.Router();

// read all PoolTables sorted by name
router.get('/', requireLogin, function(req, res, next) {
  PoolTable.find()
    .sort("name")
    .exec(function(err, products) {
      if(err) return next(err);
      res.send(products);
    });
})

// read one by name
router.post("/", requireLogin, (req, res, next) => {
  const productName = req.body.name;
  PoolTable.findOne({name: productName }, function(err, product) {
   if(err) return next(err);
   res.send(product);
 })
})

// read one by ID
router.get("/:id", requireLogin, (req, res, next) => {
  PoolTable.findById(req.params.id, function (err, product) {
   if(err) return next(err);
   res.send(product);
  });
 })

 // create a PoolTable
router.post('/create_product', requireLogin, (req, res, next) => {
  PoolTable.create(req.body, function(err, product) {
    if(err) return next(err);
    res.send(product);
  })
});

// update a PoolTable
router.put("/update_product/:id", requireLogin, (req, res, next) => {
  PoolTable.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, product) {
    if(err) return next(err);
    res.send(product);
  });
});

// delete a PoolTable
router.delete("/delete_product/:id", requireLogin, (req, res, next) => {
  PoolTable.findByIdAndRemove(req.params.id, function(err, product) {
    if(err) return next(err);
    res.send(product);
  })
})

module.exports = router;