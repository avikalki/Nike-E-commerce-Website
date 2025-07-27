const products = [
  { id: 1, name: "Men's Kurta", price: 1299.00, image: "mens.jpeg" },
  { id: 2, name: "Women's Saree", price: 2499.00, image: "womens.jpeg" },
  { id: 3, name: "Lehenga Choli", price: 4999.00, image: "lehanga.jpeg" },
  { id: 4, name: "Men's Sherwani", price: 5999.00, image: "sehrawani.jpeg" },
  { id: 5, name: "Kids' Traditional Dress", price: 899.00, image: "kids.jpeg" },
  { id: 6, name: "Ethnic Dupatta", price: 499.00, image: "ethnic.jpeg" }
];

const productsContainer = document.getElementById("products");
const cartList = document.getElementById("cartList");
const totalEl = document.getElementById("total");
const emptyCart = document.getElementById("emptyCart");

let cart = [];

function renderProducts() {
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsContainer.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    totalEl.textContent = "0.00";
    return;
  }
  emptyCart.style.display = "none";

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} – ₹${(item.price * item.quantity).toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalEl.textContent = total.toFixed(2);
}

renderProducts();
renderCart();

/* Clear cart and review functionality */

const clearCartBtn = document.getElementById("clearCartBtn");
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Store reviews in an array
const reviews = [];

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("reviewerName").value.trim();
  const rating = document.getElementById("reviewRating").value;
  const comment = document.getElementById("reviewComment").value.trim();

  if (!name || !rating || !comment) {
    alert("Please fill all review fields.");
    return;
  }

  const review = { name, rating, comment };
  reviews.push(review);
  renderReviews();

  // Reset form fields
  reviewForm.reset();

  // Show toast notification
  showToast("Review submitted successfully!");
});

function renderReviews() {
  reviewsList
}