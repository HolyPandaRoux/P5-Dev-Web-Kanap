

const parsedUrl = new URL(window.location.href);
let id = (parsedUrl.searchParams.get("_id"));
console.log('id=',id);
// affichage dans console log du résultat
// récupération de l'id affiché à l'écran ( qui correspond au produit sur lequel l'utilisateur à cliqué)
// source : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
// récupération de l'id affiché à l'

fetch  (`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
// formatage des données au format json
.then((product)=> {
// formatage des données sous forme de tableau pour une question de lisibilité
    console.table(product);
})
.catch((error ) => {
// en cas d'erreur un message d'erreur 404 apparait sur le bloc faisant défaut plus mentions des sources potentielless d'erreur dans le console.log
document.querySelector(".titles").innerHTML = "<h3> erreur 404 failed to get data from API check console log</h3>";
console.log("erreur 404 Vérifier le statut du serveur /  fonction fetch / api data"+er);
});
//let response = fetch(`http://192.168.1.63:5500/front/html/product.html?${id}`)
//const produtcs = (await response).json();
//console.log(produtcs); 

//loadNames();

//let myUsername = "someguy";
//let addr = new URL("https://example.com/login");
//addr.username = myUsername;







