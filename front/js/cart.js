function getPanier() { 
    //getting the data from the local storage it will come as a string so we need to parse it 
return localStorage.getItem('cart');

}
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
						name: 				product.name,
						price: 				product.price,
						color: 				panier[i].color,
						quantity: 		panier[i].quantity,
						description : product.description,
						imageUrl : 		product.imageUrl,
						altTxt : 			product.altTxt,
						price: 				product.price,
						totalPrice:   totalPrice,
					});
					console.table(fullCart);
				}
	})}
	



/*
	
	`<article class="cart__item" data-id="{${article._id}}" data-color="{product-color}">
	<div class="cart__item__img">
		<img src="${article.imageUrl}" alt="${article.altTxt}">
	</div>
	<div class="cart__item__content">
		<div class="cart__item__content__description">
			<h2>${article.name}</h2>
			<p>${article.color}</p>
			<p>${price}€</p>
		</div>
		<div class="cart__item__content__settings">
			<div class="cart__item__content__settings__quantity">
				<p>Qté :${article.quantity} </p>
				<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
			</div>
			<div class="cart__item__content__settings__delete">
				<p class="deleteItem">Supprimer</p>
			</div>
		</div>
	</div>
</article>`
*/