
var fullCart = [];
var selectedId = [];
var selectedQuantity = [];
var selectedColor = [];

for  (let i 	 = 0; i < panier.length; i++) {
	var selectedId       = panier[i].id;
	var selectedQuantity = panier[i].quantity;
	var selectedColor 	 = panier[i].color;
		fullCart.push({
				selectedId			 : id,
				selectedQuantity : quantity,
				selectedColor		 : color,
		});
		
		console.table(fullCart);
for (let i = 0; i < allProducts.length; i++) {
	let name = title;
	var description				  = allProducts[i].description;
	var SelectedName 				= allProducts[i].title;
	var price 							= allProducts[i].price;
	var imageUrl 						= allProducts[i].imageUrl;
	var altTxt 							= allProducts[i].altTxt;
		fullCart.push({
			description : description,
			SelectedName     		: title,
			price    		: price,
			imageUrl 		: imageUrl,
			altTxt   		: altTxt,
	});
console.log(arr?.fullCart);
	}
	}







		
function productTable(panier) {
		let displayZone = document.querySelector("#cart__items");
		for (let _id of panier) { 
			displayZone.innerHTML +=
			
			`
		<article class="cart__item" data-id="${id}" data-color="{product-color}">
		<div class="cart__item__img">
			<img src="${article.imageUrl}" alt="${article.altTxt}">
		</div>
		<div class="cart__item__content">
			<div class="cart__item__content__description">
				<h2>${article.name}</h2>
				<p>${artcile.color}</p>
				<p>${article.price}€</p>
			</div>
			<div class="cart__item__content__settings">
				<div class="cart__item__content__settings__quantity">
					<p>Qté :${quantity} </p>
					<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
				</div>
				<div class="cart__item__content__settings__delete">
					<p class="deleteItem">Supprimer</p>
				</div>
			</div>
		</div>
	</article>
		
		`
}}*/




const parsedUrl = new URL(window.location.href);
let id = (parsedUrl.searchParams.get("_id"));
console.log('id=',id);
// affichage dans console log du résultat
// récupération de l'id affiché à l'écran ( qui correspond au produit sur lequel l'utilisateur à cliqué)
// source : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get


fetch  (`http://192.168.1.60:3000/api/product-id`)
.then(response => response.json())
// formatage des données au format json
.then((ProductsTable)=> {
// formatage des données sous forme de tableau pour une question de lisibilité
    console.table(ProductsTable);
    let allItems = (ProductsTable);
})
.catch((error ) => {
// en cas d'erreur un message d'erreur 404 apparait sur le bloc faisant défaut plus mentions des sources potentielless d'erreur dans le console.log
document.querySelector(".titles").innerHTML = "<h3> erreur 404 failed to get data from API check console log</h3>";
console.log("erreur 404 Vérifier le statut du serveur /  fonction fetch / api data"+er);
});
function allItems(index) {
    // https://chartio.com/learn/databases/how-does-indexing-work/


 //   let imageUrl           = document.querySelector("article div.item__image");
    let productName        = document.getElementById("#title");
    let productPrice       = document.getElementById("#price");
    let productDescription = document.getElementById("#description");
    let productAltTxt      = document.getElementById("#altTxt");
    let productColors      = document.getElementById("#colors");


let displayZone = document.querySelector("index");
    // pour ( chaque article de index )
for (let article of _id) {
    if (id===choixClient._id) {
        imageAlt.          innerHTML      = `<img src="${choixClient.imageUrl}" alt="${choixClient.altTxt}" >`;
        productName.       textContent    = `${choixClient.title}`;
        productPrice.      textContent    = `${choixClient.price}`;
        productDescription.textContent    = `${choixClient.description}`;
        productAltTxt.     textContent    = `${choixClient.altTxt}`;
        productColors.     textContent    = `${choixClient.colors}`;
    }
}
}




function sendform(e) {
				e.preventDefault();
				fetch("https://localhost:3000/api/", {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ value: document.getElementById("value").value })
				})
					.then(function (res) {
						if (res.ok) {
							return res.json();
						}
					})
					.then(function (value) {
						document
							.getElementById("result")
							.innerText = value.postData.text;
							console.log(value.postData.text);
					});
			}




/*const button = document.querySelector("addToCart");
button.addEventListener('click',(event) => {});
onclick = function (_event) { document.addEventListener("DOMContentLoaded", function(){
	document.querySelector('select[name="quantity"]').onchange=changeEventHandler;},false);

	function changeEventHandler(event) {
		if(!event.target.value)
			document.addEventListener("DOMContentLoaded", function(){
				document.querySelector('select[id="document.quantity"]').onchange=changeEventHandler;},false);
				function changeEventHandler(event) {
					if (!event.target.value)
					return event.target.value = localStorage.getItem ("quantity");
					console.log ("quantity: " + valueOf(event.target.value));}
*/				
let quantityInput (
	const button = document.getElementById("addToCart")
	button.addEventListener("click", (event) => {});
})
var input = document.getElementById("quantity");
localStorage.setItem ("document.quantity", input.value(event.target.value));
console.log ("quantity: " + valueOf(InputEvent.target.value))
var storedValue = localStorage.getItem ("document.quantity");

/*
				addToCartButton.addEventListener('click', () => {
					addItem(getAttribute('price'),
				showItems()
						);





/*
	var productSelectedData 
							= document.getElementById('quantity','colors').value;
		productSelectedData = parseInt(100) + parseInt(productSelectedData)
		panier.push({
			quantitySelected    :"http://localhost/front/html/product.html?_id=107fb5b75607497b96722bda5b504926".getElementById('quantity').value,
			colorsSelected      :document.getElementById('colors').value,
			imageSelected       :document.getElementById('image').value,
			idSelected          :document.getElementById('_id').value,
			descriptionSelected :document.getElementById('description').value,
			nameSelected        :document.getElementById('title').value,
			altTxtSelected 		:document.getElementById('altTxt').value,
});
localStorage.setItem('localData', JSON.stringify(panier));
console.table(productSelectedData);
console.table(addData());

}
function getData(){
	var str = localStorage.getItem('localData');
	if  (str != null)
		arr = JSON.parse(str);
}

function deleteData(){localStorage.clear()};

var i;

console.log("local storage");
for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}

console.log("session storage");
for (i = 0; i < sessionStorage.length; i++) {
    console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
}}}
function getData();
function addData();
*/
