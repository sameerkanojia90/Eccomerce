const cartContainer = document.querySelector('#cart-container');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

if (cart.length === 0) {
    cartContainer.innerHTML = "<h3>Your cart is empty.</h3>";
} else {
    cart.forEach(product => {
        cartContainer.style.display = "flex";
        cartContainer.style.margin = "30px";

        
        
        const div = document.createElement('div');
        div.style.border = "1px solid gray";
        div.style.margin = "10px";
        div.style.padding = "10px";
        div.style.display="inline-block";


        div.innerHTML = `
            <h3 style="padding-top:5px";>${product.ProductName}</h3>
            <p style="padding-top:5px";>Price: ₹${product.ProductPrice}</p>
            <p style="padding-top:5px";>${product.ProductDescription}</p>
            <button style="color: rgb(69, 156, 255); margin: 10px;" class="buy">BUY</button>

        `;
        
const buyButton = div.querySelector('.buy');
    buyButton.addEventListener('click', () => {
        alert(`Purchase successful for ${product.ProductName}!`);
    });
            localStorage.setItem('BuyPoducts', JSON.stringify(product));
        cartContainer.appendChild(div);
    });
}
    
