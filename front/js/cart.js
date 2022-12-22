
const cartStatus = JSON.parse(localStorage.getItem("cart"));
function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart"));
}
function totalQuantity() {
    let totalQuantity = document.getElementById('totalQuantity');
    let quantitiesProduct = document.querySelectorAll('.itemQuantity');
    let totalQuantities = 0;
    quantitiesProduct.forEach(qte =>{
    totalQuantities += Number(qte.value);
    })
    return totalQuantity.innerHTML = totalQuantities;
}

// fonction qui calcul le prix des produits par quantité et le prix total
function totalPrice() {
    let totalPrice = document.getElementById("totalPrice")
    let priceItem = document.querySelectorAll(".priceItem")
    total = 0;
    priceItem.forEach(price => {
        total += Number(price.textContent);
        console.log(typeof price.textContent);
    })
    return totalPrice.innerHTML = total;
}

priceItem.innerHTML=inputQuantity.value * eltItem.price;
        totalPrice()
        totalQuantity()
            
        // changement des quantités avec la maj des tarifs, des quantités et du local storage
        inputQuantity.addEventListener("change",(e)=>{
            e.preventDefault();
            priceItem.innerHTML=inputQuantity.value * eltItem.price;
            totalQuantity();
            totalPrice();
            if (localStorage.getItem('product')) {
                let objIndex = registerItem.findIndex((item=> item.id === eltItem.id && item.color === eltItem.color))
                if (objIndex !== -1) {
                    registerItem[objIndex].quantities = inputQuantity.value;
                }
            }
            localStorage.setItem("product",JSON.stringify(registerItem));
        })

        // suppression des articles avec maj du local storage
        deleteItem.addEventListener('click',(e) =>{
            e.preventDefault();
            if (eltItem.id === eltItem.id) {
                let objIndex = registerItem.indexOf();
                // demande de confirmation de la suppression de l'article
                deleteConfirm = confirm("Voulez-vous vraiment supprimer l'article?")
                if (deleteConfirm == true) {
                    cartArticles.removeChild(article);
                    registerItem.splice(objIndex, 1)
                }
            }
            totalPrice();
            totalQuantity();
            localStorage.setItem('product',JSON.stringify(registerItem));
        
        });



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
        alert(formFirstName, `First name must be between ${min} and ${max} characters.`)
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
        alert(formLastName, `Last name must be between ${min} and ${max} characters.`)
    } else {
        valid = true;
    }
    return valid;
};
const checkEmail     = () => {
    let valid = false;
    const email = formEmail.value.trim();
    if (!contentEmailValidation(email)) {
        alert(formEmail, 'Email is not valid.')
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
        alert(formAddress, `Address must be between ${min} and ${max} characters.`)
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
        alert(formCity, `City must be between ${min} and ${max} characters.`)
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

form.addEventListener('change', function (e) {
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
});


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
        .catch(error => alert(`error when data sent to server (${error.message}`));
}


