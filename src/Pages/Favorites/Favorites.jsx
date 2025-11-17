import { useContext } from 'react'
import { useFavorites } from '../../context/FavoritesContext'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import './Favorites.css'

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  // Helper function to get emoji for ingredients
  const getIngredientEmoji = (ingredient) => {
    const emojiMap = {
      'Espresso': '☕',
      'Americano': '☕',
      'Cold Brew': '🧊',
      'Cappuccino': '☕',
      'Latte': '☕',
      'Filter Coffee': '☕',
      'Green Tea': '🍵',
      'Black Tea': '🍵',
      'Herbal Tea': '🍵',
      'Chai': '🍵',
      'Matcha': '🍵',
      'Masala Chai': '🍵',
      'Whole Milk': '🥛',
      'Skim Milk': '🥛',
      'Almond Milk': '🥛',
      'Oat Milk': '🥛',
      'Soy Milk': '🥛',
      'Coconut Milk': '🥛',
      'White Sugar': '🍚',
      'Brown Sugar': '🍚',
      'Honey': '🍯',
      'Maple Syrup': '🍯',
      'Stevia': '🍃',
      'Jaggery': '🍯',
      'Vanilla': '🌿',
      'Caramel': '🍮',
      'Hazelnut': '🌰',
      'Chocolate': '🍫',
      'Peppermint': '🌿',
      'Cinnamon': '🌿',
      'Cardamom': '🌿',
      'Whipped Cream': '🍦',
      'Chocolate Shavings': '🍫',
      'Cinnamon Powder': '🌿',
      'Caramel Drizzle': '🍮',
      'Cocoa Powder': '🍫',
      'Rose Petals': '🌹'
    };
    
    return emojiMap[ingredient] || '❓';
  };

  // Handle ordering a favorite creation
  const handleOrderCreation = (creation) => {
    if (!creation || !creation.id) return;

    const orderItem = {
      id: creation.id,
      name: creation.name || 'Custom Drink',
      ingredients: creation.ingredients || [],
      description: creation.description || '',
      price: creation.price || 0,
      quantity: 1,
      image: creation.image || '☕'
    };
    
    addToCart(orderItem);
    navigate('/cart');
  };

  return (
    <div className="favorites-page">
      <div className="container">
        <h1 className="page-title">My Favorites</h1>
        
        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map(creation => (
              <div key={creation.id} className="favorite-card">
                <div className="favorite-image">
                  <div className="mug-display">
                    <div className="mug-body-large">{creation.image}</div>
                    <div className="mug-handle-large"></div>
                  </div>
                  <button 
                    className="remove-favorite"
                    onClick={() => removeFromFavorites(creation.id)}
                    aria-label="Remove from favorites"
                  >
                    ♥
                  </button>
                </div>
                
                <div className="favorite-info">
                  <h3>{creation.name}</h3>
                  <p className="creation-description">{creation.description}</p>
                  <p className="creator">by {creation.creator}</p>
                  
                  <div className="ingredients-list">
                    <h4>Ingredients:</h4>
                    <div className="ingredients-chips">
                      {creation.ingredients.map((ingredient, index) => (
                        <span key={index} className="ingredient-chip">
                          <span className="ingredient-emoji">{getIngredientEmoji(ingredient)}</span>
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="favorite-price">₹{creation.price}</div>
                  
                  <div className="favorite-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => {
                        if (!creation || !creation.id) return;
                        
                        const orderItem = {
                          id: creation.id,
                          name: creation.name || 'Custom Drink',
                          ingredients: creation.ingredients || [],
                          description: creation.description || '',
                          price: creation.price || 0,
                          quantity: 1,
                          image: creation.image || '☕'
                        };
                        addToCart(orderItem);
                      }}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="buy-now-btn"
                      onClick={() => handleOrderCreation(creation)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <div className="heart-icon">♥</div>
            <h3>No favorites yet</h3>
            <p>Custom drinks you save will appear here.</p>
            <button 
              className="browse-btn"
              onClick={() => navigate('/customize')}
            >
              Create Your Drink
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites