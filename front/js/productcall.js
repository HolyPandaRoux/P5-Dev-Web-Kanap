/**
 * It takes the id of the product from the url, then it fetches the product from the database, then it
 * displays the product's information on the page.
 */
function productCalling() {
    const parsedUrl = new URL(window.location.href);
    let id = (parsedUrl.searchParams.get("_id"));
    console.log('id=', id);
    
    /**
     * fetches the product's information from the database and displays it on the page.
     */
    let productSelected = function () {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            //   .then((response) => response.json())
            .then((product) => {
                console.log(product);
                let img         = document.querySelector(".item__img");
                let name        = document.getElementById("title");
                let title       = document.querySelector("title");
                let price       = document.getElementById("price");
                let description = document.getElementById("description");
                let color       = document.getElementById("colors");
                
                img.innerHTML         = `<img   src=" ${product.imageUrl}" 
                                                alt=" ${product.altTxt}">`;
                name.innerHTML        = `             ${product.name}`;
                title.innerHTML       = `             ${product.name}`;
                price.innerHTML       = `             ${product.price}`;
                description.innerHTML = `             ${product.description}`;for (i = 0; i < product.colors.length; i++) {
                color.innerHTML      += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
                }
            });
    };
    productSelected();
}
productCalling();


/* Adding an event listener to the button. */
let button = document.getElementById("addToCart");
button.addEventListener("click", addToCart);


/* Taking the id of the product from the url, then it is fetching the product from the database, then
it is displaying the product's information on the page. */
function addToCart() {
    const parsedUrl = new URL(window.location.href);
    let id   = (parsedUrl.searchParams.get("_id"));
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
        cart = [];
    }
    /* Creating an object with the id, quantity and color of the product. */
    let cartItem = {
        id      : id,
        quantity: document.getElementById("quantity").value,
        color   : document.getElementById("colors").value,
    };
    // check if the product already exits in the cart and if it does, it will add the quantity to the existing quantity.
    if (colors.value == cartItem.color)
    /* Checking if the user has chosen a color, if not, it will alert the user to choose a color. */
    if (colors.value < 1) {
        alert("Veuillez choisir une couleur");
    }
    /* Checking if the quantity is less than 1, if it is, it will alert the user to choose a quantity. */
    else if (quantity.value < 1) {
        alert("Veuillez choisir une quantité entre 1 et 100");}
    else if ( quantity.value > 100) {
        alert("Veuillez choisir une quantité entre 1 et 100")
        quantity.value = 0;}

    /* Adding the product to the cart. */
    else{
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == cartItem.id && cart[i].color == cartItem.color) {
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(cartItem.quantity);
                localStorage.setItem("cart", JSON.stringify(cart));
                console.log(cart);
                alert("L'article a bien été ajouté au panier")
                return;
            }
        }
    cart.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    alert("L'article a bien été ajouté au panier")
    }
    
}

    
console.log(localStorage.getItem("cart"));



