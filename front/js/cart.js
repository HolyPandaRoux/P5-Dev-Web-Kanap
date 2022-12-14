// get cart products from local storage, for each product present in the localStorage cart we fetch the product data from the api and then display it in the innerHTML of the cart
function displayCartContent() {
    let productsPanier = getCartProducts();
    document.querySelector("#cart__items").innerHTML = '';
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


// Calculcate total price and item quantity
function totalPriceQuantityCalculation() {
    let productsPanier = getCartProducts();
    let totalQuantity = 0;
    let totalPrice = 0;
    if (!productsPanier || productsPanier.length == 0) {
        document.querySelector("#totalPrice").textContent = totalPrice;
        document.querySelector("#totalQuantity").textContent = totalQuantity;
        return null;
    }
    //************************************************************************************************************************************************* */

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
}
totalPriceQuantityCalculation();


// update if any modifications are done by the customer
function updatedProduct() {
    document.addEventListener('change', (event) => {
        if (!(event.target.classList.contains('itemQuantity'))) {
            return;
        }

        const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const colorSelected = event.target.parentElement.parentElement.parentElement.parentElement.dataset.color;
        console.log(id)
        console.log(colorSelected);

        let productsPanier = JSON.parse(localStorage.getItem("cart"));
        console.log(productsPanier);

        const productsFoundIndex = productsPanier.findIndex((product) => product.id === id && product.color === colorSelected);
        console.log('productsFoundIndex:', productsFoundIndex);
        productsPanier[productsFoundIndex].quantity = Number(event.target.value);
        console.log(productsPanier);
        updateCartProducts(productsPanier);
        totalPriceQuantityCalculation();
    })
}
updatedProduct();


// remove product from cart
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


// clear cart
function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}


// update cart
function updateCartProducts(productList) {
    localStorage.setItem("cart", JSON.stringify(productList));
}




function inputValidation() {
form = document.getElementById("cart__order__form");

    function firstNameInputValidation() {
        const first_name_form  = form.firstName;
        const first_name_error = document.getElementById("first_name_error");
        if (/^[A-Za-z]{2,38}$/.test(first_name_form)) {
            first_name_error.innerText = "";
            return true;
        } else {
            first_name_error.innerText ="Votre prénom doit contenir au moins 3 lettres et ne pas contenir de caractère spéciaux ou de chiffres, merci de modifier votre saisie pour continuer";
        }
    }

    function lastNameInputValidation() {
        const last_name_form  = form.lastName;
        const last_name_error = document.getElementById("last_name_error");
        if (/^[A-Za-z]{2,38}$/.test(last_name_form)) {
            last_name_error.innerText = "";
            return true;
        } else {
            last_name_error.innerText ="Votre nom doit contenir au moins 3 lettres et ne pas contenir de caractère spéciaux ou de chiffres, merci de modifier votre saisie pour continuer";
        }
    }

    function addressInputValidation() {
        const address_form  = form.address;
        const address_error = document.getElementById("address_error");
        if (/^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/.test(address_form)) {
            address_error.innerText = "";
            return true;
        } else {
            address_error.innerText ="Votre adresse doit contenir au moins 3 lettres et ne pas contenir de caractère spéciaux ou de chiffres, merci de modifier votre saisie pour continuer";
        }
    }
    function cityInputValidation() {
        const city_form  = form.city;
        const city_error = document.getElementById("city_error");
        if (/^[A-Za-z]{2,38}$/.test(city_form)) {
            city_error.innerText = "";
            return true;
        } else {
            city_error.innerText ="Votre ville doit contenir au moins 3 lettres et ne pas contenir de caractère spéciaux ou de chiffres, merci de modifier votre saisie pour continuer";
        }
    }
    function emailInputValidation() {
        const email_form  = form.email;
        const email_error = document.getElementById("email_error");
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email_form)) {
            email_error.innerText = "";
            return true;
        } else {
            email_error.innerText ="Votre adresse email n'est pas valide, merci de modifier votre saisie pour continuer";
        }
    }
}


