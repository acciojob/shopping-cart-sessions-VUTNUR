// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList=document.getElementById("cart-list");
const clearCartBtn=document.getElementById("clear-cart-btn");

let cartItems= JSON.parse(sessionStorage.getItem("eq"))||[];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  // console.log(cartItems)
  cartList.innerHTML="";
  cartItems.forEach((item)=>{
    const li = document.createElement("li");
       li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove from Cart</button>`;
       cartList.appendChild(li);
 })
}

// Add item to cart
function addToCart(productId) {
  //  console.log(productId);
  for(let i=0;i<products.length;i++){
    // console.log(products[i].id)
    if(products[i].id==productId){
      // console.log(products[i])
      cartItems.push(products[i]);
    }
  }
  sessionStorage.setItem("eq",JSON.stringify(cartItems));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
   cartItems=cartItems.filter((element)=>{
    return element.id != productId;
  })
  console.log(cartItems)
  renderCart();
}

// Clear cart
function clearCart() {}

productList.addEventListener("click",(event)=>{
	//  console.log(event.target);
  const id= event.target.getAttribute("data-id");
  addToCart(id);
})

cartList.addEventListener("click",(event)=>{
   const id= event.target.getAttribute("data-id");
   removeFromCart(id);
})

clearCartBtn.addEventListener("click", (event)=>{
  cartItems=[];
  sessionStorage.removeItem("eq");
  renderCart();
})

// Initial render
renderProducts();
renderCart();