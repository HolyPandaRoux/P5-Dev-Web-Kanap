

fetch  ("http://localhost:3000/api/products")
.then(response => response.json())
.then((ProductsTable) => {
    console.table(ProductsTable);
    allItems(ProductsTable);
})

.catch((error) => {
document.querySelector(".titles").innerHTML = "<h3> erreur 404 failed to get data from API check console log</h3>";
console.log("erreur 404 Vérifier le statut du serveur/ adresse /  fonction fetch / api data"+error);
});


/* Creating a function that will display all the items in the index. */

function allItems(index) {// https://chartio.com/learn/databases/how-does-indexing-work/
    let displayZone = document.querySelector("#items");
    for (let article of index) {
        
        
        displayZone.innerHTML +=
        `
            <a href="./product.html?_id=${article._id}">
                <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    <h3  class="productName">${article.name}</h3>
                    <h2  class="productPrice">${article.price}€</h2>
                    <p   class="productDescription">${article.description}                                       
                    </p>
                </article>
            </a>
        `
        ;
    }
}