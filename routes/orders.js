const {Order}= require('../models/order');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// read all orders by name desc
router.get("/", (req,res) => {
  Order.find()
    .sort("name")
    .exec(function(err, order) {
      if(err) return new Error(err);
      res.send(order);
    })
})

// read one order by id
router.get('/:id',  (req, res) => {
  Order.findById(req.params.id, function (err, order) {
    if(err) return new Error(err);
    res.send(order);
   });
})

// create order
router.post('/create_order', (req, res) => {
  Order.create(req.body, function(err, order) {
    if(err) return new Error(err);
    res.send(order);
  })
})

// update order
router.put("/edit_order/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, order) {
    if(err) return new Error(err);
    res.send(order);
  });
});

// delete order
router.delete("/delete_order/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id, function(err, order) {
    if(err) return new Error(err);
    res.send(order);
  })
});

module.exports = router;