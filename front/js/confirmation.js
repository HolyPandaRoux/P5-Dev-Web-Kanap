function getOrderId(){
    let searchParams = new URL(location.href).searchParams
    let orderId = searchParams.get("orderid") 
    document.querySelector("#orderId").innerText = orderId
}
getOrderId()