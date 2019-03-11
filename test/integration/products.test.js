/**
 * @jest-environment node
 */
const request = require('supertest');
const { Product }= require('../../models/product');
const mongoose = require('mongoose');


describe('Products API', () => {

  // setup
  let server;
  beforeEach( () => {
    server = require('../../server');
  });

  // teardown
  afterEach( async () => {
    await Product.deleteMany({});
    await server.close();
  })

  // helper functions
  function createProducts(quantity = 1) {
    if(quantity === 1) {
      return {
        "name": "mock product 1",
        "used": false,
        "description": "Billiard table",
        "price": "889.00",
        "inStock": 5,
        "sold": 1,
        "publish": true,
        "images": []
      }
    }

    let products = [];
    for(let i = 0; i < quantity; i++ ) {
      products.push({
        "name": `mock product ${i+1}`,
        "used": false,
        "description": "Billiard table",
        "price": "889.00",
        "inStock": 5,
        "sold": 1,
        "publish": true,
        "images": []
      })
    }
    return products;
  }


  describe('GET /', () => {

    it('should return all products', (done) => {
      // arrange
      const mockProducts = createProducts(2);
     Product
        .insertMany(mockProducts)
        .then( () => {
          // act
          request(server)
          .get('/api/products')
          .then( response => {
            // assert
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body.some( product => product.name === 'mock product 1')).toBeTruthy();
            done();
          })
      })
    })
  
  })

  describe('GET /:id', () => {

    it('should fetch one product by Id', async() => {
      // arrange
      const mockProduct = createProducts(1);
      const product = new Product(mockProduct);
      await product.save();

      // act
      const res = await request(server).get('/api/products/' + product._id);
      
      // assert
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', product.name);
    })

  })

  describe('POST /', () => {

    it('should fetch one product by name', async() => {
  
      // arrange
      const mockProduct = createProducts(1);
      await Product.collection.insertOne(mockProduct);
      
      // act
      const response = await request(server)
        .post('/api/products')
        .send({ name: "mock product 1"})
  
      // assert
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('mock product 1')
      
  
    })
    
  })

  describe('POST /create_product', () => {

    it('should create one product', async () => {

      // arrange
      const mockProduct = createProducts(1);

      // act
      const res = await request(server)
        .post('/api/products/create_product')
        .send(mockProduct)

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'mock product 1');
    })

  })

  describe('PUT /update_product/:id', () => {

    it('should update one product', async() => {
      //arrange
      const mockProduct = createProducts(1);
      const updatedName = "updatedName";
      const product = new Product(mockProduct);
      await product.save();

      // act
      const res = await request(server)
        .put('/api/products/update_product/' + product._id)
        .send({ name: updatedName })

      // assertion
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', updatedName)
    })

  })

  describe('DELETE /delete_product/:id', () => {

    it('should delete one product', async () => {
      // arrange
      const mockProduct = createProducts(1);
      let product = new Product(mockProduct);
      await product.save();
      const productId = product._id;

      // act 
      const res = await request(server)
        .delete('/api/products/delete_product/' + productId);
      
      product = await Product.findById(productId);
      
      // assertion
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'mock product 1');
      expect(product).toBeNull();
    })

  })
})



