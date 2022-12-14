//get the cart data from the precedent page localStorage service
function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}
// update the cart data in the localStorage service on the spot 
function updateCartProducts(productList) {
    localStorage.setItem("cart", JSON.stringify(productList));
}




// remove product from cart depending on the action from listener click on the delete button
function removeItemFromCart() {
    document.addEventListener('click', (event) => {
        console.log('event :', event);
        if (!(event.target.classList.contains('deleteItem'))) {
            return;
        }
        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const colorSelected = event.target.parentElement.parentElement.parentElement.parentElement.dataset.color;
        console.log(id);
        console.log(colorSelected);

        let productsPanier = JSON.parse(localStorage.getItem("cart"));
        console.log(productsPanier);

        const productsFoundIndex = productsPanier.findIndex((product) => product.id === id && product.color === colorSelected);
        console.log('productsFoundIndex:', productsFoundIndex);
        productsPanier.splice(productsFoundIndex, 1);
        updateCartProducts(productsPanier);
        displayCartContent();
        totalPriceQuantityCalculation();
    })
}
removeItemFromCart();




// get cart products from local storage, for each product present in the localStorage cart we fetch the product data from the api and then display it in the innerHTML of the cart
function displayCartContent() {
    let productsPanier = getCartProducts();
    document.querySelector("#cart__items").innerHTML = '';
    productsPanier.forEach(async (cartProduct) => {
//get the missing data from the api using the product id ( more or less like on the index.js page)
        await fetch("http://localhost:3000/api/products/" + cartProduct.id)
            .then((res) => res.json())
            .then(product => {
                document.querySelector("#cart__items").innerHTML +=
//display for each product the data , depending of the location of the data cartProduct for localStorage data et product for api data
                    `<article class="cart__item" data-id="${product._id}"  data-color="${cartProduct.color}">
                <div class="cart__item__img">
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description"> 
                            <h2>${product.name}</h2>
                            <p>${cartProduct.color}</p>
                            <p>${product.price},00 €</p>
                        </div>
                        <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartProduct.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`
            })
    })
}
displayCartContent();


// add and update the cart quantity and price , depending on the listener event.target.value
productsPanier.forEach(async (cartProduct) => {
    await fetch("http://localhost:3000/api/products/" + cartProduct.id)
        .then((res) => res.json())
        .then(product => {
            // total item quantity
            totalQuantity += cartProduct.quantity;
            // total price
            totalPrice = totalPrice + product.price * cartProduct.quantity;

        })
    document.querySelector("#totalPrice").textContent = totalPrice;
    document.querySelector("#totalQuantity").textContent = totalQuantity;
})
totalPriceQuantityCalculation();

