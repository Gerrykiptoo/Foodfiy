import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductCard.css";

const ProductCardSkeleton = () => {
  return (
    <div className="product-card">
      <div className="product-card-inner">
        <div className="product-image-container">
          <Skeleton height={200} width="100%" />
        </div>
        
        <div className="product-content">
          <Skeleton width={80} height={16} />
          
          <h5 className="product-title">
            <Skeleton width="80%" height={24} />
          </h5>
          
          <div className="product-meta">
            <div className="product-rating">
              <Skeleton width={120} height={20} />
            </div>
          </div>
          
          <div className="product-description">
            <Skeleton count={2} />
          </div>
          
          <div className="product-dietary">
            <Skeleton width={60} height={20} />
            <Skeleton width={80} height={20} />
          </div>
          
          <div className="product-footer">
            <Skeleton width={60} height={24} />
            <Skeleton width={80} height={36} borderRadius={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;