function $getItemData() {
	fetch("http://192.168.1.60:3000/api/products")
		.then(response => response.json())
		.then((ProductsTable) => {
			console.table(ProductsTable);
		});
	const cart = [];
	const obj = {
		selectedName: document.getElementById('title'),
		selectedDescription: document.getElementById('description'),
		selectedPrice: document.getElementById('price'),
		selectedImage: document.getElementById('.item__img'),
		selectedAltTxt: document.getElementById('altTxt'),
		selectedQuantity: document.getElementById('quantity'),
		selectedAltTxt: document.getElementById('altTxt'),

	};

	const addToCartButton = document.getElementById('addToCart');



	function $addItem(selectedName, selectedDescription, selectedPrice, selectedImage, selectedAltTxt, selectedQuantity, selectedTxt) {
		cart.push(selectedName, selectedDescription, selectedPrice, selectedImage, selectedAltTxt, selectedQuantity, selectedTxt);
	}

	function $ShowCart() {
	}

	addToCartButton.addEventListener('click', () => {
		addItem(getAttribute('id'),
			getAttribute('price'),
			getAttribute('title'),
			showItems()
		);
	}
	);
	console.log(cart);
	cart.push(obj);
	console.log(obj);
}
