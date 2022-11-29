const parsedUrl = new URL(window.location.href);
    let id = (parsedUrl.searchParams.get("_id"));
    console.log('id=', id);
let productId = id
let products = [];
let productSelected = function () {
    
	fetch(`http://localhost:3000/api/products/${id}`)
		.then((response) => response.json())
		.then((data) => {
			console.table(data);
			products.push(data);
			// get data image
			let img        		  = document.querySelector(".item__img");
			img.innerHTML   	  = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
			let name       		  = document.getElementById("title");
			name.innerHTML  	  = data.name;
			let title  	   		  = document.querySelector("title");
			title.innerHTML		  = data.name;
			let price      		  = document.getElementById("price");
			price.innerHTML       = `${data.price}`;
			let description       = document.getElementById("description");
			description.innerHTML = data.description;
			let color 			  = document.getElementById("colors");
			for (i				  = 0; i < data.colors.length; i++) {
			color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
			}
			
			if(localStorage.getItem('products')){
				products = JSON.parse(localStorage.getItem('products'));
			}
			products.push({'productId' : productId + 1, image : '<imageLink>'});
			window.localStorage.setItem('productSelected', JSON.stringify(products));
			console.log(id);
		
		});
};
productSelected();
//get the response.json data and store it in localStorage with the key 'productSelected'

let itemSelected = JSON.parse(localStorage.getItem('productSelected'));
console.log(itemSelected);