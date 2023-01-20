
/* Checking if the localStorage is empty. If it is, it will add the text " est vide" to the h1 tag. */
if (localStorage.getItem("cart") === null) {
    document.querySelector('h1').innerHTML += " est vide";
}

/**
 * returns the cart products from local storage.
 * returns An array of objects.
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
                const elem = document.querySelector("#cart__items");
                let htmlProduct = `
                <article class="cart__item" data-id="${product._id}"  data-color="${cartProduct.color}">
                <div class="cart__item__img">
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description"> 
                            <h2>${product.name}</h2>
                            <p>${cartProduct.color}</p>
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
                elem.insertAdjacentHTML("beforeend", htmlProduct)
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

function totalPriceQuantityCalculation() {
    let productsPanier = getCartProducts();
    let totalPrice = 0;
    let totalQuantity = 0;
    
                productsPanier.forEach(async (cartProduct) => {
                    await fetch("http://localhost:3000/api/products/" + cartProduct.id)
                        .then((res) => res.json())
                        .then(product => 
                            {    // total item quantity
                            totalQuantity += Number(cartProduct.quantity);
                            // total price
                            totalPrice = Number(totalPrice) + Number(product.price) * Number(cartProduct.quantity);
                            if (cartProduct.quantity > 100 ) {
                                totalQuantity -= Number(cartProduct.quantity);
                                alert("Vous ne pouvez pas commander plus de 100 produits");
                                cartProduct.quantity = 0;
                            
                            }
            
                        })
                    document.querySelector("#totalPrice").textContent = totalPrice;
                    document.querySelector("#totalQuantity").textContent = totalQuantity;

            });
    }

totalPriceQuantityCalculation();



let regexName       = /^[a-zA-Z]+$/;
let regexLastName   = /^[a-zA-Z]+$/;
let regexEmail      = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
let regexAdress     = /^[a-zA-Z0-9\s,'-]*$/;
let regexCity       = /^[a-zA-Z\s,'-]*$/;
const formFirstName = document.getElementById('firstName');
const formLastName  = document.getElementById('lastName');
const formEmail     = document.getElementById('email');
const formAddress   = document.getElementById('address');
const formCity      = document.getElementById('city');
const isBetween     = (length, min, max) => length < min || length > max ? false : true;


/**
 * It checks if the length of the input is between the min and max.
 * returns a boolean value.
 */
const checkFirstName      = () => {
    let valid = false;
    /* Declaring two constants. */
    const min = 2,max = 25;
    const firstName = formFirstName.value.trim();
    /* Checking if the length of the input is between the min and max. */
    if (!isBetween(firstName.length, min, max)) {
        document.getElementById('firstNameErrorMsg').innerHTML = "Merci de renseigner votre prénom";
        return false;
    } else {
        valid = true;
    }
    return valid;
};
const checkLastName       = () => {
    let valid = false;
    const min = 2,max = 25;
    const lastName = formLastName.value.trim();
    if (!isBetween(lastName.length, min, max)) {
        document.getElementById('lastNameErrorMsg').innerHTML = "Merci de renseigner votre nom de famille";
        return false;
    } else {
        valid = true;
    }
    return valid;
};
const checkEmail          = () => {
    let valid = false;
    const min = 2,max = 25;
    const email = formEmail.value.trim();
    if (!isBetween(email.length, min, max)) {
        document.getElementById('emailErrorMsg').innerHTML = "Merci de renseigner une adresse mail valide";
        return false;}
    else {
        valid = true;
    }
    return valid;
};
const checkAddress        = () => {
    let valid = false;
    const min = 5,
        max = 50;
    const address = formAddress.value.trim();
    if (!isBetween(address.length, min, max)) {
        document.getElementById('addressErrorMsg').innerHTML = `Votre adresse doit faire entre ${min}  et ${max} lettres.`;
		document.getElementById('addressErrorMsg').style.display = "block";
        return false;
    } 
    else {
        valid = true;
    }
    return valid;
};
const checkCity           = () => {
    let valid = false;
    const min = 2,
        max = 25;
    const city = formCity.value.trim();
    if (!isBetween(city.length, min, max)) {
        document.getElementById('cityErrorMsg').innerHTML = `Le nom de votre ville doit faire entre ${min}  et ${max} lettres.`;
        return false;
    } 
    else {
        valid = true;
    }
    return valid;
};
/**
 * The function checkFirstNameRegex() is called when the user clicks the submit button. It checks if
 * the value of the input field formFirstName matches the regex regexName. If it doesn't, it displays
 * an error message. If it does, it returns true.
**/
const checkFirstNameRegex = () => {
    let valid = false;
formFirstName.addEventListener('input', checkFirstName);
if (regexName.test(formFirstName.value) == false) {
    document.getElementById('firstNameErrorMsg').innerHTML = "Merci de vérifier la saisie de votre prénom";
} else {
    valid = true;
}
return valid;
};
const checkLastNameRegex  = () => {
    let valid=false;
formLastName.addEventListener('input', checkLastName);
if (regexLastName.test(formLastName.value) == false) {
    document.getElementById('lastNameErrorMsg').innerHTML = "Merci de vérifier la saisie de votre nom de famille";
} else {
    valid = true;
}
return valid;
};
const checkEmailRegex     = () => {
    let valid = false;
formEmail.addEventListener('input', checkEmail);
if (regexEmail.test(formEmail.value) == false) {
    document.getElementById('emailErrorMsg').innerHTML = "Merci de vérfier que votre mail est valide";
} else {
    valid = true;
}
return valid;
};
const checkAddressRegex   = () => {
    let valid = false;
formAddress.addEventListener('input', checkAddress);
if (regexAdress.test(formAddress.value) == false) {
    document.getElementById('addressErrorMsg').innerHTML = "Merci de vérifier la saisie de votre adresse";
} else {
    valid = true;
}
return valid;
};
const checkCityRegex      = () => {
    let valid = false;
formCity.addEventListener('input', checkCity);
if (regexCity.test(formCity.value) == false) {
    document.getElementById('cityErrorMsg').innerHTML = "Merci de vérifier la saisie de votre ville";
} else {
    valid = true;
}
return valid;
};



/* Adding an event listener to the button. */
let btnOrder = document.getElementById("order");
btnOrder.addEventListener('click', function (e) {
    e.preventDefault();


    let isFormValid = 
        checkAddressRegex()   && 
        checkCityRegex()      && 
        checkEmailRegex()     && 
        checkFirstNameRegex() && 
        checkLastNameRegex()  &&
        checkFirstName()      &&
        checkLastName()       &&
        checkEmail()          &&
        checkAddress()        &&
        checkCity();
    if (isFormValid) {
        send();
        alert("Merci de votre confiance, votre commande a été validé")
    }
    else {
        alert('Merci de vérifier que vous avez correctement rempli tous les champs');
    }
}
);



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

    /* Sending a POST request to the server with the data toSend. */
    await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toSend)

    })
        /* The above code is sending the data to the server and then redirecting the user to the
        confirmation page. */
        .then(response => response.json())
        .then(bodyResponse => {
            window.location.href = `./confirmation.html?orderid=${bodyResponse.orderId}`;
            console.log(bodyResponse)
        })
        .then(localStorage.clear())
        .catch(error => console.log(`error when data sent to server (${error.message}`));
}

