import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subject: '',
    message: '' 
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="text-center mb-5">We'd love to hear from you! Reach out with any questions or feedback.</p>
        </div>
      </div>
      
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Have a question about our services or want to provide feedback? Fill out the form and we'll get back to you as soon as possible.</p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Our Location</h5>
                    <p>Nairobi Food Street, Pangani RD, Kenya</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Phone Number</h5>
                    <p>+ (254)703 888 085</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Email Address</h5>
                    <p>info@foodify.com</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Working Hours</h5>
                    <p>Mon - Sun: 10:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h5>Follow Us</h5>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="contact-form-container">
              {formSubmitted ? (
                <div className="form-success">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
              ) : (
                <>
                  <h3>Send Us a Message</h3>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="name">Your Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number (Optional)</label>
                          <input 
                            type="tel" 
                            className="form-control" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange} 
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="subject">Subject</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="subject" 
                            name="subject" 
                            value={formData.subject}
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group mb-4">
                      <label htmlFor="message">Your Message</label>
                      <textarea 
                        className="form-control" 
                        id="message" 
                        name="message" 
                        rows="5" 
                        value={formData.message}
                        onChange={handleChange} 
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary submit-btn" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i> Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997455.2762148668!2d36.70649716777472!3d-1.2863893279325821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f172ee34e3e09%3A0x1d1bf9476db3fb16!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1622219321229!5m2!1sen!2s"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    title="Foodify Nairobi Location"
  ></iframe>
</div>

      <div className="container py-5">
        <div className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-item">
                <h5><i className="fas fa-question-circle me-2"></i> How do I place an order?</h5>
                <p>You can place an order by browsing our menu, selecting items, adding them to your cart, and proceeding to checkout.</p>
              </div>
              
              <div className="faq-item">
                <h5><i className="fas fa-question-circle me-2"></i> What are your delivery hours?</h5>
                <p>We deliver from 10:00 AM to 10:00 PM, seven days a week.</p>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="faq-item">
                <h5><i className="fas fa-question-circle me-2"></i> Is there a minimum order amount?</h5>
                <p>Yes, the minimum order amount is $10. Orders above $30 qualify for free delivery.</p>
              </div>
              
              <div className="faq-item">
                <h5><i className="fas fa-question-circle me-2"></i> How can I track my order?</h5>
                <p>Once your order is confirmed, you'll receive a tracking link via email and SMS to monitor your delivery in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
