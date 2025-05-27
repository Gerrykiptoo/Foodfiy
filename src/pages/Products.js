import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

// Expanded menu items with categories
const allMenuItems = [
  {
    id: 1,
    name: "Classic Burger",
    price: "$12.99",
    rating: 4.8,
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1170&q=80",
    category: "Burgers",
    popular: true,
    preparationTime: "15 min",
    dietary: ["Contains Gluten", "Contains Dairy"]
  },
  {
    id: 2,
    name: "Veggie Burger",
    price: "$11.99",
    rating: 4.6,
    description: "Plant-based patty with avocado, lettuce, tomato, and vegan mayo",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1170&q=80",
    category: "Burgers",
    popular: false,
    preparationTime: "15 min",
    dietary: ["Vegetarian", "Contains Gluten"]
  },
  {
    id: 3,
    name: "Double Cheeseburger",
    price: "$15.99",
    rating: 4.9,
    description: "Two beef patties with double cheese, bacon, and our signature sauce",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1170&q=80",
    category: "Burgers",
    popular: true,
    preparationTime: "20 min",
    dietary: ["Contains Gluten", "Contains Dairy"]
  },
  {
    id: 4,
    name: "Margherita Pizza",
    price: "$14.99",
    rating: 4.7,
    description: "Traditional pizza with tomato sauce, mozzarella, and fresh basil",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1170&q=80",
    category: "Pizza",
    popular: true,
    preparationTime: "20 min",
    dietary: ["Vegetarian", "Contains Gluten", "Contains Dairy"]
  },
  {
    id: 5,
    name: "Pepperoni Pizza",
    price: "$16.99",
    rating: 4.8,
    description: "Classic pizza topped with pepperoni slices and mozzarella cheese",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1170&q=80",
    category: "Pizza",
    popular: true,
    preparationTime: "20 min",
    dietary: ["Contains Gluten", "Contains Dairy"]
  },
  {
    id: 6,
    name: "Vegetable Pizza",
    price: "$15.99",
    rating: 4.5,
    description: "Fresh vegetables, tomato sauce, and cheese on a thin crust",
    image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=1170&q=80",
    category: "Pizza",
    popular: false,
    preparationTime: "20 min",
    dietary: ["Vegetarian", "Contains Gluten", "Contains Dairy"]
  },
  {
    id: 7,
    name: "Chicken Alfredo Pasta",
    price: "$16.99",
    rating: 4.6,
    description: "Creamy alfredo sauce with grilled chicken and fettuccine pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1170&q=80",
    category: "Pasta",
    popular: false,
    preparationTime: "25 min",
    dietary: ["Contains Gluten", "Contains Dairy"]
  },
  {
    id: 8,
    name: "Spaghetti Bolognese",
    price: "$14.99",
    rating: 4.7,
    description: "Spaghetti with rich meat sauce and parmesan cheese",
    image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=1170&q=80",
    category: "Pasta",
    popular: true,
    preparationTime: "20 min",
    dietary: ["Contains Gluten", "Contains Dairy"]
  },
  {
    id: 9,
    name: "Caesar Salad",
    price: "$10.99",
    rating: 4.5,
    description: "Fresh romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1170&q=80",
    category: "Salads",
    popular: false,
    preparationTime: "10 min",
    dietary: ["Contains Dairy", "Contains Gluten"]
  },
  {
    id: 10,
    name: "Greek Salad",
    price: "$11.99",
    rating: 4.6,
    description: "Cucumber, tomato, olives, feta cheese, and olive oil dressing",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1170&q=80",
    category: "Salads",
    popular: false,
    preparationTime: "10 min",
    dietary: ["Vegetarian", "Contains Dairy"]
  },
  {
    id: 11,
    name: "Chocolate Brownie",
    price: "$6.99",
    rating: 4.9,
    description: "Warm chocolate brownie with vanilla ice cream and chocolate sauce",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1170&q=80",
    category: "Desserts",
    popular: true,
    preparationTime: "15 min",
    dietary: ["Vegetarian", "Contains Gluten", "Contains Dairy"]
  },
  {
    id: 12,
    name: "Cheesecake",
    price: "$7.99",
    rating: 4.8,
    description: "Creamy New York style cheesecake with berry compote",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1170&q=80",
    category: "Desserts",
    popular: true,
    preparationTime: "10 min",
    dietary: ["Vegetarian", "Contains Gluten", "Contains Dairy"]
  }
];

const Products = () => {
  const [menuItems, setMenuItems] = useState(allMenuItems);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  // Get all unique categories
  const categories = ["All", ...new Set(allMenuItems.map(item => item.category))];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort menu items
  useEffect(() => {
    let filteredItems = [...allMenuItems];
    
    // Filter by category
    if (activeCategory !== "All") {
      filteredItems = filteredItems.filter(item => item.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort items
    switch (sortOption) {
      case "price-low":
        filteredItems.sort((a, b) => parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1)));
        break;
      case "price-high":
        filteredItems.sort((a, b) => parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1)));
        break;
      case "rating":
        filteredItems.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (by id)
        filteredItems.sort((a, b) => a.id - b.id);
    }
    
    setMenuItems(filteredItems);
  }, [activeCategory, searchTerm, sortOption]);

  const handleAddToCart = (item) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event("cartUpdated"));
    
    // Show toast notification instead of alert
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-check-circle toast-icon"></i>
        <div class="toast-message">${item.name} added to cart!</div>
      </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  return (
    <main className="menu-page">
      <div className="menu-header">
        <div className="container">
          <h1 className="section-title">Our Menu</h1>
          <p className="text-center mb-5">Discover our delicious selection of food prepared with fresh ingredients</p>
          
          {/* Search and Sort */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="search-container">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search for dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
            </div>
            <div className="col-md-6">
              <select 
                className="form-select sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container">
        {isLoading ? (
          <div className="row">
            {Array(6).fill().map((_, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x mb-3 text-muted"></i>
            <h3>No items found</h3>
            <p>Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="row">
            {menuItems.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                <ProductCard {...item} onAddToCart={() => handleAddToCart(item)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
