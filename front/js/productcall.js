
window.write(window.location)
// récupération de l'url actuelle de la page affiché
// source : https://developer.mozilla.org/fr/docs/Web/API/Document/location
if((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("vérifier accés/état serveur échec chargement url " + err)});
// message d'erreur en cas d'échec de chargement de l'url
console.log('url=',document.location)
//affichage dans console log du résultat
const parsedUrl = new URL(window.location.href);
let newParams = (parsedUrl.searchParams.get("_id"))
console.log('id=',id)
 let ProductPage = new URL (`http://192.168.1.63:5500/front/html/product.html?_id=${id}}`)

// récupération de l'id affiché à l'
écran ( qui correspond au produit sur lequel l'utilisateur à cliqué)


//let response = fetch(`http://192.168.1.63:5500/front/html/product.html?${id}`)
//const produtcs = (await response).json();
//console.log(produtcs); 

//loadNames();

//let myUsername = "someguy";
//let addr = new URL("https://example.com/login");
//addr.username = myUsername;







