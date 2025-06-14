import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import OptimizedImage from "./OptimizedImage";
import "./ProductCard.css";

const ProductCard = ({ 
  id, 
  name, 
  price, 
  rating, 
  description, 
  image, 
  category, 
  popular, 
  preparationTime, 
  dietary, 
  onAddToCart 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-inner">
        <div className="product-image-container">
          <OptimizedImage 
            src={image} 
            className="product-image" 
            alt={name}
            width={400}
            quality={85}
            category={category}
          />
          
          {popular && (
            <span className="popular-badge">
              <i className="fas fa-fire"></i> Popular
            </span>
          )}
          
          <div className={`product-overlay ${isHovered ? 'show' : ''}`}>
            <button 
              className="quick-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                // Quick view functionality could be added here
              }}
            >
              <i className="fas fa-eye"></i> Quick View
            </button>
          </div>
        </div>
        
        <div className="product-content">
          <div className="product-category">{category}</div>
          
          <h5 className="product-title">{name}</h5>
          
          <div className="product-meta">
            <div className="product-rating">
              <span className="rating-value">{rating.toFixed(1)}</span>
              <div className="rating-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <i 
                    key={i} 
                    className={`fas ${
                      i < Math.floor(rating) 
                        ? 'fa-star' 
                        : i < Math.ceil(rating) && rating % 1 !== 0 
                          ? 'fa-star-half-alt' 
                          : 'fa-star empty-star'
                    }`}
                  ></i>
                ))}
              </div>
            </div>
            
            <div className="product-time">
              <i className="far fa-clock"></i> {preparationTime}
            </div>
          </div>
          
          <p className="product-description">{description}</p>
          
          {dietary && dietary.length > 0 && (
            <div className="product-dietary">
              {dietary.map((item, index) => (
                <span key={index} className="dietary-tag">
                  {item}
                </span>
              ))}
            </div>
          )}
          
          <div className="product-footer">
            <div className="product-price">{price}</div>
            <button 
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <i className="fas fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
