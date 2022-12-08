let allProducts     = [];
const cartSection   = document.getElementById        ("cart__items");
const cartOrder     = document.getElementsByClassName("cart__order");
const cartPrice     = document.getElementsByClassName("cart__price");
const h1            = document.getElementsByTagName  ("h1");

function getPanier() {
    return localStorage.getItem('cart');
}

let panier = getPanier();
panier = JSON.parse(panier);
console.table(panier);

async function getAllProducts() {
    for (let i = 0; i < panier.length; i++) {
        console.log(panier[i]);
        const product = await getProductById(panier[i].id);
        console.log(product);
    }
}
getAllProducts();


function getProductById(id) {
    return fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json());
}
getProductById();

async function getProductsId() {
    for (let i = 0; i < index.length; i++) {
        console.log(index[i]);
    }
}
getProductsId();


function fetchIdData() {
    let items = getPanier();
    let quantity = 0;
    let price = 0;
    if (localStorage.getItem("panier") != null) {
    for (let i = 0; i < items.length; i++) {
        let id = items[i][0];
        let color = items[i][1];
        let url = host + "api/products/" + id;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                cartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                    <div class="cart__item__img">
                    <img src="${data.imageUrl}" alt="${data.altTxt}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${data.name}</h2>
                        <p>${color}</p>
                        <p>${data.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté :${quantity} </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${items[i][2]}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" onclick="deleteItem('${id}','${color}')">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`;
            // total price (if qty (items[i][2]))
            price += data.price * items[i][2];
            document.getElementById("totalPrice").innerHTML = price;
            });
        }
    }
}




