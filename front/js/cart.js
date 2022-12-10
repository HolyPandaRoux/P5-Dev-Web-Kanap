

/**
 * It calculates the total price and quantity of the products in the cart
 * @returns The total price and quantity of the products in the cart.
 */
function totalPriceQuantityCalculation() {
    let productsPanier = getCartProducts();
    let totalQuantity = 0;
    let totalPrice = 0;

    /* It checks if the cart is empty or not. If it is empty, it displays the total price and quantity
    of the products in the cart. */
    if (!productsPanier || productsPanier.length == 0) {
        document.querySelector("#totalPrice")   .textContent = totalPrice;
        document.querySelector("#totalQuantity").textContent = totalQuantity;
        return null;
    }

    /* Calculating the total price and quantity of the products in the cart. */
    productsPanier.forEach(async (cartProduct) => {
        await fetch("http://localhost:3000/api/products/" + cartProduct.id)
            .then((res) => res.json())
            .then(product => {
                // total item quantity
                totalQuantity = cartProduct.quantity + totalQuantity;
                // total price
                totalPrice    = totalPrice + product.price * cartProduct.quantity;

            })
        document.querySelector("#totalPrice")   .textContent = totalPrice;
        document.querySelector("#totalQuantity").textContent = totalQuantity;
    })
}
totalPriceQuantityCalculation();

/**
 * It updates the quantity of a product in the cart
 */
function updatedProduct() {
    /* Listening to the change event on the input element with the class itemQuantity. */
    document.addEventListener('change', (event) => {
        if (!(event.target.classList.contains('itemQuantity'))) {
            return;
        }

        /* It gets the id and the color of the product that the user wants to update or delete. */
        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const colorSelected = event.target.parentElement.parentElement.parentElement.parentElement.dataset.color;
        console.log(id)
        console.log(colorSelected);

        /* It gets the cart products from local storage. */
        let productsPanier = JSON.parse(localStorage.getItem("cart"));
        console.log(productsPanier);

        /* Updating the quantity of a product in the cart. */
        const productsFoundIndex = productsPanier.findIndex((product) => product.id === id && product.color === colorSelected);
        console.log('productsFoundIndex:', productsFoundIndex);
        productsPanier[productsFoundIndex].quantity = Number(event.target.value);
        console.log(productsPanier);
        cartUpdated(productsPanier);
        totalPriceQuantityCalculation();
    })
}
updatedProduct();

/**
 * It removes an item from the cart when the user clicks on the delete button
 */
function removeItemFromCart() {
    /* It listens to the click event on the delete button. */
    document.addEventListener('click', (event) => {
        console.log('event :', event);
        if (!(event.target.classList.contains('deleteItem'))) {
            return;
        }
        /* It gets the id and the color of the product that the user wants to update or delete. */
        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const colorSelected = event.target.parentElement.parentElement.parentElement.parentElement.dataset.color;
        console.log(id);
        console.log(colorSelected);

        /* It gets the cart products from local storage. */
        let productsPanier = JSON.parse(localStorage.getItem("cart"));
        console.log(productsPanier);

        /* It removes the product from the cart. */
        const productsFoundIndex = productsPanier.findIndex((product) => product.id === id && product.color === colorSelected);
        console.log('productsFoundIndex:', productsFoundIndex);
        productsPanier.splice(productsFoundIndex, 1);
        cartUpdated(productsPanier);
        displayCartContent();
        totalPriceQuantityCalculation();
    })
}
removeItemFromCart();

/**
 * It returns the cart products from local storage
 * @returns the value of the localStorage item "cart"
 */
function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}

/**
 * When the cart is updated, save the new cart to local storage.
 * @param productList - The updated product list.
 */
function cartUpdated(productList) {
    localStorage.setItem("cart", JSON.stringify(productList));
}

/**
 * It fetches the products from the API, then displays them in the cart
 */
function displayCartContent() {
    let productsPanier = getCartProducts();
    document.querySelector("#cart__items").innerHTML = '';
    /* Fetching the products from the API, then displays them in the cart. */
    productsPanier.forEach(async (cartProduct) => {
        await fetch("http://localhost:3000/api/products/" + cartProduct.id)
            .then((res) => res.json())
            .then(product => {
                document.querySelector("#cart__items").innerHTML +=


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






