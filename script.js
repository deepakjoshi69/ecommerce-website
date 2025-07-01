// Sample product data
const products = [
  {
    id: 1,
    name: "Smartphone X",
    category: "electronics",
    price: 799,
    description:
      "The latest smartphone with advanced camera features, long battery life, and a stunning display. Perfect for photography enthusiasts and heavy users.",
    image: "https://via.placeholder.com/300x300?text=Smartphone+X",
  },
  {
    id: 2,
    name: "Laptop Pro",
    category: "electronics",
    price: 1299,
    description:
      "Powerful laptop with high-performance processor, ample storage, and a vibrant display. Ideal for professionals and creative work.",
    image: "https://via.placeholder.com/300x300?text=Laptop+Pro",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    category: "electronics",
    price: 149,
    description:
      "Premium wireless earbuds with noise cancellation, long battery life, and crystal-clear sound quality. Perfect for music lovers on the go.",
    image: "https://via.placeholder.com/300x300?text=Wireless+Earbuds",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "electronics",
    price: 249,
    description:
      "Feature-packed smartwatch with health tracking, notifications, and a sleek design. The perfect companion for your active lifestyle.",
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
  },
  {
    id: 5,
    name: "Men's Casual Shirt",
    category: "clothing",
    price: 39,
    description:
      "Comfortable and stylish casual shirt made from premium cotton. Perfect for everyday wear and casual occasions.",
    image: "https://via.placeholder.com/300x300?text=Casual+Shirt",
  },
  {
    id: 6,
    name: "Women's Dress",
    category: "clothing",
    price: 59,
    description:
      "Elegant dress with a modern cut and comfortable fabric. Suitable for both casual and semi-formal occasions.",
    image: "https://via.placeholder.com/300x300?text=Women's+Dress",
  },
  {
    id: 7,
    name: "Denim Jeans",
    category: "clothing",
    price: 49,
    description:
      "Classic denim jeans with a comfortable fit and durable construction. A wardrobe essential for any season.",
    image: "https://via.placeholder.com/300x300?text=Denim+Jeans",
  },
  {
    id: 8,
    name: "Winter Jacket",
    category: "clothing",
    price: 89,
    description:
      "Warm and stylish winter jacket with water-resistant exterior and cozy lining. Perfect for cold weather conditions.",
    image: "https://via.placeholder.com/300x300?text=Winter+Jacket",
  },
  {
    id: 9,
    name: "Leather Wallet",
    category: "accessories",
    price: 29,
    description:
      "Genuine leather wallet with multiple card slots and a sleek design. Combines functionality with classic style.",
    image: "https://via.placeholder.com/300x300?text=Leather+Wallet",
  },
  {
    id: 10,
    name: "Sunglasses",
    category: "accessories",
    price: 79,
    description:
      "Stylish sunglasses with UV protection and durable frames. The perfect accessory for sunny days and outdoor activities.",
    image: "https://via.placeholder.com/300x300?text=Sunglasses",
  },
  {
    id: 11,
    name: "Backpack",
    category: "accessories",
    price: 59,
    description:
      "Versatile backpack with multiple compartments and ergonomic design. Ideal for daily commutes, travel, and outdoor adventures.",
    image: "https://via.placeholder.com/300x300?text=Backpack",
  },
  {
    id: 12,
    name: "Silver Necklace",
    category: "accessories",
    price: 99,
    description: "Elegant silver necklace with a minimalist design. A timeless piece that complements any outfit.",
    image: "https://via.placeholder.com/300x300?text=Silver+Necklace",
  },
  {
    id: 13,
    name: "Throw Pillow Set",
    category: "home",
    price: 35,
    description:
      "Set of decorative throw pillows with premium fabric and stylish designs. Perfect for adding comfort and style to your living space.",
    image: "https://via.placeholder.com/300x300?text=Throw+Pillows",
  },
  {
    id: 14,
    name: "Table Lamp",
    category: "home",
    price: 45,
    description:
      "Modern table lamp with adjustable brightness and elegant design. Adds both functionality and style to any room.",
    image: "https://via.placeholder.com/300x300?text=Table+Lamp",
  },
  {
    id: 15,
    name: "Ceramic Vase",
    category: "home",
    price: 25,
    description: "Handcrafted ceramic vase with a unique design. A beautiful decorative piece for your home or office.",
    image: "https://via.placeholder.com/300x300?text=Ceramic+Vase",
  },
  {
    id: 16,
    name: "Kitchen Utensil Set",
    category: "home",
    price: 55,
    description:
      "Complete set of high-quality kitchen utensils with ergonomic handles. Essential tools for any cooking enthusiast.",
    image: "https://via.placeholder.com/300x300?text=Kitchen+Utensils",
  },
]

