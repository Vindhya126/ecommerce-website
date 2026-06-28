const productId = new URLSearchParams(window.location.search).get("id");

const productDiv = document.querySelector("#product");

(async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    const product = await response.json();

    productDiv.innerHTML = `
    <div class="max-w-5xl mx-auto p-8">
        <div class="bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700">

            <div class="flex flex-col lg:flex-row gap-10">

                <!-- Product Image -->
                <div class="lg:w-2/5">
                    <img
                        src="${product.images[0]}"
                        alt="${product.title}"
                        class="w-full rounded-xl border border-slate-600"
                    >
                </div>

                <!-- Product Details -->
                <div class="lg:w-3/5">

                    <h1 class="text-4xl font-bold text-white mb-4">
                        ${product.title}
                    </h1>

                    <p class="text-yellow-400 text-lg mb-3">
                        ⭐ ${product.rating}
                    </p>

                    <p class="mb-2 text-white">
                        <span class="font-semibold">Brand:</span>
                        ${product.brand}
                    </p>

                    <p class="mb-2 text-white">
                        <span class="font-semibold">Category:</span>
                        ${product.category}
                    </p>

                    <p class="mb-2 text-green-400 font-semibold">
                        ${product.discountPercentage}% OFF
                    </p>

                    <p class="mb-4 text-white">
                        <span class="font-semibold">Stock:</span>
                        ${product.stock}
                    </p>

                    <h2 class="text-3xl font-bold text-emerald-400 mb-5">
                        $${product.price}
                    </h2>

                    <p class="text-slate-300 leading-8 mb-8">
                        ${product.description}
                    </p>

                    <button
                        onclick="addToCart(${product.id})"
                        class="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition duration-300"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    </div>
    `;
  } catch (error) {
    console.log(error);

    productDiv.innerHTML = `
      <h2 class="text-center text-red-500 text-2xl mt-10">
        Failed to load product.
      </h2>
    `;
  }
})();

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = cart.find((item) => item.id === id);

  if (!product) {
    cart.push({
      id: id,
      quantity: 1,
    });
  } else {
    product.quantity++;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart!");
}
