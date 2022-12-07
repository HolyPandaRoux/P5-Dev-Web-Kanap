let allProducts = [];


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
    
getProductsId();










function displayCart(fullCart) {
    const displayZone = document.querySelector("#cart__items");
    displayZone.innerHTML +=
        `<article class="cart__item" data-id="${fullCart.id}" data-color="${fullCart.color}" data-quantity="${fullCart.quantity}" data-price="${fullCart.price}"> 
            <div class="cart__item__img">
                <img src="${fullCart.imageUrl}" alt="${fullCart.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${fullCart.name}</h2>
                    <span>Couleur : ${fullCart.color}</span>
                    <p data-price="${fullCart.price}">Prix : ${fullCart.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantité : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${fullCart.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${fullCart.id}" data-color="${fullCart.color}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `

};





/*
let cartName = allProducts.name;
let cartDescription = allProducts.description;
let cartPrice = allProducts.price;
let cartUrl = allProducts.imageUrl;
let cartAltTxt = allProducts.altTxt;
let cartId = allProducts._id.valueOf ;
let cartQuantity = getPanier.quantity;
let cartColor = getPanier.color;
console.log(cartName, cartDescription, cartPrice, cartUrl,cartAltTxt, cartId, cartQuantity, cartColor);
$fullCart = array(
    "allProducts[i].name" = "selectedName",
    "allProducts[i].description" = "selectedDescription",
    "allProducts[i].price" = "selectedPrice",
    "allProducts[i].imageUrl" = "selectedImageUrl",
    "allProducts[i].altTxt" = "selectedAltTxt",
    "allProducts[i]._id" = "selectedId",
    "panier[i].quantity" = "quantity",
    "panier[i].color" = "color",
)
print_r($array),
console.log(fullCart);
    



    
let fullCart = [];
    for (let i = 0; i < allProducts.length; i++) {
        let selectedName                    = allProducts[i].name;
        let description			            = allProducts[i].description;
        let price 							= allProducts[i].price;
        let imageUrl 						= allProducts[i].imageUrl;
        let altTxt 							= allProducts[i].altTxt;
        let quantity                        = panier[i].quantity;
        let color                           = panier[i].color;
        let id                              = allProducts[i]._id;
    fullCart.push(selectedName, description, price, imageUrl, altTxt, quantity, color,id)
    console.log(fullCart);

    
    }
    */