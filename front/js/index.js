

/* Creating a function that will display all the items in the index. */
function allItems() {
    fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => {

            for (let i = 0; i < data.length; i++) {

                const productSection = document.getElementById("items");

                const productLink = document.createElement("a");
                productSection.appendChild(productLink);
                productLink.setAttribute("href", `product.html?id=${data[i]._id}`);

                const productCard = document.createElement("article");
                productLink.appendChild(productCard);

                const productPicture = document.createElement("img");
                productCard.appendChild(productPicture);
                productPicture.setAttribute("src", data[i].imageUrl);
                productPicture.setAttribute("alt", data[i].altTxt);

                const productName = document.createElement("h3");
                productCard.appendChild(productName);
                productName.textContent = data[i].name;

                const productDescription = document.createElement("p");
                productCard.appendChild(productDescription);
                productDescription.textContent = data[i].description;
            }
        });
}
allItems();