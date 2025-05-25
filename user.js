const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const profile = document.getElementById('profile');
const productsGrid = document.getElementById('user-products-grid');

let url = "https://my-json-server.typicode.com/2-ESHKERE-1/WebMidSun14_Sanechek";

let userRequest = new XMLHttpRequest();
userRequest.open('GET', `${url}/users/${id}`);
userRequest.responseType = 'json';
userRequest.onload = function() {
    let user = userRequest.response;

    profile.innerHTML = `
        <h1>${user.name}</h1>
        <h2>${user.surname}</h2>
        <img class="profile-img" src="${user.photo}">
        <p>Balance: ${user.balance}$</p>
    `
}

userRequest.send();


let productsRequest = new XMLHttpRequest();
productsRequest.open('GET', `${url}/products?author_id=${id}`);
productsRequest.responseType = 'json';
productsRequest.onload = function() {
    let products = productsRequest.response;
    productsGrid.innerHTML = null;
    products.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product">
                <h2 class="product-name">${product.name}</h2>
                <img class="product-photo" src="${product.photo}" alt="${product.name}">
                <p class="product-price"><b>Price: </b>${product.price}$</p>
                <p class="product-description"><b>Description: </b>${product.desc}</p>
            </div>
        `
    });
}

productsRequest.send();