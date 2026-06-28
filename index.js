const productsDiv = document.querySelector("#products");
(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=194");
    const data = await response.json();
    const products = data.products;
    products.forEach((product) => {
      productsDiv.innerHTML += `
    <div class="bg-slate-900 rounded-xl shadow-lg p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-slate-700">
      
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        class="w-full h-48 object-cover rounded-lg"
      >

      <div class="mt-4">
        <h2 class="text-xl font-semibold text-white">
          ${product.title}
        </h2>

        <p class="text-slate-400 text-sm mt-2 line-clamp-3">
          ${product.description}
        </p>

        <h3 class="text-emerald-400 text-2xl font-bold mt-4">
          $${product.price}
        </h3>

        <div class="flex justify-between items-center mt-5">

          <a
            href="product.html?id=${product.id}"
            class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            View  Details
          </a>

          <button
            onclick="addToCart(${product.id})"
            class="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition"
          >
            Add To Cart
          </button>

        </div>
      </div>

    </div>
  `;
    });
  } catch {}
})();
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find((item) => item.id === id);
  if (!product) {
    cart.push({ id: id, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    product.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
