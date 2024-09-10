const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = path.join(__dirname, '..', 'data', filePath);
    }

    async getProducts(limit) {
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            return limit ? products.slice(0, limit) : products;
        } catch (error) {
            console.error('Error leyendo el archivo de productos:', error);
            throw new Error('No se pudo obtener los productos');
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id === id);
            if (!product) {
                throw new Error(`Producto con id ${id} no encontrado`);
            }
            return product;
        } catch (error) {
            console.error('Error buscando producto:', error);
            throw new Error(`Error buscando producto con id ${id}`);
        }
    }

    async addProduct(product) {
        try {
            if (!product.name || !product.price || !product.stock) {
                throw new Error('El producto debe tener nombre, precio y stock');
            }

            const products = await this.getProducts();
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            const newProduct = { id: newId, status: true, ...product };

            products.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error('Error añadiendo producto:', error);
            throw new Error('No se pudo añadir el producto');
        }
    }
}

module.exports = ProductManager;
