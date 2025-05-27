import React, { useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useImageLoader from "../hooks/useImageLoader";
import { preloadImage } from "../services/imageService";

const OptimizedImage = ({ src, alt, className, style, width = 400, quality = 80, category = null }) => {
  const { loading, error, imageSrc } = useImageLoader(src, { width, quality, category });
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Use Intersection Observer to detect when image is visible
  useEffect(() => {
    // Skip if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) return;
    
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && src) {
        // Preload image when it becomes visible
        preloadImage(src).catch(() => {
          // Silently fail - the useImageLoader will handle errors
        });
        
        // Stop observing once we've started loading
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      }
    }, {
      rootMargin: '200px', // Start loading when image is 200px from viewport
      threshold: 0.01 // Trigger when at least 1% of the element is visible
    });
    
    // Start observing the container
    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div 
      ref={imgRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {loading && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <Skeleton height="100%" width="100%" />
        </div>
      )}
      
      {error ? (
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f9fa",
            color: "#6c757d"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <i className="fas fa-image" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}></i>
            <p style={{ margin: 0, fontSize: "0.8rem" }}>Image not available</p>
          </div>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          style={{
            ...style,
            opacity: loading ? 0.5 : 1,
            filter: loading ? "blur(10px)" : "none",
            transition: "opacity 0.3s ease, filter 0.3s ease",
          }}
          loading="lazy" // Use native lazy loading as a fallback
        />
      )}
    </div>
  );
};

export default OptimizedImage;