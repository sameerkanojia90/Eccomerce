const container = document.querySelector("#container");
const cartBtn = document.getElementById("cart-btn");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumber = document.getElementById("page-number");

let currentPage = 1;
let totalPages = 1;
const limit = 4;

// 1️⃣ FETCH PRODUCTS (DYNAMIC PAGE)
async function fetchProducts(page = 1) {
  try {
    const res = await fetch(
      `http://localhost:7000/api/user/products?page=${page}&limit=${limit}`
    );

    const data = await res.json();

    totalPages = data.totalPages;
    currentPage = data.currentPage;

    pageNumber.innerText = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    renderProducts(data.products);

  } catch (error) {
    console.error("FETCH ERROR:", error);
  }
}

fetchProducts();

// 2️⃣ RENDER PRODUCTS
function renderProducts(products) {
  container.innerHTML = "";

  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.justifyContent = "center";
  container.style.marginTop = "40px";

  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className="pol";

   

    productDiv.innerHTML = `
      <h3 style="text-align:center">${product.name}</h3>
      <p><b>Price:</b> ₹${product.price}</p>
      <p><b>Quantity:</b> ${product.quantity}</p>
      <p style="font-size:12px">${product.description}</p>

    <div class="action-buttons">
  <button class="qty-btn" onclick="decreaseQty('${product._id}')">−</button>
  <button class="qty-btn" onclick="increaseQty('${product._id}')">+</button>
  <button class="addcart-btn" onclick="addToCart('${product._id}')">
    Add to Cart
  </button>
</div>

    `;

    container.appendChild(productDiv);
  });
}

// 3️⃣ PAGINATION BUTTONS
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    fetchProducts(currentPage - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    fetchProducts(currentPage + 1);
  }
});

// 4️⃣ INCREASE / DECREASE
 async function increaseQty(id) {
  await fetch(`http://localhost:7000/api/user/products/increase/${id}`, {
    method: "PUT"
  });
  fetchProducts(currentPage);
}

async function decreaseQty(id) {
  await fetch(`http://localhost:7000/api/user/products/decrease/${id}`, {
    method: "PUT"
  });
  fetchProducts(currentPage);
}






async function addToCart(id) {
  const res = await fetch("http://localhost:7000/api/user/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productId: id,
      quantity: 1
    })
  });

  if (!res.ok) {
    alert("Failed to add product");
    return;
  }

  alert("Product added to cart");
}
   

              
// CART
cartBtn.addEventListener("click", () => {
  window.location.href = "cart.html";
});
