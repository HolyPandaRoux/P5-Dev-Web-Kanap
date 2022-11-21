

const parsedUrl = new URL(window.location.href);
let id = (parsedUrl.searchParams.get("_id"));
console.log('id=', id);
// affichage dans console log du résultat
// récupération de l'id affiché à l'écran ( qui correspond au produit sur lequel l'utilisateur à cliqué)
// source : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
// récupération de l'id affiché à l'

fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    // formatage des données au format json
    .then((product) => {
        // formatage des données sous forme de tableau pour une question de lisibilité
        console.table(product);
    })
    .catch(() => {
        // en cas d'erreur un message d'erreur 404 apparait sur le bloc faisant défaut plus mentions des sources potentielless d'erreur dans le console.log
        console.log("erreur 404 Vérifier le statut du serveur /  fonction fetch / api data" + er);
    });

for 'product' in id (element => {
    function affichageproduit(_id) {
        let name = document.getElementById('#title').innerHTML;
        let description = document.getElementById('#description').innerHTML;
        let price = document.getElementById('#price').innerHTML;
        let rating = document.getElementById('#rating').innerHTML;
        let url = document.getElementById('url+id').innerHTML;
        let imageUrl = document.getElementById('#imageUrl');

    
	}}
);  