



const parsedUrl = new URL(window.location.href);
let id = (parsedUrl.searchParams.get("_id"));
console.log('id=', id);
// affichage dans console log du résultat
// récupération de l'id affiché à l'écran ( qui correspond au produit sur lequel l'utilisateur à cliqué)
// source : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
let productSelected = function () {
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    // formatage des données au format json
          //  fetch(objectURL)
           //   .then((response) => response.json())
        .then((product) => {
                console.log(product);
                let img               = document.querySelector(".item__img");
                let name              = document.getElementById("title");
                let title             = document.querySelector("title");
                let price             = document.getElementById("price");
                let description       = document.getElementById("description");
                let color             = document.getElementById("colors");

                img.innerHTML            = `<img src="
                                            ${product.imageUrl}" alt="
                                            ${product.altTxt}">`;
                name.innerHTML           = `${product.name}`;
                title.innerHTML          = `${product.name}`;
                price.innerHTML          = `${product.price}`;
                description.innerHTML    = `${product.description}`;


                for (i = 0; i < product.colors.length; i++) {
                color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
                }
            });
        };
        productSelected();

function quantityValue() {
let quantity = document.querySelector("quantity");
return quantity.value};


function colorChoice() {
let color = document.querySelector("colors");
return color.value};
