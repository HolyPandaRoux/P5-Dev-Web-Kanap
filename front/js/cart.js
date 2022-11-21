
/*
* Adding products from lists
*/
$(".Product .AddToCart").on("click", function(event) {
	event.preventDefault();

	/*
	* First, the clicked link and the product element around it are saved
	*/
	var $link = $(event.currentTarget);
	var $product = $link.closest('.Product');

	/*
	* Based on the class name of the product element, you can see whether it has variations, customizations, or downloadable files.
	*
	* If so, the visitor is directed to the product page to make the necessary choices to add the product to the shopping cart.
	*/
	if ($product.hasClass('ProductVariations') || $product.hasClass('ProductTailorings') || $product.hasClass('ProductDownloads')) {
		window.location.href = $link.attr('href');
	}

	/*
	* Otherwise, the product is added directly from the list to the shopping cart.
	*/
	else {

		// The productID is extracted from the link
		productID = $link.attr('href').split('/')[2];

		// A POST request to add the product to the shopping cart is sent.
		$.ajax({
			type: "POST",
			url: "/cart",

			/*
			* A JSON object is sent as the request's content, where only the
			* product ID is needed.
			*/
			data: { products: [{ product_id: productID }] },
			success: function() {

				/*
				* After a successful request, the shopping cart is updated.
				*/
				$(".MiniCartContainer").empty();
				$.ajax({
					type: "GET",
					url: "/interface/MiniCart",
					success: function(data) {

						$(".MiniCartContainer").html(data);
					}
				});
			}
		});
	}
});