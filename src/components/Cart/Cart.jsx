import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully!');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Your Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || '/api/placeholder/100/100'} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description || 'Premium quality product'}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-number">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{getCartTotal() > 50 ? 'Free' : '$5.99'}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>
                  ${(getCartTotal() + (getCartTotal() > 50 ? 0 : 5.99) + (getCartTotal() * 0.08)).toFixed(2)}
                </span>
              </div>
              
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    Proceed to Checkout
                  </>
                )}
              </button>
              
              <button 
                className="clear-cart-btn"
                onClick={clearCart}
              >
                <i className="fas fa-trash"></i>
                Clear Cart
              </button>
              
              <Link to="/" className="continue-shopping-link">
                <i className="fas fa-arrow-left"></i>
                Continue Shopping
              </Link>
            </div>
            
            <div className="promo-section">
              <h4>Apply Promo Code</h4>
              <div className="promo-input">
                <input type="text" placeholder="Enter promo code" />
                <button>Apply</button>
              </div>
              
              <div className="saved-coupons">
                <h5>Available Coupons</h5>
                <div className="coupon-item">
                  <span className="coupon-code">WELCOME15</span>
                  <span className="coupon-desc">15% off on first order</span>
                </div>
                <div className="coupon-item">
                  <span className="coupon-code">FREESHIP</span>
                  <span className="coupon-desc">Free shipping on orders over $50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;