/* Function to get the data from the server with fetch then formating the data receive then use the data then display the data using innerHtml */



fetch('http://192.168.1.60:3000/api/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error: ${response.status}');
            //si erreur affichage dans la console " erreur de connection au serveur, vérifier statut server et/ou url du serveur
        }
        return response.json();
    })
    .then(json => initialize(json))
    // transfert des données depuis l'api et versement dans JSON
    .catch(err => console.error(`Fetch problem: ${err.message}`));
// si erreur affichage dans la console "erreur de transfert des données vers JSON vérifier statut du fetch "
function initialize(products) {
    // grab the UI elements that we need to manipulate
    let category = document.querySelector('#category');
    let searchTerm = document.querySelector('#searchTerm');
    let searchBtn = document.querySelector('button');
    let main = document.querySelector('main');

    // keep a record of what the last category and search term entered were
    let lastCategory = category.value;
    // no search has been made yet
    let lastSearch = '';

    // these contain the results of filtering by category, and search term
    // finalGroup will contain the products that need to be displayed after
    // the searching has been done. Each will be an array containing objects.
    // Each object will represent a product
    let categoryGroup;
    let finalGroup;

    // To start with, set finalGroup to equal the entire products database
    // then run updateDisplay(), so ALL products are displayed initially.
    finalGroup = products;
    updateDisplay();

    // Set both to equal an empty array, in time for searches to be run
    categoryGroup = [];
    finalGroup = [];
}