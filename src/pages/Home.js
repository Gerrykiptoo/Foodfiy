import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Featured categories
  const categories = [
    {
      id: 1,
      name: 'Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      description: 'Juicy, savory burgers with premium toppings'
    },
    {
      id: 2,
      name: 'Pizza',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
      description: 'Handcrafted pizzas with fresh ingredients'
    },
    {
      id: 3,
      name: 'Healthy',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      description: 'Nutritious meals for the health-conscious'
    },
    {
      id: 4,
      name: 'Desserts',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80',
      description: 'Sweet treats to satisfy your cravings'
    }
  ];

  // How it works steps
  const steps = [
    {
      icon: 'fa-mobile-alt',
      title: 'Choose Your Food',
      description: 'Browse our extensive menu and select your favorite dishes'
    },
    {
      icon: 'fa-credit-card',
      title: 'Easy Payment',
      description: 'Pay securely with multiple payment options'
    },
    {
      icon: 'fa-truck',
      title: 'Fast Delivery',
      description: 'Get your food delivered to your doorstep in minutes'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="hero-title">Delicious Food Delivered to Your Door</h1>
              <p className="hero-subtitle">Order your favorite meals from the best restaurants in town</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/products" className="btn btn-primary cta-button">
                  <i className="fas fa-utensils me-2"></i> Explore Menu
                </Link>
                <Link to="/contact" className="btn btn-outline-light cta-button">
                  <i className="fas fa-headset me-2"></i> Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-image-container">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" 
                     alt="Delicious food" className="img-fluid rounded-circle hero-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Explore Food Categories</h2>
          <div className="row">
            {categories.map(category => (
              <div key={category.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 category-card">
                  <img src={category.image} className="card-img-top" alt={category.name} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">{category.description}</p>
                    <Link to="/products" className="btn btn-sm btn-outline-primary">
                      Explore <i className="fas fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="row">
            {steps.map((step, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="how-it-works-card text-center p-4">
                  <div className="icon-container mb-3">
                    <i className={`fas ${step.icon} fa-2x`}></i>
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <div className="step-number">{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="testimonial-card p-4">
                <div className="testimonial-rating mb-3">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">"The food was amazing and delivery was super fast! Will definitely order again."</p>
                <div className="testimonial-author">
                  <div className="testimonial-author-name">Sarah Atieno</div>
                  <div className="testimonial-author-title">Regular Customer</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card p-4">
                <div className="testimonial-rating mb-3">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">"Great variety of restaurants and cuisines. The app is so easy to use!"</p>
                <div className="testimonial-author">
                  <div className="testimonial-author-name">Michael otego </div>
                  <div className="testimonial-author-title">Foodie Enthusiast</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card p-4">
                <div className="testimonial-rating mb-3">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <p className="testimonial-text">"The customer service is excellent. They resolved my issue immediately!"</p>
                <div className="testimonial-author">
                  <div className="testimonial-author-name">Gerry Biwott</div>
                  <div className="testimonial-author-title">New Customer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Banner */}
      <section className="app-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2>Download Our Mobile App</h2>
              <p>Get exclusive offers and track your deliveries in real-time</p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <a href="#" className="app-download-button">
                  <i className="fab fa-google-play me-2"></i> Google Play
                </a>
                <a href="#" className="app-download-button">
                  <i className="fab fa-apple me-2"></i> App Store
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80" 
                alt="Mobile app" 
                className="img-fluid app-screenshot" 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
