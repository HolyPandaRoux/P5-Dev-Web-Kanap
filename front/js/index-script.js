/* Fonction pour récupérer les données du serveur par le biais de Fetch et stockage de celle ci dans la variable Returned Answer avant réutilisation*/

    

    let url = 'http://192.168.1.60:3000/api/products';
    let response = await fetch(url)
    .then (response => console.log(response.json()))
    .then (response => console.log(alert(JSON.stringify(response))))
    .catch(error    => console.log(alert("Critical Fail : " + error)));

document.getElementById('#items')
document.items.innerHTML = `
<a href="./product.html?id="${article._id}" >
    <article>
        <img src=".../product01.jpg" alt="${article.altTxt}">
        <h3 class="productName">Kanap name1</h3>
        <p class="${article.description}"</p>
    </article>  
</a>
`
