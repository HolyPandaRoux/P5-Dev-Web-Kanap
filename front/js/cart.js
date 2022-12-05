function getPanier() {
	var panier = localStorage.getItem('panier');
	let panier = getPanier();
	console.log(panier);
    panier = JSON.parse(panier);	
    for (let i = 0; i < panier.length; i++) {
        let id = panier[i].id;
				const panierId = panier;
				fetch (`http://localhost:3000/api/products/${id}`)
							.then(response => response.json())
							.then((data) => {
									const product = data;
				localStorage.setItem("product", JSON.stringify(product));
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
	})}}

/*
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
` }}*/