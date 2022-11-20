

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















