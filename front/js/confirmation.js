
/**
 * gets the order id from the URL and puts it in the HTML.
 */
function getOrderId(){
    let searchParams = new URL(location.href).searchParams
    let orderId = searchParams.get("orderid") 
    document.querySelector("#orderId").innerText = orderId
    clearCart();
}
getOrderId()