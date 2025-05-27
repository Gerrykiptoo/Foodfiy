import { useState, useEffect } from 'react';
import { 
  preloadImage, 
  isImageCached, 
  getOptimizedImageUrl, 
  getLowQualityPlaceholder,
  getFallbackImage
} from '../services/imageService';

/**
 * Custom hook for optimized image loading
 * @param {string} src - Image source URL
 * @param {Object} options - Options for image loading
 * @returns {Object} - Image loading state and optimized source
 */
const useImageLoader = (src, options = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  
  useEffect(() => {
    if (!src) {
      setError(true);
      setLoading(false);
      setImageSrc(getFallbackImage(null, options.category));
      return;
    }
    
    // Reset states when src changes
    setLoading(true);
    setError(false);
    
    // Optimize the image URL
    const optimizedSrc = getOptimizedImageUrl(src, options);
    
    // Check if the image is already cached
    if (isImageCached(optimizedSrc)) {
      setImageSrc(optimizedSrc);
      setLoading(false);
      return;
    }
    
    // First load a low-quality placeholder
    const placeholderSrc = getLowQualityPlaceholder(src, options.category);
    setImageSrc(placeholderSrc);
    
    // Set a timeout to ensure we don't wait too long for images
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn(`Image loading timeout for: ${src}`);
        setImageSrc(getFallbackImage(src, options.category));
        setLoading(false);
        setError(true);
      }
    }, 8000); // 8 seconds timeout
    
    // Then preload the full quality image
    preloadImage(optimizedSrc)
      .then(() => {
        clearTimeout(timeoutId);
        setImageSrc(optimizedSrc);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeoutId);
        setImageSrc(getFallbackImage(src, options.category));
        setError(true);
        setLoading(false);
      });
    
    return () => {
      clearTimeout(timeoutId);
    };
    
  }, [src, options.width, options.quality, options.category, loading]);
  
  return { loading, error, imageSrc };
};

export default useImageLoader;