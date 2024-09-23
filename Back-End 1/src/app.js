const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');
const viewsRoutes = require('./routes/views.routes');
const ProductManager = require('./models/ProductManager');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);