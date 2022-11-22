/* script pour récupérer les données du serveur par le biais de Fetch et stockage de celle ci dans la variable Returned Answer avant réutilisation*/
// Fetch
// response => Json
// Json => table 
// module d'erreur
// fonction d'affichage des produits
// displayZone correspond à la const/let qui contiendra l'affichage des produits
//let article of index, 
//rajout au html existant des éléments article de l'index avec en rajout le selector correspondant à la ligne de tableau voulue.

fetch  ("http://192.168.1.63:3000/api/products")
.then(response => response.json())
.then((ProductsTable) => {
    console.table(ProductsTable);
    allItems(ProductsTable);
})

.catch((error ) => {
document.querySelector(".titles").innerHTML = "<h3> erreur 404 failed to get data from API check console log</h3>";
console.log("erreur 404 Vérifier le statut du serveur /  fonction fetch / api data"+err);
});



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