const socket = io();

socket.on('updateProducts', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card card-product">
                    <img src="https://source.unsplash.com/400x300/?${product.title}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                        <a href="#" class="btn btn-outline-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
});
