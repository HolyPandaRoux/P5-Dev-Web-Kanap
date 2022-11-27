

function $getItemData() {
	fetch("http://192.168.1.60:3000/api/products")
		.then(response => response.json())
		.then((ProductsTable) => {
			console.table(ProductsTable);
		if(res.ok){
			return res.json();
		}

function send(e) {
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
					});
			}

			document
				.getElementById("form")
				.addEventListener("submit", send);




		});


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
