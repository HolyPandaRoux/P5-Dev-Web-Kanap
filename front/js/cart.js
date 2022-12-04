function getPanier() {

// A CORRIGER ne marche pas
//const emptyCart = document.querySelector("#cart__items");

//if (localStorage('cart') === null || localStorage('cart') == 0) {
//	const emptyCart = `<p>Votre panier est vide</p>`;
//	emptyCart.innerHTML = emptyCart;
//}
//else  { 
    //getting the data from the local storage it will come as a string so we need to parse it 
//return localStorage.getItem('cart');



	if (produitLocalStorage === null || produitLocalStorage == 0) {
			const emptyCart = `<p>Votre panier est vide</p>`;
			positionEmptyCart.innerHTML = emptyCart;
	} else {
	
	let panier = getPanier();
    panier = JSON.parse(panier);
//			console.log(getPanier());
    // parsing the response from JSON
    
    // getting all the items in the cart and displaying them in the console as a table

    // iterating through the cart to get the id of each product selected by the customer    
		// loop to concatenate the data from the local storage to the data from the api, completing the cart data with the data from the api. We are now dealing with one variable containing all the data per product in the cart (id, color, quantity, name, price, image, description)
    for (let i = 0; i < panier.length; i++) {
    // if you want to get all the id present in panier displayed in the console use this => console.log(panier[i].id);
        let id = panier[i].id;
//					console.log(id);
				const panierId = panier;
//					console.log (panierId);
				fetch (`http://localhost:3000/api/products/${id}`)
							.then(response => response.json())
							.then((data) => {
									const product = data;
//											console.table(product);
				localStorage.setItem("product", JSON.stringify(product));
//							console.log(localStorage.getItem("product"));
//https://stackoverflow.com/questions/67660112/javascript-how-to-concat-objects-into-arrays-in-localstorage
//https://bobbyhadz.com/blog/javascript-referenceerror-cannot-access-before-initialization#:~:text=The%20%22Cannot%20access%20before%20initialization,the%20variable%20before%20accessing%20it.
				var fullCart = [];
				for (let i = 0; i < panier.length; i++) {
					fullCart.push({
						_id:   				product._id,
						title: 				product.name,
						price: 				product.price,
						color: 				panier[i].color,
						quantity: 			panier[i].quantity,
						description : 		product.description,
						imageUrl : 			product.imageUrl,
						altTxt : 			product.altTxt,
						price: 				product.price,
						totalPrice:   		totalPrice,
					});
					console.table(fullCart);
				}
	})}
	

function displayCart () {
		document.getElementById("cart__items").innerHTML +=
	
	`
		<article class="cart__item" data-id="${fullcart._id}}" data-color="{product-color}">
	<div class="cart__item__img">
		<img src="${fullCart.imageUrl}" alt="${fullCart.altTxt}">
	</div>
	<div class="article__content">
		<div class="article__content__description">
			<h2>${fullCart.title}</h2>
			<p>${fullCart.color}</p>
			<p>${fullCart.price}€</p>
		</div>
		<div class="article__content__settings">
			<div class="article__content__settings__quantity">
				<p>Qté :${fullCart.quantity} </p>
				<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
			</div>
			<div class="cart__item__content__settings__delete">
				<p class="deleteItem">Supprimer</p>
			</div>
		</div>
	</div>
</article>
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
` }}}