const express = require('express');
const router = express.Router();
const CartManager = require('../models/CartManager');

const cartManager = new CartManager('carts.json');

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(parseInt(req.params.cid));
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
