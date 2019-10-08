const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoolTableProductSchema = new Schema({
  name:{
    required: true,
    type: String,
    unique: 1,
    maxlength:100
  },
  used:{
    required: true,
    type: Boolean,
    deafult: false
  },
  size: {
    required: true,
    type: Number
  },
  description:{
      required: true,
      type: String,
      maxlength:100000
  },
  price:{
      required: true,
      type: String,
      maxlength: 100
  },
  inStock:{
      required: true,
      type: Number,
      maxlength: 100,
      default: 1
  },
  sold:{
      type: Number,
      maxlength: 100,
      default: 0
  },
  publish:{
      required: true,
      type: Boolean,
      default: true,
  },
  images:{
      type: Array,
      default:[]
  }
}, {timestamps: true});

const PoolTable = mongoose.model("PoolTable", PoolTableProductSchema);

module.exports = { PoolTable }