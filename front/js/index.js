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
// formatage des données au format json
.then((ProductsTable) => {
// formatage des données sous forme de tableau pour une question de lisibilité
    console.table(ProductsTable);
    allItems(ProductsTable);
})
.catch((error ) => {
// en cas d'erreur un message d'erreur 404 apparait sur le bloc faisant défaut plus mentions des sources potentielless d'erreur dans le console.log
document.querySelector(".titles").innerHTML = "<h3> erreur 404 failed to get data from API check console log</h3>";
console.log("erreur 404 Vérifier le statut du serveur /  fonction fetch / api data"+er);
});

function allItems(index) {
// https://chartio.com/learn/databases/how-does-indexing-work/
    let displayZone = document.querySelector("#items");
// pour ( chaque article de index )
    for (let article of index) {
//https://www.w3schools.com/js/js_loop_forin.asp explications de l'utilisation de la loop " for Variable in Array"
        displayZone.innerHTML +=
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Addition_assignment 
// lien explicatif sur le += concaténation ou addition avec les deux operands de gauche
        `
        <a href="./product.html?_id=${article._id}">
            <article>
                <img src="${article.imageUrl}" alt="${article.altTxt}">
                <h3  class="productName">${article.name}</h3>
                <h2  class="productPrice">${article.price}€</h2>
                <p   class="productDescription">${article.description}                                       
                </p>
            </article>
        </a>`;
    }
}