const express = require('express');
const router = express.Router();
const CartManager = require('../models/CartManager');

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await CartManager.removeProductFromCart(cid, pid);
        res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        await CartManager.updateCart(cid, products);
        res.json({ status: 'success', message: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        await CartManager.updateProductQuantity(cid, pid, quantity);
        res.json({ status: 'success', message: 'Product quantity updated' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        await CartManager.clearCart(cid);
        res.json({ status: 'success', message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartManager.getCartById(cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

module.exports = router;
