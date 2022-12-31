
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



const formFirstName = document.getElementById('firstName');
const formLastName  = document.getElementById('lastName');
const formEmail     = document.getElementById('email');
const formAddress   = document.getElementById('address');
const formCity      = document.getElementById('city');
const form          = document.getElementById('order');
const errors        = [];


/**
 * If the length of the input is not between the min and max, then push the input and the error message
 * to the errors array.
 * @returns The return value is the result of the last expression evaluated in the function.
 */
const checkFirstName = () => {
    let valid = false;
    /* Declaring two constants. */
    const min = 2,
        max = 25;
    const firstName = formFirstName.value.trim();
    /* Checking if the length of the input is between the min and max. */
    if (!isBetween(firstName.length, min, max)) {
        errors.push(formFirstName, `First name must be between ${min} and ${max} characters.`)
    } else {
        valid = true;
    }
    return valid;
};
const checkLastName  = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const lastName = formLastName.value.trim();
    if (!isBetween(lastName.length, min, max)) {
        errors.push(formLastName, `Last name must be between ${min} and ${max} characters.`)
    } else {
        valid = true;
    }
    return valid;
};
const checkEmail     = () => {
    let valid = false;
    const email = formEmail.value.trim();
    if (!contentEmailValidation(email)) {
        errors.push(formEmail, 'Email is not valid.')
    } else {
        valid = true;
    }
    return valid;
};
const checkAddress   = () => {
    let valid = false;
    const min = 5,
        max = 50;
    const address = formAddress.value.trim();
    if (!isBetween(address.length, min, max)) {
        errors.push('klkfjdslkfjdsmlqkfjdqslkmjfds')
    } else {
        valid = true;
    }
    return valid;
};
const checkCity      = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const city = formCity.value.trim();
    if (!isBetween(city.length, min, max)) {
        errors.push(formCity, `City must be between ${min} and ${max} characters.`)
    } else {
        valid = true;
    }
    return valid;
};


/**
 * If the input is a string of letters, numbers, spaces, commas, apostrophes, and hyphens, then return
 * true.
 * @param email - /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-
 * @returns function that takes a string and returns a boolean.
 */
const contentEmailValidation     = (email)     => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};
const contentFirstNameValidation = (firstName) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(firstName);
};
const contentLastNameValidation  = (lastName)  => {
    const re = /^[a-zA-Z]+$/;
    return re.test(lastName);
};
const contentAdressValidation    = (address)   => {
    const re = /^[a-zA-Z0-9\s,'-]*$/;
    return re.test(address);
};
const contentCityValidation      = (city)      => {
    const re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    return re.test(city);
};

const isBetween = (length, min, max) => length < min || length > max ? false : true;


/* Preventing the default action of the button. */
let btnOrder = document.getElementById("order");
btnOrder.addEventListener('click', function (e) {
    e.preventDefault();


  /* Checking if the form is valid. */
    let contentFirstNameValidation = checkFirstName(),
        contentLastNameValidation  = checkLastName(),
        contentEmailValidation     = checkEmail(),
        contentAdressValidation    = checkAddress(),
        contentCityValidation      = checkCity();

    let isFormValid = contentFirstNameValidation 
    &&  contentLastNameValidation 
    &&  contentEmailValidation 
    &&  contentAdressValidation 
    &&  contentCityValidation;
    if (isFormValid) {
        send();
    }
    else {
        alert('Merci de vérifier que vous avez correctement rempli tous les champs');
    }
}
);


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
