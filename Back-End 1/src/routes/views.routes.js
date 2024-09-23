const express = require('express');
const router = express.Router();
const ProductManager = require('../models/ProductManager');

router.get('/', (req, res) => {
    const products = ProductManager.getProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;