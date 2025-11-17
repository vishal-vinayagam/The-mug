import { useState } from 'react'
import './Testimonials.css'

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Mug Vibe has the best coffee in town! The atmosphere is perfect for both working and relaxing.",
      date: "2025-01-15",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "As a food blogger, I've visited countless coffee shops, but Mug Vibe stands out for their attention to detail.",
      date: "2025-01-10",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ])

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  })

  const [showForm, setShowForm] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview({
      ...newReview,
      [name]: value
    })
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const review = {
      id: reviews.length + 1,
      name: newReview.name || 'Anonymous',
      rating: parseInt(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      image: `https://i.pravatar.cc/150?img=${reviews.length + 10}`
    }
    
    setReviews([review, ...reviews])
    setNewReview({ name: '', rating: 5, comment: '' })
    setShowForm(false)
  }

  return (
    <section id="reviews" className="reviews section">
      <div className="container">
        <h2 className="section-title">Customer Reviews</h2>
        <p className="section-subtitle">Share your experience with us</p>
        
        <div className="reviews-header">
          <div className="reviews-summary">
            <div className="average-rating">
              <span className="rating-value">
                {((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) || 0).toFixed(1)}
              </span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) ? 'filled' : ''}`}></i>
                ))}
              </div>
              <span className="rating-count">Based on {reviews.length} reviews</span>
            </div>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="fas fa-plus"></i> Write a Review
          </button>
        </div>
        
        {showForm && (
          <div className="review-form-container">
            <h3>Share Your Experience</h3>
            <form className="review-form" onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label htmlFor="name">Your Name (Optional)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label>Your Rating</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star}>
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={parseInt(newReview.rating) === star}
                        onChange={handleInputChange}
                      />
                      <i className={`fas fa-star ${star <= newReview.rating ? 'filled' : ''}`}></i>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Your Review</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Share your experience at The Mug Cafe..."
                  required
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <img src={review.image} alt={review.name} />
                  <div>
                    <h4>{review.name}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}></i>
                  ))}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews