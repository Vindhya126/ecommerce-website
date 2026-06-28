let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmountEl = document.querySelector(".total");
let totalAmount = 0;
const cartDiv = document.querySelector("#cart");
(async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=194`);
    const data = await response.json();
    const products = data.products;
    cart.forEach((element) => {
      const product = products.find((item) => item.id === element.id);
      cartDiv.innerHTML += `
<div class="bg-slate-800 rounded-xl shadow-lg p-5 border border-slate-700 hover:shadow-2xl transition duration-300">

    <img
        src="${product.thumbnail}"
        alt="${product.title}"
        class="w-full h-48 object-fit rounded-lg"
    >

    <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">
            ${product.title}
        </h2>

        <p class="text-emerald-400 font-bold text-2xl mt-3">
            $${product.price}
        </p>

        <div class="mt-4 space-y-2 text-slate-300">
            <p>
                <span class="font-semibold text-white">Quantity:</span>
                ${element.quantity}
            </p>

            <p>
                <span class="font-semibold text-white">Subtotal:</span>
                <span class="text-emerald-400 font-bold">
                    $${(product.price * element.quantity).toFixed(2)}
                </span>
            </p>
        </div>

    </div>
</div>
`;
      totalAmount += product.price * element.quantity;
    });
    totalAmountEl.innerHTML = `Total Amount: $${totalAmount.toFixed(2)}`;
  } catch {}
})();
