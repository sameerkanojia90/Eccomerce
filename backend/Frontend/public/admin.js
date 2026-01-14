// const prodname = document.getElementById("product-name");
// const prodprice = document.getElementById("product-price");
// const prodquantity = document.getElementById("product-quantity");
// const proddescr = document.getElementById("product-description");
// const addprod = document.getElementById("create-product-btn");
// const productlist = document.getElementById("product-list");

// let products = [];
// let currentPage = 1;
// let itemsPerPage = 4;

// addprod.addEventListener("click", async () => {
//   if (
//     !prodname.value ||
//     !prodprice.value ||
//     !prodquantity.value ||
//     !proddescr.value
//   ) {
//     alert("Please fill all fields");
//     return;
//   }

//   await fetch("http://localhost:7000/products", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       ProductName: prodname.value,
//       ProductPrice: prodprice.value,
//       ProductQuantity: prodquantity.value,
//       ProductDescription: proddescr.value
//     })
//   });

//   // clear inputs
//   prodname.value = "";
//   prodprice.value = "";
//   prodquantity.value = "";
//   proddescr.value = "";

//   loadProducts();
// });

// async function loadProducts() {
//   const res = await fetch("http://localhost:7000/products");
//   products = await res.json();
//   showProducts();
// }

// function showProducts() {
//   productlist.innerHTML = "";

//   const maindiv = document.createElement("div");
// maindiv.className = "product_container";

//   let start = (currentPage - 1) * itemsPerPage;
//   let end = start + itemsPerPage;   // ✅ MISSING LINE

//   let pageItems = products.slice(start, end);

//   pageItems.forEach(p => {
//     const div = document.createElement("div");
//     div.className = "product-card";

//     div.innerHTML = `
//       <h3>${p.ProductName}</h3>
//       <p>Price: ₹${p.ProductPrice}</p>
//       <p>Quantity: ${p.ProductQuantity}</p>
//       <p>${p.ProductDescription}</p>
//       <button onclick="deleteProduct(${p.id})">Delete</button>
//     `;

//     maindiv.appendChild(div);   // ✅ sirf ek jagah append
//   });

//   productlist.appendChild(maindiv); // ✅ container append
//   showPagination();
// }


// async function deleteProduct(id) {
//   await fetch(`http://localhost:7000/products/${id}`, {
//     method: "DELETE"
//   });

//   loadProducts();
// }

// function showPagination() {
//   const old = document.getElementById("pagination");
//   if (old) old.remove();

//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   const div = document.createElement("div");
//   div.id = "pagination";

//   const prevBtn = document.createElement("button");
//   prevBtn.innerText = "Prev";
//   prevBtn.disabled = currentPage === 1;
//   prevBtn.onclick = () => {
//     currentPage--;

//     showProducts();
//   };



//   const nextBtn = document.createElement("button");
//   nextBtn.innerText = "Next";
//   nextBtn.disabled = currentPage === totalPages;
//   nextBtn.onclick = () => {
//     currentPage++;
//     showProducts();
//   };

//   const pageText = document.createElement("span");
//   pageText.innerText = ` Page ${currentPage} of ${totalPages} `;

//   div.append(prevBtn, pageText, nextBtn);
//   productlist.after(div);
// }

// loadProducts();


const prodname = document.getElementById("product-name");
const prodprice = document.getElementById("product-price");
const prodquantity = document.getElementById("product-quantity");
const proddescr = document.getElementById("product-description");
const addprod = document.getElementById("create-product-btn");
const productlist = document.getElementById("product-list");

let products = [];
let currentPage = 1;
let itemsPerPage = 4;

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

async function loadProducts() {
  const res = await fetch("http://localhost:7000/products");
  products = await res.json();
  showProducts();
}


// function showProducts() {
//   productlist.innerHTML = "";

//   const maindiv = document.createElement("div");
//   maindiv.className = "product_container";

//   let start = (currentPage - 1) * itemsPerPage;
//   let end = start + itemsPerPage;

//   let pageItems = products.slice(start, end);

//   pageItems.forEach(p => {
//     const div = document.createElement("div");
//     div.className = "product-card";

//     div.innerHTML = `
//       <h3>${p.name}</h3>
//       <p>Price: ₹${p.price}</p>
//       <p>Quantity: ${p.quantity}</p>
//       <p>${p.description}</p>
      
//       <button onclick="deleteProduct('${p._id}')">Delete</button>
//     `;

//     maindiv.appendChild(div);
//   });

//   productlist.appendChild(maindiv);
//   showPagination();
// }

function showProducts() {
  productlist.innerHTML = "";

  const maindiv = document.createElement("div");
  maindiv.className = "product_container";

  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;

  let pageItems = products.slice(start, end);

  pageItems.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    // div.innerHTML = `

    //   <h3>${p.name}</h3>
    //   <p>Price: ₹${p.price}</p>
    //   <p>Quantity: <span id="qty-text-${p._id}">${p.quantity}</span></p>
    //   <p>${p.description}</p>

    //   <div class="action-btns">
    //     <button onclick="toggleEdit('${p._id}')">Edit</button>
    //     <button onclick="deleteProduct('${p._id}')">Delete</button>
    //   </div>

    //   <!-- INLINE EDIT BOX (HIDDEN) -->
    //   <div class="edit-box" id="edit-${p._id}" style="display:none;">
    //     <input type="number" id="qty-input-${p._id}" value="${p.quantity}">
    //     <button onclick="saveQuantity('${p._id}')">Save</button>
    //   </div>
    // `;
    div.innerHTML = `
  <h3>${p.name}</h3>
  <p>Price: ₹<span id="price-text-${p._id}">${p.price}</span></p>
  <p>Quantity: <span id="qty-text-${p._id}">${p.quantity}</span></p>
  <p>${p.description}</p>

  <div class="action-btns">
    <button onclick="toggleEdit('${p._id}')">Edit</button>
    <button onclick="deleteProduct('${p._id}')">Delete</button>
  </div>

  <!-- INLINE EDIT BOX -->
  <div class="edit-box" id="edit-${p._id}" style="display:none;">
    <input type="number" id="price-input-${p._id}" value="${p.price}" placeholder="Price">
    <input type="number" id="qty-input-${p._id}" value="${p.quantity}" placeholder="Quantity">
    <button onclick="saveChanges('${p._id}')">Save</button>
  </div>
`;


    maindiv.appendChild(div);
  });

  productlist.appendChild(maindiv);
  showPagination();
}


async function deleteProduct(id) {
  await fetch(`http://localhost:7000/products/${id}`, {
    method: "DELETE"
  });

  loadProducts();
}

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

loadProducts();

function toggleEdit(id) {
  const editDiv = document.getElementById(`edit-${id}`);
  editDiv.style.display =
    editDiv.style.display === "none" ? "block" : "none";
}
// async function saveQuantity(id) {
//   const newQty = document.getElementById(`qty-input-${id}`).value;

//   if (!newQty) {
//     alert("Quantity required");
//     return;
//   }

//   await fetch(`http://localhost:7000/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ quantity: newQty })
//   });

//   loadProducts(); // refresh UI
// }

async function saveChanges(id) {
  const newPrice = document.getElementById(`price-input-${id}`).value;
  const newQty = document.getElementById(`qty-input-${id}`).value;

  if (!newPrice || !newQty) {
    alert("Price and Quantity both required");
    return;
  }

  await fetch(`http://localhost:7000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      price: newPrice,
      quantity: newQty
    })
  });

  loadProducts();
}
