function getPanier() { 
return localStorage.getItem('cart');
}
let panier = getPanier();
panier = JSON.parse(panier);

let allProducts =  [] ;
fetch ("http://localhost:3000/api/products")
.then(response => response.json())
.then((ProductsTable) => {
    console.table(ProductsTable);
    allProducts = ProductsTable;

});

function getData (){
let cartItems = [];
for (let i = 0; i < panier.length; i++) {
    let id = panier[i].id;
    let product = allProducts.find((product) => product._id == id);
    cartItems.push(product);
}
console.log(cartItems);

}