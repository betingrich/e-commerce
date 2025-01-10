// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Fetch Products from Firestore
const productList = document.getElementById("product-list");

function fetchProducts() {
  db.collection("products").get().then((querySnapshot) => {
    productList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" width="100%">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart('${doc.id}')">Add to Cart</button>
        </div>
      `;
      productList.innerHTML += productCard;
    });
  });
}

// Add to Cart
function addToCart(productId) {
  alert("Product added to cart!"); // Placeholder
}

// User Authentication
const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Logged in successfully!"))
    .catch((err) => alert("Login failed: " + err.message));
});

// Fetch products on page load
fetchProducts();
