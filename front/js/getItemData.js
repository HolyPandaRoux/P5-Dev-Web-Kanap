

const parsedUrl = new URL(window.location.href);
let id = (parsedUrl.searchParams.get("_id"));
console.log('id=', id);


var click = document.getElementById('addToCart');
click.addEventListener('click', addData);

var arr = new Array();
function addData(){
	getData ();
	var productSelectedData = document.getElementById('quantity','colors').value;
		productSelectedData = parseInt(1) + parseInt(productSelectedData)
		arr.push({
			quantitySelected    :document.getElementById('quantity').value,
			colorsSelected      :document.getElementById('colors').value,
			imageSelected       :document.getElementsByTagName("img").item(0),
});
localStorage.setItem("localData", JSON.stringify(arr));
localStorage.setItem("id", JSON.stringify(arr));

}
function getData(){
	var str = localStorage.getItem("localData");
	if  (str != null)
		arr = JSON.parse(str);
}


JSON.parse(localStorage.getItem("localData"));
console.table(localStorage);