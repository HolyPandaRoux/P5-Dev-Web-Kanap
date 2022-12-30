
//get the cart data from the precedent page localStorage service
function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}
// update the cart data in the localStorage service on the spot 
function updateCartProducts(productList) {
    localStorage.setItem("cart", JSON.stringify(productList));
}

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
            </article>`;
            });
    });
}
displayCartContent();

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
    });
}
updatedProduct();

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
    });
}
removeItemFromCart();
// create a function named totalPriceQuantityCalculation to calculate the total price and total quantity of the cart, get the value of the quantity of each product and multiply it by the price of the product , then add the result to the total price and total quantity of the cart , then display the result in the innerHTML of the cart page, this function is called at the end of each function to update the total price and total quantity of the cart after any modification made by the customer


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
    });}

totalPriceQuantityCalculation();





const formFirstName = document.getElementById('firstName');
const formLastName  = document.getElementById('lastName');
const formEmail     = document.getElementById('email');
const formAddress   = document.getElementById('address');
const formCity      = document.getElementById('city');
const form          = document.getElementById('order');


const checkFirstName = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const firstName = formFirstName.value.trim();
    if (!isBetween(firstName.length, min, max)) {
        console.log(formFirstName, `First name must be between ${min} and ${max} characters.`)
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
        console.log(formLastName, `Last name must be between ${min} and ${max} characters.`)
    } else {
        valid = true;
    }
    return valid;
};
const checkEmail     = () => {
    let valid = false;
    const email = formEmail.value.trim();
    if (!contentEmailValidation(email)) {
        console.log(formEmail, 'Email is not valid.')
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
        showError('klkfjdslkfjdsmlqkfjdqslkmjfds')
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
        console.log(formCity, `City must be between ${min} and ${max} characters.`)
    } else {
        valid = true;
    }
    return valid;
};


const contentEmailValidation     = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};
const contentFirstNameValidation = (firstName) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(firstName);
};
const contentLastNameValidation  = (lastName) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(lastName);
};
const contentAdressValidation    = (address) => {
    const re = /^[a-zA-Z0-9\s,'-]*$/;
    return re.test(address);
};
const contentCityValidation      = (city) => {
    const re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    return re.test(city);
};

const isBetween = (length, min, max) => length < min || length > max ? false : true;


let btnOrder = document.getElementById("order");
btnOrder.addEventListener('click', function (e) {
    e.preventDefault();

    
    let contentFirstNameValidation = checkFirstName(),
        contentLastNameValidation = checkLastName(),
        contentEmailValidation = checkEmail(),
        contentAdressValidation = checkAddress(),
        contentCityValidation = checkCity();

    let isFormValid = contentFirstNameValidation &&
        contentLastNameValidation &&
        contentEmailValidation &&
        contentAdressValidation &&
        contentCityValidation;
    if (isFormValid) {
        send();
    }
    else { 
        alert('Merci de vérifier que vous avez correctement rempli tous les champs');
    }
    }
);



function generateProducts() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let products = [];
    for (let i = 0; i < cart.length; i++) {
        products.push(cart[i].id);
    }
    return products;
}
function generateContact() {
    const contact = {
        firstName: formFirstName.value,
        lastName: formLastName.value,
        email: formEmail.value,
        address: formAddress.value,
        city: formCity.value,
    };
    return contact;
}
async function send() {
    let products = generateProducts();
    let contact = generateContact();
    let toSend = { contact, products };
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
    