// DOM Elements
const productsGrid = document.getElementById("products-grid")
const categoryFilter = document.getElementById("category-filter")
const minPriceInput = document.getElementById("min-price")
const maxPriceInput = document.getElementById("max-price")
const applyPriceFilterBtn = document.getElementById("apply-price-filter")
const categoryCards = document.querySelectorAll(".category-card")
const modal = document.getElementById("product-modal")
const closeModal = document.querySelector(".close-modal")
const modalProductDetails = document.getElementById("modal-product-details")

// Current filters
const currentFilters = {
  category: "all",
  minPrice: 0,
  maxPrice: Number.POSITIVE_INFINITY,
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products)
  setupEventListeners()
})

// Set up event listeners
function setupEventListeners() {
  // Category filter change
  categoryFilter.addEventListener("change", () => {
    currentFilters.category = categoryFilter.value
    applyFilters()
  })

  // Price filter button click
  applyPriceFilterBtn.addEventListener("click", () => {
    const minPrice = minPriceInput.value ? Number.parseInt(minPriceInput.value) : 0
    const maxPrice = maxPriceInput.value ? Number.parseInt(maxPriceInput.value) : Number.POSITIVE_INFINITY

    currentFilters.minPrice = minPrice
    currentFilters.maxPrice = maxPrice

    applyFilters()
  })

  // Category cards click
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category
      currentFilters.category = category
      categoryFilter.value = category
      applyFilters()

      // Scroll to products section
      document.querySelector(".products-section").scrollIntoView({ behavior: "smooth" })
    })
  })

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })
}

// Apply all current filters
function applyFilters() {
  const filteredProducts = products.filter((product) => {
    const categoryMatch = currentFilters.category === "all" || product.category === currentFilters.category
    const priceMatch = product.price >= currentFilters.minPrice && product.price <= currentFilters.maxPrice

    return categoryMatch && priceMatch
  })

  renderProducts(filteredProducts)
}

// Render products to the grid
function renderProducts(productsToRender) {
  productsGrid.innerHTML = ""

  if (productsToRender.length === 0) {
    productsGrid.innerHTML = '<p class="no-products">No products match your filters. Try adjusting your criteria.</p>'
    return
  }

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.dataset.id = product.id

    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${capitalizeFirstLetter(product.category)}</p>
                <p class="product-price">$${product.price}</p>
            </div>
        `

    productCard.addEventListener("click", () => {
      showProductDetails(product)
    })

    productsGrid.appendChild(productCard)
  })
}

// Show product details in modal
function showProductDetails(product) {
  modalProductDetails.innerHTML = `
        <div class="product-details">
            <div class="product-details-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details-info">
                <h2 class="product-details-name">${product.name}</h2>
                <p class="product-details-category">${capitalizeFirstLetter(product.category)}</p>
                <p class="product-details-price">$${product.price}</p>
                <p class="product-details-description">${product.description}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    `

  modal.style.display = "block"

  // Add to cart button (for future implementation)
  const addToCartBtn = modalProductDetails.querySelector(".add-to-cart-btn")
  addToCartBtn.addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
});

}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}
updateCartCount(); // Call it once on load
