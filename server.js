const express = require("express");
const app = express();
const mongoose = require('mongoose');
// const {Product} = require('./models/product');
const { Order } = require('./models/order');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// routes
const ProductRoutes = require('./routes/products');
const OrderRoutes = require('./routes/orders');

mongoose.connect('mongodb://localhost:27017/minRec_admin', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));


app.use('/api/products', ProductRoutes );
app.use('/api/orders', OrderRoutes );

app.get("/", (req, res) => {
  res.json({
    "message": "hello"
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running at port ${PORT}`)});