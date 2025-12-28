const products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 120, rating: 4.8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Smart Watch Elite", category: "Electronics", price: 250, rating: 4.9, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Denim Classic Jacket", category: "Fashion", price: 85, rating: 4.5, image: "https://images.unsplash.com/photo-1537465978529-d23b17165b3b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D" },
    { id: 4, name: "Gaming Mouse RGB", category: "Electronics", price: 55, rating: 4.7, image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdhbWluZyUyMG1vdXNlfGVufDB8fDB8fHww" },
    { id: 5, name: "Bluetooth Speaker Pro", category: "Electronics", price: 95, rating: 4.3, image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Air Purifier X1", category: "Home", price: 320, rating: 4.6, image: "https://images.unsplash.com/photo-1709745634912-2a79b938f3c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpciUyMHB1cmlmaWVyfGVufDB8fDB8fHww" },
    { id: 7, name: "Leather Travel Bag", category: "Fashion", price: 150, rating: 4.8, image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Mechanical Keyboard", category: "Electronics", price: 110, rating: 4.9, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "Minimalist Desk Lamp", category: "Home", price: 45, rating: 4.2, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Running Sneakers", category: "Fashion", price: 90, rating: 4.4, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
    { id: 11, name: "Coffee Espresso Machine", category: "Home", price: 450, rating: 4.7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPQHMMmXq3ToCtTWuHa4XGO7Uyu2yVn4jtg&s" },
    { id: 12, name: "Ceramic Vase Set", category: "Home", price: 35, rating: 4.0, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80" },
    { id: 13, name: "Sunglasses UV400", category: "Fashion", price: 25, rating: 4.1, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80" },
    { id: 14, name: "Portable Projector", category: "Electronics", price: 280, rating: 4.5, image: "https://images.unsplash.com/photo-1637656367774-d5e65ace6290?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds" },
    { id: 15, name: "Organic Cotton Hoodie", category: "Fashion", price: 65, rating: 4.6, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
    { id: 16, name: "Aromatherapy Diffuser", category: "Home", price: 40, rating: 4.3, image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=400&q=80" }
];

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let selectedCategories = [];
let itemsLimit = 8;
let filteredList = [];

// Selectors
const productGrid = document.getElementById('product-grid');
const skeletonGrid = document.getElementById('skeleton-grid');
const cartBadge = document.getElementById('cart-badge');
const loadMoreBtn = document.getElementById('load-more-btn');

// 1. Initial Skeleton Loader
function initLoad() {
    skeletonGrid.innerHTML = Array(8).fill('<div class="skeleton"></div>').join('');
    setTimeout(() => {
        skeletonGrid.classList.add('hidden');
        productGrid.classList.remove('hidden');
        updateUI();
    }, 1500);
}

// 2. Filter & Sort Logic
function updateUI() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const maxPrice = parseInt(document.getElementById('price-slider').value);
    const sortType = document.getElementById('sort-dropdown').value;

    filteredList = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        const matchesCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
        const matchesPrice = p.price <= maxPrice;
        return matchesSearch && matchesCat && matchesPrice;
    });

    // Sorting
    if (sortType === 'low') filteredList.sort((a, b) => a.price - b.price);
    else if (sortType === 'high') filteredList.sort((a, b) => b.price - a.price);
    else if (sortType === 'rated') filteredList.sort((a, b) => b.rating - a.rating);

    render(filteredList.slice(0, itemsLimit));
    
    // Load More Visibility
    if (filteredList.length > itemsLimit) loadMoreBtn.classList.remove('hidden');
    else loadMoreBtn.classList.add('hidden');
}

// 3. Render Products
function render(list) {
    productGrid.innerHTML = '';
    if (list.length === 0) {
        document.getElementById('empty-msg').classList.remove('hidden');
        return;
    }
    document.getElementById('empty-msg').classList.add('hidden');

    list.forEach(item => {
        const isFav = wishlist.includes(item.id) ? 'active' : '';
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <button class="wishlist-btn ${isFav}" onclick="toggleWishlist(${item.id})">
                <i class="fas fa-heart"></i>
            </button>
            <img src="${item.image}" alt="${item.name}" onclick="openQuickView(${item.id})">
            <div class="card-info">
                <h4>${item.name}</h4>
                <small style="color: #666">${item.category} • ⭐ ${item.rating}</small>
                <div class="price-row">
                    <span class="price">$${item.price}</span>
                    <button class="buy-btn" onclick="addToCart(${item.id})">Add</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// 4. Cart & Wishlist Logic
function addToCart(id) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartBadge.textContent = cart.length;
    showToast();
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateUI();
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2500);
}

// 5. Quick View Modal
function openQuickView(id) {
    const p = products.find(x => x.id === id);
    const modal = document.getElementById('quick-view-modal');
    document.getElementById('modal-data').innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <img src="${p.image}" style="width:100%; border-radius:15px;">
            <div>
                <h2>${p.name}</h2>
                <p>Category: <strong>${p.category}</strong></p>
                <p>Rating: ⭐ ${p.rating}</p>
                <p>This is a premium quality ${p.name.toLowerCase()} designed for best experience.</p>
                <h2 class="price">$${p.price}</h2>
                <button class="buy-btn" style="width:100%; margin-top:20px;" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

// 6. Event Listeners
document.getElementById('search-input').addEventListener('input', updateUI);
document.getElementById('sort-dropdown').addEventListener('change', updateUI);
document.getElementById('price-slider').addEventListener('input', (e) => {
    document.getElementById('price-display').textContent = e.target.value;
    updateUI();
});

// Category Checkboxes
document.querySelectorAll('#category-filters input').forEach(box => {
    box.addEventListener('change', (e) => {
        if (e.target.checked) selectedCategories.push(e.target.value);
        else selectedCategories = selectedCategories.filter(c => c !== e.target.value);
        updateUI();
    });
});

// Load More
loadMoreBtn.addEventListener('click', () => {
    itemsLimit += 4;
    updateUI();
});

// Dark Mode
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
});

// Modal Close
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('quick-view-modal').style.display = 'none';
};

// Init on Load
if(localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
cartBadge.textContent = cart.length;
initLoad();


// নতুন সিলেক্টর যোগ করুন
const cartDrawer = document.getElementById('cart-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalDisplay = document.getElementById('cart-total');

// ৪. Cart & Wishlist Logic (আপডেটেড)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showToast();
}

function updateCartUI() {
    cartBadge.textContent = cart.length;
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div style="flex:1">
                <h5 style="margin:0">${item.name}</h5>
                <small>$${item.price}</small>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotalDisplay.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Draw open close
document.querySelector('.cart-container').addEventListener('click', () => {
    cartDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
});

document.querySelector('.close-drawer').onclick = closeDrawer;
drawerOverlay.onclick = closeDrawer;

function closeDrawer() {
    cartDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
}

// পেজ লোড হওয়ার সময় আগের কার্ট ডেটা রেন্ডার করা
updateCartUI();