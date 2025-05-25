const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const profile = document.getElementById('profile');
const productsGrid = document.getElementById('user-products-grid');

let url = "https://my-json-server.typicode.com/2-ESHKERE-1/WebMidSun14_Sanechek";

let userRequest = new XMLHttpRequest();
userRequest.open('GET', `${url}/products/${id}`);
userRequest.responseType = 'json';
userRequest.onload = function() {
    let product = userRequest.response;
    profile.innerHTML = `
            <h2 class='product-name'>${product.name}</h2>
            <img class='product-photo' src='${product.photo}' alt='${product.name}'>
            <p class='product-price'><b>Price: </b>${product.price}BYN</p>
            <p class='product-description'><b>Description: </b>${product.desc}</p>
            <a href="userProfile.html?id=${product.author_id}">Seller profile</a>
            <button onclick="addProductToCart(${product.id})">Buy</button>
        `;
}

userRequest.send();