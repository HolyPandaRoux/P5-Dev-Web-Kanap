/**
 * It takes the id of the product from the url, then it fetches the product from the database, then it
 * displays the product's information on the page.
 */
function productCalling() {
    const parsedUrl = new URL(window.location.href);
    let id = (parsedUrl.searchParams.get("_id"));


    let productSelected = function () {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            //   .then((response) => response.json())
            .then((product) => {

                createElement("img", "item__img", "item__img", product.imageUrl, product.altTxt);
                createElement("h2", "title", "title", product.name);
                createElement("p", "price", "price", product.price);
                createElement("p", "description", "description", product.description);
                createElement("select", "colors", "colors", product.colors);
                document.getElementById("colors").appendChild(createElement("option", "colors", "colors", "Choisissez une couleur"));
                for (let i = 0; i < product.colors.length; i++) {
                    document.getElementById("colors").appendChild(createElement("option", "colors", "colors", product.colors[i]));
                }
                createElement("input", "quantity", "quantity", "1");
                createElement("button", "addToCart", "addToCart", "Ajouter au panier");
            
              
                }
            );
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
    /* Checking if the user has chosen a color, if not, it will alert the user to choose a color. */
    if (colors.value < 1) {
        alert("Veuillez choisir une couleur");
    }
    /* Checking if the quantity is less than 1, if it is, it will alert the user to choose a quantity. */
    else if (quantity.value < 1) {
        alert("Veuillez choisir une quantité");}

    /* Adding the product to the cart. */
    else{
    cart.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("L'article a bien été ajouté au panier")
    }
    
}




