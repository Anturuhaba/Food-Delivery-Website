// =========================
// CART DATA
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =========================
// ELEMENTS
// =========================

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const addButtons = document.querySelectorAll(".add-btn");
const searchInput = document.getElementById("searchInput");
const darkModeBtn = document.getElementById("darkModeBtn");

// =========================
// OPEN / CLOSE CART
// =========================

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// =========================
// ADD TO CART
// =========================

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        const item = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            quantity: 1
        };

        const existingItem = cart.find(food => food.id === item.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(item);
        }

        saveCart();
        updateCart();
    });
});

// =========================
// UPDATE CART
// =========================

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
        <div style="display:flex;justify-content:space-between;margin-bottom:15px;border-bottom:1px solid #eee;padding-bottom:10px;">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <p>Qty: ${item.quantity}</p>
            </div>
            <button onclick="removeItem('${item.id}')" style="background:red;color:white;border:none;padding:8px 12px;cursor:pointer;border-radius:6px;">
                Remove
            </button>
        </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = `₹${total.toFixed(2)}`;

    updateCartCount();
}

// =========================
// REMOVE ITEM
// =========================

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
}

// =========================
// CART COUNT
// =========================

function updateCartCount() {
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });
    cartCount.textContent = count;
}

// =========================
// LOCAL STORAGE
// =========================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// =========================
// SEARCH FOOD
// =========================

searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {
        const foodName = (card.dataset.name || "").toLowerCase();
        card.style.display = foodName.includes(value) ? "block" : "none";
    });
});

// =========================
// DARK MODE
// =========================

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// =========================
// LOAD THEME
// =========================

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

// =========================
// INIT
// =========================

updateCart();