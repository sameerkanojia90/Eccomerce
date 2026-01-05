
const prodname = document.getElementById("product-name");
const prodprice = document.getElementById("product-price");
const prodquantity = document.getElementById("product-quantity");
const proddescr = document.getElementById("product-description");
const addprod = document.getElementById("create-product-btn");
const productlist = document.getElementById("product-list");

// ================= VARIABLES =================
let products = [];
let currentPage = 1;
let itemsPerPage = 4;

// ================= ADD PRODUCT =================
addprod.addEventListener("click", async () => {
  if (
    !prodname.value ||
    !prodprice.value ||
    !prodquantity.value ||
    !proddescr.value
  ) {
    alert("Please fill all fields");
    return;
  }

  await fetch("http://localhost:7000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ProductName: prodname.value,
      ProductPrice: prodprice.value,
      ProductQuantity: prodquantity.value,
      ProductDescription: proddescr.value
    })
  });

  // clear inputs
  prodname.value = "";
  prodprice.value = "";
  prodquantity.value = "";
  proddescr.value = "";

  loadProducts();
});

// ================= LOAD PRODUCTS =================
async function loadProducts() {
  const res = await fetch("http://localhost:7000/products");
  products = await res.json();
  showProducts();
}

// ================= SHOW PRODUCTS =================
function showProducts() {
  productlist.innerHTML = "";

  const maindiv = document.createElement("div");
maindiv.className = "product_container";

  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;   // ✅ MISSING LINE

  let pageItems = products.slice(start, end);

  pageItems.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <h3>${p.ProductName}</h3>
      <p>Price: ₹${p.ProductPrice}</p>
      <p>Quantity: ${p.ProductQuantity}</p>
      <p>${p.ProductDescription}</p>
      <button onclick="deleteProduct(${p.id})">Delete</button>
    `;

    maindiv.appendChild(div);   // ✅ sirf ek jagah append
  });

  productlist.appendChild(maindiv); // ✅ container append
  showPagination();
}


// ================= DELETE PRODUCT =================
async function deleteProduct(id) {
  await fetch(`http://localhost:7000/products/${id}`, {
    method: "DELETE"
  });

  loadProducts();
}

// ================= SIMPLE PAGINATION =================
function showPagination() {
  const old = document.getElementById("pagination");
  if (old) old.remove();

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const div = document.createElement("div");
  div.id = "pagination";

  const prevBtn = document.createElement("button");
  prevBtn.innerText = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;

    showProducts();
  };



  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    showProducts();
  };

  const pageText = document.createElement("span");
  pageText.innerText = ` Page ${currentPage} of ${totalPages} `;

  div.append(prevBtn, pageText, nextBtn);
  productlist.after(div);
}

// ================= INITIAL CALL =================
loadProducts();
