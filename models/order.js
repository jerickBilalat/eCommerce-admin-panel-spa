const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name:{
      required: true,
      type: String,
      maxlength:100
    },
    email:{
      required: true,
      type: String,
      maxlength:100
    },
    phone: {
      required: true,
      type: String,
      maxlength:100
    },
    message: {
      type: String,
      maxlength: 10000,
      default: "no message"
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    isCompleted: {
      type: Boolean,
      required: true,
      default: false
    }
}, {timestamps: true});

OrderSchema.virtual("productCount").get(function() {
  return this.products.length;
});

const Order = mongoose.model("Order", OrderSchema)

module.exports = { Order }