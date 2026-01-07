const container = document.querySelector('#container');
const Userproductarray = JSON.parse(localStorage.getItem('Product')) || [];
const cartBtn = document.getElementById('cart-btn');


Userproductarray.forEach(product => {
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "10px";
    container.style.justifyContent = "center";
    container.style.marginTop = "40px";

    const productDiv = document.createElement('div');
   
    Object.assign(productDiv.style, {
         height: "180px",
      width: "200px",
      border: "1px solid black",
      margin: "10px",
      padding: "10px",
      boxSizing: "border-box",
      display: "inline-block",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
     
    });

    

    productDiv.innerHTML = `
       <h3 style="color: #000000ff ; text-align: center">${product.ProductName}</h3>
     <p><span style="color: #000000ff; ">Price:</span>
  <span style="color:  rgb(69, 156, 255);">${product.ProductPrice}</span></p>
  <p><span style="color: #000000ff; ">Quantity:</span>
  <span style="color:  rgb(69, 156, 255);">${product.ProductQuantity}</span></p>
<p><span style="color: #000000ff; ">Description:</span>
<span style="color:  rgb(69, 156, 255);">${product.ProductDescription}</span></p>

<button style="color: rgb(69, 156, 255); margin: 10px;" class="add-to-cart-btn">Add to Cart</button>
    `;

    const addToCartBtn = productDiv.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });

    container.appendChild(productDiv);
});

function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    const existing = cart.find(item => item.ProductName === product.ProductName);

    if (existing) {
        alert('This product is already in your cart!');
    } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    }
}

cartBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
});
