let productForm = document.getElementById("add-product-form");

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Правильное получение значений из формы
    let data = JSON.stringify({
        name: event.target["name"].value,
        desk: event.target["desc"].value,
        price: event.target["price"].value,
        photo: event.target["photo"].value,
        author_id: event.target["author_id"].value,
    });

    // Очистка значений полей формы
    event.target.elements["name"].value = "";
    event.target.elements["desc"].value = "";
    event.target.elements["price"].value = "";
    event.target.elements["photo"].value = "";
    event.target.elements["author_id"].value = "";

    // Проверка, что объект XMLHttpRequest создан корректно
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function(){
        if(this.readyState === 4){
            console.log(this.responseText); // `responseText` вместо `response`
        }
    });

    xhr.open("POST", "https://gagabibi-bfeb.restdb.io/rest/orders");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "680e1f1c72702ccba9b3d316");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
});

let orders = document.getElementById("admin_page_orders");

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://gagabibi-bfeb.restdb.io/rest/orders");
xhr.responseType = "json";

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "680e1f1c72702ccba9b3d316");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.onload = function(){
    xhr.response.forEach(function(order){
        let orderElement = document.createElement('div')
        orderElement.classList.add('product')

        let statusColor = 'green';
        if(orderStatus = 'Completed'){
            statusColor = 'yellow';
        }

        orderElement.innerHTML +=`
        <h2>Order: ${order._id}</h2>
        <p><b>Status:</b> <span style="color:${statusColor}">${order.status}</span></p>
        <p><b>Customer name: </b> ${order.name}</p>
        <p><b>Address: </b> ${order.address}</p>
        <p><b>Phone: </b> ${order.phone}</p>
        <p><b>Post Office Number: </b> ${order.post_number}</p>
        `;

        let sum = 0;

        order.products.forEach(function(p) {
            sum += p.price;
        })

        orderElement.innerHTML += `

            <p>Total price: ${sum}$</p>
            <button onclick="'>Mark as Completed</button>
        `;

        orders.append(orderElement);

    })
}

xhr.send();