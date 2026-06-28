let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartDiv = document.querySelector("#cart");

const subtotalEl = document.querySelector("#subtotal");
const discountEl = document.querySelector("#discount");
const totalEl = document.querySelector("#total");

let subtotal = 0;
let discount = 0;

(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=194");

    const data = await response.json();

    const products = data.products;

    // Empty Cart
    if (cart.length === 0) {
      cartDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-md p-10 text-center col-span-full">

            <h2 class="text-3xl font-bold text-gray-700">
                Your Cart is Empty
            </h2>

            <p class="text-gray-500 mt-4">
                Add some products from the store.
            </p>

        </div>
      `;

      subtotalEl.innerHTML = "$0";
      discountEl.innerHTML = "-$0";
      totalEl.innerHTML = "$0";

      return;
    }

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);

      const itemSubtotal = product.price * item.quantity;

      const itemDiscount =
        (product.price * product.discountPercentage * item.quantity) / 100;

      subtotal += itemSubtotal;

      discount += itemDiscount;

      cartDiv.innerHTML += `
      <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5">

          <img
              src="${product.thumbnail}"
              alt="${product.title}"
              class="w-full h-52 object-cover rounded-xl"
          >

          <h2 class="text-xl font-bold text-gray-800 mt-4">
              ${product.title}
          </h2>

          <p class="text-amber-600 text-2xl font-bold mt-3">
              $${product.price}
          </p>

          <div class="mt-4 text-gray-600 space-y-2">

              <p>
                  <span class="font-semibold">
                      Quantity :
                  </span>

                  ${item.quantity}
              </p>

              <p>
                  <span class="font-semibold">
                      Subtotal :
                  </span>

                  <span class="text-amber-600 font-bold">
                      $${itemSubtotal.toFixed(2)}
                  </span>

              </p>

          </div>

      </div>
      `;
    });

    subtotalEl.innerHTML = `$${subtotal.toFixed(2)}`;

    discountEl.innerHTML = `-$${discount.toFixed(2)}`;

    totalEl.innerHTML = `$${(subtotal - discount).toFixed(2)}`;
  } catch (error) {
    console.log(error);
  }
})();
