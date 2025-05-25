let productsGrid = document.getElementById('products-grid');
let productsArray = [];

let xhr = new XMLHttpRequest();

let url = "https://my-json-server.typicode.com/2-ESHKERE-1/WebMidSun14_Sanechek";

xhr.open('GET', url + '/products');
xhr.responseType = 'json';

xhr.onload = function() {
    productsArray = xhr.response;
    productsGrid.innerHTML = null;
    productsArray.forEach(p => {
        let pElem = document.createElement('div');
        pElem.classList.add('product');

        pElem.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class='product-photo' src='${p.photo}' alt='${p.name}'>
            <p class='product-price'><b>Price: </b>${p.price}BYN</p>
            <p class='product-description'><b>Description: </b>${p.desc}</p>
            <a href="userProfile.html?id=${p.author_id}">Seller profile</a>
            <button onclick="addProductToCart(${p.id})">Buy</button>
        `;

        productsGrid.append(pElem);
    });
}

xhr.send();

//--------------------------------------------------

let cartProd = document.getElementById('cart-products');

let cart = [];

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));

    drawCartProducts();
}

function addProductToCart(id) {
    let product = productsArray.find(function(p) {
        return p.id == id;
    })

    cart.push(product);

    drawCartProducts();

    localStorage.setItem('cart', JSON.stringify(cart));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function() {
        document.getElementById('cart-button').classList.remove('active');
    }, 500);
}

function drawCartProducts() {
    if (cart.length === 0) return cartProd.innerHTML = 'Cart is empty';

    cartProd.innerHTML = null;
    let sum = 0;

    cart.forEach(function(p) {
        cartProd.innerHTML += `
            <p><img src="${p.photo}"> ${p.name} | ${p.price}$</p>
            <hr>
        `;
        sum += p.price;
    })

    cartProd.innerHTML += `
        <p>Total Price: ${sum}$</p>
        <button onclick="buyAll()">Buy All</button>
    `;
}

function buyAll() {
    console.log("buyall");
    cart = [];
    cartProd.innerHTML = 'Money was withdraw from your credit card';
    localStorage.setItem('cart', '[]');
}

function openCart() {
    cartProd.classList.toggle('hide');
}