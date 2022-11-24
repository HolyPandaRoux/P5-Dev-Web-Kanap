/*  */
/*  */




productCalling();

function productCalling() {
    const parsedUrl = new URL(window.location.href);
    let id = (parsedUrl.searchParams.get("_id"));
    console.log('id=', id);
    let productSelected = function () {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            //   .then((response) => response.json())
            .then((product) => {
                console.log(product);
                let img = document.querySelector(".item__img");
                let name = document.getElementById("title");
                let title = document.querySelector("title");
                let price = document.getElementById("price");
                let description = document.getElementById("description");
                let color = document.getElementById("colors");

                img.innerHTML = `<img src="
                                ${product.imageUrl}" alt="
                                ${product.altTxt}">`;
                name.innerHTML = `  ${product.name}`;
                title.innerHTML = ` ${product.name}`;
                price.innerHTML = ` ${product.price}`;
                description.innerHTML = `${product.description}`;
                for (i = 0; i < product.colors.length; i++) {
                    color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
                }
            });
    };
    productSelected();


    const parsedProductUrl = new URL(window.location.href);
    let productId = (parsedProductUrl.searchParams.get("_id"));
    console.log('id=', productId);
    const quantitySelected = document.getElementById('quantity');
    const colorSelected = document.getElementById('colors');

    const addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', (event) => {
        event.preventDefault();

        const selection = {
            id: productId,
            img: productId.imageURL,
            alt: productId.altTxt,
            name: title.textContent,
            price: price.textContent,
            color: colorSelected.value,
            quantity: quantitySelected.value,
        };

        let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

        const addProductLocalStorage = () => {

            productInLocalStorage.push(selection);
            localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        };
        let addConfirm = () => {
            alert('Votre sélection a bien était ajoutée à votre panier');
        };

        let update = false;


        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        addProductLocalStorage();
        addConfirm();
        productInLocalStorage = [];
        addProductLocalStorage();
        addConfirm();
    });
}
