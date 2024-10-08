const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

class CartManager {
    static async removeProductFromCart(cartId, productId) {
        await Cart.updateOne(
            { _id: cartId },
            { $pull: { products: { product: productId } } }
        );
    }

    static async updateCart(cartId, products) {
        await Cart.findByIdAndUpdate(cartId, { products });
    }

    static async updateProductQuantity(cartId, productId, quantity) {
        await Cart.updateOne(
            { _id: cartId, 'products.product': productId },
            { $set: { 'products.$.quantity': quantity } }
        );
    }

    static async clearCart(cartId) {
        await Cart.findByIdAndUpdate(cartId, { products: [] });
    }

    static async getCartById(cartId) {
        return Cart.findById(cartId).populate('products.product');
    }
}

module.exports = CartManager;