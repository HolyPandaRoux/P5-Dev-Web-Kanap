function      getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}       
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

async function totalPriceQuantityCalculation() {
    let productsPanier = getCartProducts();
    let totalQuantity = 0;
    let totalPrice = 0;
    if (!productsPanier || productsPanier.length == 0) {
        document.querySelector("#totalPrice")   .textContent = totalPrice;
        document.querySelector("#totalQuantity").textContent = totalQuantity;
    }

    productsPanier.forEach(async (cartProduct) => {
        await fetch("http://localhost:3000/api/products/" + cartProduct.id)
            .then((res) => res.json())
            .then(product => 
                {
                    console.log('total quanity',totalQuantity)
                    console.log('Cart product quantity ',cartProduct.quantity)                // total item quantity
                totalQuantity += Number(cartProduct.quantity);
                // total price
                totalPrice = Number(totalPrice) + Number(product.price) * Number(cartProduct.quantity);

            })
        document.querySelector("#totalPrice").textContent = totalPrice;
        document.querySelector("#totalQuantity").textContent = totalQuantity;
    })
}

totalPriceQuantityCalculation();
function       updatedProduct() {
    document.addEventListener('change', (event) => {
        if (!(event.target.classList.contains('itemQuantity'))) {
            return;
        }

        const id = event.target.parentElement.dataset.id;
        const colorSelected = event.target.parentElement.color;
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

function       removeItemFromCart() {
    document.addEventListener('click', (event) => {
        console.log('event :', event);
        if (!(event.target.classList.contains('deleteItem'))) {
            return;
        }
        const id = event.target.parentElement.dataset.id;
        const colorSelected = event.target.parentElement.dataset.color;
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


const formFirstName = document.getElementById('firstName');
const formLastName  = document.getElementById('lastName');
const formEmail     = document.getElementById('email');
const formAddress   = document.getElementById('address');
const formCity      = document.getElementById('city');
const form          = document.getElementById('order');

const checkFirstName    = () => {

    let valid = false;
    
    const min = 2,
        max = 25;
    
        const firstName = formFirstName.value.trim();
    
        if (!isRequired(firstName)) {
        showError(formFirstName, 'First name cannot be blank.');
    } else if (!isBetween(firstName.length, min, max)) {
        showError(formFirstName, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(formFirstName);
        valid = true;
    }
    return valid;
};
const checkLastName     = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const lastName = formLastName.value.trim();
    if (!isRequired(lastName)) {
        showError(formLastName, 'Last name cannot be blank.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(formLastName, `Last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(formLastName);
        valid = true;
    }
    return valid;
};
const checkEmail        = () => {
    let valid = false;
    const email = formEmail.value.trim();
    if (!isRequired(email)) {
        showError(formEmail, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(formEmail, 'Email is not valid.')
    } else {
        showSuccess(formEmail);
        valid = true;
    }
    return valid;   
};
const checkAddress      = () => {
    let valid = false;
    const min = 5,
        max = 50;
    const address = formAddress.value.trim();
    if (!isRequired(address)) {
        showError(formAddress, 'Address cannot be blank.');
    } else if (!isBetween(address.length, min, max)) {
        showError(formAddress, `Address must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(formAddress);
        valid = true;
    }
    return valid;
};
const checkCity         = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const city = formCity.value.trim();
    if (!isRequired(city)) {
        showError(formCity, 'City cannot be blank.');
    } else if (!isBetween(city.length, min, max)) {
        showError(formCity, `City must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(formCity);
        valid = true;
    }
    return valid;
};
const isEmailValid      = (email)     => {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const patternMatches = regEx.test(email);
};
const isFirstNameValid  = (firstName) => {
    const regEx = /^[a-zA-Z]+$/;
    const patternMatches = regEx.test(firstName);
};
const isLastNameValid   = (lastName)  => {
    const regEx = /^[a-zA-Z]+$/;
    const patternMatches = regEx.test(lastName);
};
const isAddressValid    = (address)   => {
    const regEx = /^[a-zA-Z0-9\s,'-]*$/;
    const patternMatches = regEx.test(address);
};
const isCityValid       = (city)      => {
    const regEx = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    const patternMatches = regEx.test(city);
};

const isRequired = value => value === '' ? false : true;
const isBetween  = (length, min, max) => length < min || length > max ? false : true;


const showError   = (input, message) => {
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
form.addEventListener('order', function (e) {
    // prevent the form from submitting
    e.preventDefault();


    let isFirstNameValid = checkFirstName(),
        isLastNameValid  = checkLastName (),
        isEmailValid     = checkEmail    (),
        isAddressValid   = checkAddress  (),
        isCityValid      = checkCity     ();

    let isFormValid =   isFirstNameValid && 
                        isLastNameValid  && 
                        isEmailValid     && 
                        isAddressValid   && 
                        isCityValid;
    if (isFormValid) {
        console.log('form is valid');
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
            case 'firstName':
                checkFirstName();
                break;
            case 'lastName':
                checkLastName();
                break;
            case 'email':
                checkEmail();
                break;
            case 'address':
                checkAddress();
                break;
            case 'city':
                checkCity();
                break;
        }
}));

// generate an async function to send the data from the server and from the cart to the server using POST method and fetch
async function send() {
    let idList = generateProductIdList();

    const toSend = {
        "contact": { // envoie l'objet contact
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value,
            "address": addressInput.value,
            "city": cityInput.value,
            "email": emailInput.value
        },
        "products": idList // envoie le tableau des produits
    }
    await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSend)
    })

        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then(function (result) { // dirige vers la page de validation de commande, en injectant l'id de la commande dans l'url
            document.location.href = `confirmation.html?orderId=${result.orderId}`
        })
}

// fonction qui récupère les ids uniques des produits dans le localstorage "cart", pour les réunir dans le tableau qui sera envoyé lors de la commande
function generateProductIdList() {
    const myCart = JSON.parse(localStorage.getItem("cart"))
    const idList = myCart.map((product) => product.id) // récupère les ids
    const noDuplicate = [...new Set(idList)] // créé un tableau des ids en supprimant les doublons
    return noDuplicate
}