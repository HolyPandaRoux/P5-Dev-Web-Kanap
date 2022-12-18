/**
 * It returns the value of the "cart" key in localStorage, parsed as JSON.
 * @returns the value of the localStorage item "cart" which is a string.
 */
function      getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}       
// get cart products from local storage, for each product present in the localStorage cart we fetch the product data from the api and then display it in the innerHTML of the cart
/**
 * It displays the content of the cart.
 */
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

/* Fetching the product from the database and then calculating the total price and quantity of the
product. */
async function totalPriceQuantityCalculation() {
    let productsPanier = getCartProducts();
    let totalQuantity = 0;
    let totalPrice = 0;
    if (!productsPanier || productsPanier.length == 0) {
        document.querySelector("#totalPrice")   .textContent = totalPrice;
        document.querySelector("#totalQuantity").textContent = totalQuantity;
    }

    /* Fetching the product from the database and then calculating the total price and quantity of the
    product. */
    productsPanier.forEach(async (cartProduct) => {
        await fetch("http://localhost:3000/api/products/" + cartProduct.id)
            .then((res) => res.json())
            .then(product => 
                {
                    console.log('total quantity',totalQuantity)
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

function removeItemFromCart() {
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



const formFirstName = document.getElementById('firstName');
const formLastName  = document.getElementById('lastName');
const formEmail     = document.getElementById('email');
const formAddress   = document.getElementById('address');
const formCity      = document.getElementById('city');
const form          = document.getElementById('order');

/**
 * If the value of the input is not blank, and the length of the value is between the min and max, then
 * show success, otherwise show error.
 * @returns The return value is a boolean.
 */
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
/**
 * If the input matches the regular expression, return true, otherwise return false.
 * @param email - [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*
 */
const isEmailValid      = (email)     => {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};
const isFirstNameValid  = (firstName) => {
    const regEx = /^[a-zA-Z]+$/;
    return re.test(firstName);
};
const isLastNameValid   = (lastName)  => {
    const regEx = /^[a-zA-Z]+$/;
    return re.test(lastName);
};
const isAddressValid    = (address)   => {
    const regEx = /^[a-zA-Z0-9\s,'-]*$/;
    return re.test(address);
};
const isCityValid       = (city)      => {
    const regEx = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    return re.test(city);
};

const isRequired = value => value === '' ? false : true;
const isBetween  = (length, min, max) => length < min || length > max ? false : true;


/**
 * When the form is submitted, prevent the form from submitting, check the validity of each input, and
 * if all inputs are valid, submit the form.
 * @param input - the input element that is being validated
 * @param message - The message to display to the user.
 */
const showAlert = ()
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
    formField.classList.add('success');

}
let btnOrder = document.getElementById("order");
btnOrder.addEventListener('click', function (e) {
    console.log("Form Submitted");
    e.preventDefault();


   /* Checking the validity of the form. */
    let isFirstNameValid = checkFirstName(),
        isLastNameValid  = checkLastName (),
        isEmailValid     = checkEmail    (),
        isAddressValid   = checkAddress  (),
        isCityValid      = checkCity     ();
/* The above code is checking to see if all the variables are true. If they are all true, then the form
is valid. */

    let isFormValid =   isFirstNameValid && 
                        isLastNameValid  && 
                        isEmailValid     && 
                        isAddressValid   && 
                        isCityValid;
    if (isFormValid) {
    Send();
    }
});
/**
 * It returns a function that will call the original function after a delay, but if the function is
 * called again before the delay, it will cancel the previous call and start the delay over again.
 * @param fn - The function to be debounced.
 * @param [delay=500] - The time in milliseconds to wait before calling the function.
 * @returns A function that takes in a function and a delay.
 */
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
/* Adding an event listener to the form. The event listener is listening for an input event. When the
input event is triggered, the debounce function is called. The debounce function is passed an
anonymous function. The anonymous function is passed the event object. The anonymous function has a
switch statement. The switch statement is checking the id of the event target. If the id is
firstName, the checkFirstName function is called. If the id is lastName, the checkLastName function
is called. If the id is email, the checkEmail function is called. etc.... */
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
        document.localStorage.setItem(JSON.stringify(form));
}));
console.log(JSON.parse(localStorage.getItem('form')));
console.log(JSON.parse(localStorage.getItem('cart')));
console.log(JSON.parse(localStorage.getItem('cartPrice')));
console.log(JSON.parse(localStorage.getItem('cartQuantity')));

const readyToSendForm         = JSON.parse(localStorage.getItem('form'));
const readyTosendCart         = JSON.parse(localStorage.getItem('cart'));
const readyToSendCartPrice    = JSON.parse(localStorage.getItem('cartPrice'));
const readyToSendCartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));

async function Send() {
    let productsId = generateProductsId();

    const readyToSend= {
        contact : {
        "fistName"  : readyToSendForm.firstName.value,
        "lastName"  : readyToSendForm.lastName.value,
        "email"     : readyToSendForm.email.value,
        "address"   : readyToSendForm.address.value,
        "city"      : readyToSendForm.city.value,
    },
    "products": productsId
    }
    let cart      = localStorage.getItem('cart');
    let cartPrice = localStorage.getItem('cartPrice');
    let order     = {
            firstName : formFirstName.value,
            lastName  : formLastName.value,
            email     : formEmail.value,
            address   : formAddress.value,
            city      : formCity.value,
            cart      : cart,
            cartPrice : cartPrice,
            products  : productsId,
        };

        await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
            
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Order submitted!');
            localStorage.clear();
            location.reload();
        })
        .then(function (result) {
            document.location.href = `confirmation.html?orderId=${result.orderId}`;
        })
        .catch((error) => {
            console.error('Error when tried to send data to the server', error);
        });
}
function generateProductsId() {
    const customerCart = JSON.parse(localStorage.getItem('cart'))
    const productsIdList = customerCart.map((product) => product._id);
    const noDuplicate =  [...new Set(productsIdList)];
    return noDuplicate;
}

