function getPanier() { 
    return localStorage.getItem('cart');
    }
        //getting the data from the local storage it will come as a string so we need to parse it 
    let panier = getPanier();
        // parsing the response from JSON
        panier = JSON.parse(panier);
        console.table(panier);
        // getting all the items in the cart and displaying them in the console as a table
    let allProducts = [];
        // iterating through the cart to get the id of each product selected by the customer    
        for (let i = 0; i < panier.length; i++) {
        // if you want to get all the id present in panier displayed use this => console.log(panier[i].id);
            let id = panier[i].id;
        // using the id we got from the panier(cart) to fetch the data from the api using the url and the ${id} and pushing it to allProducts
            fetch(`http://localhost:3000/api/products/${id}`)
                .then(response => response.json())
                .then((product) => {
                    console.table(product);
                    allProducts.push(product);
                });
        }
function getData (){
    let cartItems = [];
    for (let i = 0; i < panier.length; i++) {
        let id = panier[i].id;
        let product = allProducts.find((product) => product._id == id);
        cartItems.push(product);
    }
    console.log(cartItems);
    
    }