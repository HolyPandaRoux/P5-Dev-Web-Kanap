
if (localStorage.getItem("cart") === null) {
    document.querySelector('h1').innerHTML += " est vide";

}
/**
 * returns the cart products from local storage.
 * @returns An array of objects.
 */
function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}


/* Updating the cart products in local storage. */
function updateCartProducts(productList) {
    localStorage.setItem("cart", JSON.stringify(productList));
}


/* function that displays the content of the cart. */
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
            </article>`;
            });
    });
}
displayCartContent();


/* Updating the quantity of the product in the cart. */
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
    });
}
updatedProduct();


/* Removing the item from the cart. */
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
    });
}
removeItemFromCart();


/* Calculating the total price and quantity of the products in the cart. */
function totalPriceQuantityCalculation() {
    let productsPanier = getCartProducts();
    let totalPrice = 0;
    let totalQuantity = 0;
    productsPanier.forEach(async (cartProduct) => {
        await fetch("http://localhost:3000/api/products/" + cartProduct.id)

            .then((res) => res.json())
            .then(product => {
                totalPrice += product.price * cartProduct.quantity;
                totalQuantity += cartProduct.quantity;
                document.querySelector("#totalPrice").innerHTML = +totalPrice + ",00 €";
                document.querySelector("#totalQuantity").innerHTML = +totalQuantity;
            });
    });
}
totalPriceQuantityCalculation();

const contentFirstName = document.getElementById('firstName');
const contentLastName  = document.getElementById('lastName');
const contentEmail     = document.getElementById('email');
const contentAdress    = document.getElementById('adress');
const contentCity      = document.getElementById('city');



const form = document.querySelector('cart__order__form');


const checkFirstName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {
    let valid = false;
    const email = contentEmail.value.trim();
    if (!isRequired(email)) {
        showError(contentEmail, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(contentEmail, 'Email is not valid.')
    } else {
        showSuccess(contentEmail);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};
const checkLastName = () => {
    let valid = false;
    const email = contentEmail.value.trim();
    if (!isRequired(email)) {
        showError(contentEmail, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(contentEmail, 'Email is not valid.')
    } else {
        showSuccess(contentEmail);
        valid = true;
    }
    return valid;
};



const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));
        send();
    
/**
 * It takes the data from the form and the cart, and sends it to the server.
 * @returns {
 *     "orderId": "5e8f8f8f8f8f8f8f8f8f8f8f",
 *     "contact": {
 *         "firstName": "John",
 *         "lastName": "Diffool",
 *         "email": "john@diffool.com",
 *         "address": "123
 */

/* Taking the data from the cart and putting it in an array. */
function generateProducts() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let products = [];
    for (let i = 0; i < cart.length; i++) {
        products.push(cart[i].id);
    }
    return products;
}
/* Taking the data from the form and the cart, and sends it to the server. */
function generateContact() {
    const contact = {
        firstName: formFirstName.value,
        lastName : formLastName.value,
        email    : formEmail.value,
        address  : formAddress.value,
        city     : formCity.value,
    };
    return contact;
}
/* function that is waiting for the response from the server. */
async function send() {
    let products = generateProducts();
    let contact  = generateContact();
    let toSend   = { contact, products };
    console.log(contact);
    console.log(products);

    await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toSend)

    })
        .then(response => response.json())
        .then(bodyResponse => {
            window.location.href = `./confirmation.html?orderid=${bodyResponse.orderId}`;
            console.log(bodyResponse)
        })
        .then(localStorage.clear())
        .catch(error => console.log(`error when data sent to server (${error.message}`));
}

