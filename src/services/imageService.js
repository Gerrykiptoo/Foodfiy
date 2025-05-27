// Image cache to store preloaded images
const imageCache = new Map();

// Default fallback image URL
const FALLBACK_IMAGE = 'https://via.placeholder.com/400x300/f0f0f0/cccccc?text=Image+Not+Available';

/**
 * Preload an image and store it in cache
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
export const preloadImage = (src) => {
  // If already in cache, return the cached promise
  if (imageCache.has(src)) {
    return imageCache.get(src);
  }

  // Create a new promise for loading the image
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });

  // Store the promise in cache
  imageCache.set(src, promise);
  return promise;
};

/**
 * Preload multiple images at once
 * @param {Array<string>} sources - Array of image source URLs
 * @param {Object} options - Options for preloading
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadImages = (sources, options = {}) => {
  const { 
    batchSize = 3, 
    delay = 100,
    priorityIndices = [] 
  } = options;
  
  // If no sources, return resolved promise
  if (!sources || sources.length === 0) {
    return Promise.resolve([]);
  }
  
  // Prioritize certain images (e.g., visible ones)
  const prioritizedSources = [...sources];
  
  // Move priority images to the front of the queue
  if (priorityIndices.length > 0) {
    const priorityImages = priorityIndices.map(index => sources[index]).filter(Boolean);
    const remainingImages = sources.filter((_, index) => !priorityIndices.includes(index));
    prioritizedSources.splice(0, prioritizedSources.length, ...priorityImages, ...remainingImages);
  }
  
  // Load images in batches to prevent overwhelming the browser
  return new Promise((resolve, reject) => {
    const results = [];
    let currentIndex = 0;
    
    const loadNextBatch = () => {
      if (currentIndex >= prioritizedSources.length) {
        resolve(results);
        return;
      }
      
      const batch = prioritizedSources.slice(currentIndex, currentIndex + batchSize);
      currentIndex += batchSize;
      
      Promise.all(batch.map(src => preloadImage(src)))
        .then(batchResults => {
          results.push(...batchResults);
          
          // Load next batch after a small delay
          setTimeout(loadNextBatch, delay);
        })
        .catch(error => {
          // Continue loading even if some images fail
          console.warn('Error preloading batch of images:', error);
          setTimeout(loadNextBatch, delay);
        });
    };
    
    // Start loading the first batch
    loadNextBatch();
  });
};

/**
 * Check if an image is already cached
 * @param {string} src - Image source URL
 * @returns {boolean} - True if the image is cached
 */
export const isImageCached = (src) => {
  return imageCache.has(src);
};

/**
 * Get optimized image URL for different services
 * @param {string} url - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  const { width = 400, quality = 80 } = options;
  
  // Check if URL is valid
  if (!url || typeof url !== 'string') {
    return getFallbackImage(null, options.category);
  }
  
  try {
    // Unsplash optimization
    if (url.includes('unsplash.com')) {
      // Parse the current URL
      const urlObj = new URL(url);
      
      // Add or update width and quality parameters
      urlObj.searchParams.set('w', width);
      urlObj.searchParams.set('q', quality);
      urlObj.searchParams.set('auto', 'format');
      
      return urlObj.toString();
    }
    
    // Add more image service optimizations here as needed
    
    // Return original URL if no optimization is available
    return url;
  } catch (error) {
    console.error('Error optimizing image URL:', error);
    return getFallbackImage(url, options.category);
  }
};

/**
 * Generate a low-quality placeholder URL
 * @param {string} url - Original image URL
 * @returns {string} - Low-quality placeholder URL
 */
export const getLowQualityPlaceholder = (url, category = null) => {
  try {
    if (!url || typeof url !== 'string') {
      return getFallbackImage(null, category);
    }
    
    // For Unsplash images, use their built-in resizing
    if (url.includes('unsplash.com')) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', 20);
      urlObj.searchParams.set('q', 20);
      urlObj.searchParams.set('blur', 10);
      return urlObj.toString();
    }
    
    // For other images, just return the original URL
    // In a production app, you might want to use a service like Cloudinary
    // that can generate low-quality placeholders
    return url;
  } catch (error) {
    console.error('Error creating low-quality placeholder:', error);
    return getFallbackImage(url, category);
  }
};

/**
 * Get a fallback image URL if the original fails to load
 * @param {string} originalUrl - Original image URL that failed
 * @param {string} category - Optional category to provide more specific fallbacks
 * @returns {string} - Fallback image URL
 */
export const getFallbackImage = (originalUrl, category = null) => {
  // You can customize this to return different fallbacks based on category
  if (category) {
    switch(category.toLowerCase()) {
      case 'burgers':
        return 'https://via.placeholder.com/400x300/f5f5f5/999999?text=Burger';
      case 'pizza':
        return 'https://via.placeholder.com/400x300/f5f5f5/999999?text=Pizza';
      case 'pasta':
        return 'https://via.placeholder.com/400x300/f5f5f5/999999?text=Pasta';
      case 'salads':
        return 'https://via.placeholder.com/400x300/f5f5f5/999999?text=Salad';
      case 'desserts':
        return 'https://via.placeholder.com/400x300/f5f5f5/999999?text=Dessert';
      default:
        break;
    }
  }
  
  // Default fallback
  return FALLBACK_IMAGE;
};