
document.write(document.location)
// récupération de l'url actuelle de la page affiché
// source : https://developer.mozilla.org/fr/docs/Web/API/Document/location
if((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("vérifier accés/état serveur échec chargement url " + err)});
// message d'erreur en cas d'échec de chargement de l'url
console.log('url=',document.location)
//affichage dans console log du résultat
const parsedUrl = new URL(window.location.href);
let id = (parsedUrl.searchParams.get("_id"));
console.log('id=',id);
// affichage dans console log du résultat
// récupération de l'id affiché à l'écran ( qui correspond au produit sur lequel l'utilisateur à cliqué)
// source : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get

fetch  ("http://192.168.1.60:3000/api/products")
.then(response => response.json())
.then( json => console.log(json))

console.log(items)
const idProduitSelection = items.find((element)=> element._id === _id);
console.log(idProduitSelection);










