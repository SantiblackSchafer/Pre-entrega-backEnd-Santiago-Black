const fs = require('fs').promises;
const path = require('path');

class CartManager {
    constructor(filePath) {
        this.path = path.join(__dirname, '..', 'data', filePath);
    }

    async getCarts() {
        return JSON.parse(await fs.readFile(this.path, 'utf-8'));
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === id);
    }

    async addCart() {
        const carts = await this.getCarts();
        const newId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
        const newCart = { id: newId, products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);
        if (cartIndex === -1) throw new Error('Cart not found');

        const productIndex = carts[cartIndex].products.findIndex(p => p.product === productId);
        if (productIndex === -1) {
            carts[cartIndex].products.push({ product: productId, quantity });
        } else {
            carts[cartIndex].products[productIndex].quantity += quantity;
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return carts[cartIndex];
    }
}

module.exports = CartManager;