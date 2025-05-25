let productsGrid = document.getElementById('products-grid');
let productsArray = [];

let xhr = new XMLHttpRequest();

let url = "https://gagabibi-bfeb.restdb.io/rest"

xhr.open('GET', url + '/products');

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "680e1f1c72702ccba9b3d316");
xhr.setRequestHeader("cache-control", "no-cache");

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
            <p class='product-description'><b>Description: </b>${p.desk}</p>
            <a href="userProfile.html?id=${p.author_id}">Seller profile</a>
            <button onclick="addProductToCart('${p._id}')">Buy</button>
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
    let product = productsArray.find(p => p._id == id)

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
    document.getElementsByClassName("modal")[0].style.display = "block";// окно модал для того чтобы оно было не видимо
}

function openCart() {
    cartProd.classList.toggle('hide');
}

document.getElementById('modal-close').onclick = function(){
    document.getElementsByClassName("modal")[0].style.display = "none";
}

document.getElementById('order-form').addEventListener('submit', function(e){
    e.preventDefault();

    var data = JSON.stringify({
            "name": e.target['name'].value,
            "addres": e.target['address'].value,
            "phone": e.target['phone'].value,
            "post_number": e.target['post_number'].value,
            "status": "new",
            "products": localStorage.getItem('cart')
      });
      
      var xhr = new XMLHttpRequest();
      
      xhr.open("POST", "https://gagabibi-bfeb.restdb.io/rest/orders");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("x-apikey", "680e1f1c72702ccba9b3d316");
      xhr.setRequestHeader("cache-control", "no-cache");
      
      xhr.send(data);
      
      document.getElementsByClassName("modal")[0].style.display = "none";
      catr = [];
      cartProd.innerHTML = "Мне лень писать на английском языке";
      localStorage.setItem("cart", '[]');
})