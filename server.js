const express = require("express");
const config = require("config");
const app = express();
const mongoose = require('mongoose');
// const {Product} = require('./models/product');
const { Order } = require('./models/order');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const cloudinary = require('cloudinary').v2;

// routes
const ProductRoutes = require('./routes/products');
const OrderRoutes = require('./routes/orders');

mongoose.connect(config.get('db'), {useNewUrlParser: true});

cloudinary.config({ 
  cloud_name: config.get('cloudinary_cloud_name'), 
  api_key: config.get('cloudinary_api_key'), 
  api_secret:  config.get('cloudinary_api_secret')
});


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

app.get('/api/removeImage', (req, res) => {
  let image_id = req.query.public_id;
  cloudinary.uploader.destroy(image_id,(error,result)=>{
    if(error) return res.json({succes:false,error});
    res.status(200).json({succes: true})
})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// log errors 
app.use(function(err, req, res, next) {
  console.error(err);
  next(err);
})
// error handlers
app.use(function(err, req, res, next) {

  if (app.get('env') === 'development') {
    res.status(err.status || 500)
      .send({
        message: err.message,
        error: err
      });
    return;
  }

  res.status(err.status || 500)
    .send({
      message: err.message,
      error: {}
    });

});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => { console.log(`Server running at port ${PORT} with the database of ${config.get('db')}`)});

module.exports = server;