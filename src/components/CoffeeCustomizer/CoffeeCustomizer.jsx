import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoffeeCustomizer.css';
import Footer from '../Footer/Footer';
import { CartContext } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

// Mock data for ingredients with prices in INR
const INGREDIENTS = {
  coffee: [
    { name: 'Espresso', price: 60, image: '☕' },
    { name: 'Americano', price: 70, image: '☕' },
    { name: 'Cold Brew', price: 90, image: '🧊' },
    { name: 'Cappuccino', price: 80, image: '☕' },
    { name: 'Latte', price: 85, image: '☕' },
    { name: 'Filter Coffee', price: 50, image: '☕' }
  ],
  tea: [
    { name: 'Green Tea', price: 40, image: '🍵' },
    { name: 'Black Tea', price: 35, image: '🍵' },
    { name: 'Herbal Tea', price: 45, image: '🍵' },
    { name: 'Chai', price: 30, image: '🍵' },
    { name: 'Matcha', price: 75, image: '🍵' },
    { name: 'Masala Chai', price: 35, image: '🍵' }
  ],
  milk: [
    { name: 'Whole Milk', price: 15, image: '🥛' },
    { name: 'Skim Milk', price: 15, image: '🥛' },
    { name: 'Almond Milk', price: 25, image: '🥛' },
    { name: 'Oat Milk', price: 25, image: '🥛' },
    { name: 'Soy Milk', price: 20, image: '🥛' },
    { name: 'Coconut Milk', price: 25, image: '🥛' }
  ],
  sugar: [
    { name: 'White Sugar', price: 5, image: '🍚' },
    { name: 'Brown Sugar', price: 8, image: '🍚' },
    { name: 'Honey', price: 15, image: '🍯' },
    { name: 'Maple Syrup', price: 20, image: '🍯' },
    { name: 'Stevia', price: 10, image: '🍃' },
    { name: 'Jaggery', price: 10, image: '🍯' },
    { name: 'None', price: 0, image: '🚫' }
  ],
  flavors: [
    { name: 'Vanilla', price: 15, image: '🌿' },
    { name: 'Caramel', price: 20, image: '🍮' },
    { name: 'Hazelnut', price: 20, image: '🌰' },
    { name: 'Chocolate', price: 25, image: '🍫' },
    { name: 'Peppermint', price: 15, image: '🌿' },
    { name: 'Cinnamon', price: 10, image: '🌿' },
    { name: 'Cardamom', price: 10, image: '🌿' }
  ],
  toppings: [
    { name: 'Whipped Cream', price: 25, image: '🍦' },
    { name: 'Chocolate Shavings', price: 20, image: '🍫' },
    { name: 'Cinnamon Powder', price: 10, image: '🌿' },
    { name: 'Caramel Drizzle', price: 25, image: '🍮' },
    { name: 'Cocoa Powder', price: 15, image: '🍫' },
    { name: 'Rose Petals', price: 30, image: '🌹' }
  ]
};

const POPULAR_CREATIONS = [
  {
    id: 1,
    name: "Masala Chai Delight",
    ingredients: ["Masala Chai", "Whole Milk", "Jaggery", "Cardamom"],
    creator: "ChaiLover",
    likes: 254,
    price: 85,
    image: "🍵",
    description: "A perfect blend of spices and sweetness"
  },
  {
    id: 2,
    name: "Filter Coffee Special",
    ingredients: ["Filter Coffee", "Whole Milk", "White Sugar"],
    creator: "SouthIndian",
    likes: 198,
    price: 75,
    image: "☕",
    description: "Authentic South Indian filter coffee"
  },
  {
    id: 3,
    name: "Cardamom Cold Brew",
    ingredients: ["Cold Brew", "Cardamom", "Brown Sugar", "Almond Milk"],
    creator: "BrewMaster",
    likes: 167,
    price: 120,
    image: "🧊",
    description: "Refreshing cold brew with a hint of cardamom"
  },
  {
    id: 4,
    name: "Vanilla Latte Dream",
    ingredients: ["Latte", "Vanilla", "Whipped Cream"],
    creator: "SweetTooth",
    likes: 142,
    price: 110,
    image: "☕",
    description: "Creamy latte with vanilla sweetness"
  },
  {
    id: 5,
    name: "Hazelnut Americano",
    ingredients: ["Americano", "Hazelnut", "Brown Sugar"],
    creator: "NutLover",
    likes: 98,
    price: 95,
    image: "☕",
    description: "Bold americano with nutty hazelnut flavor"
  },
  {
    id: 6,
    name: "Matcha Green Delight",
    ingredients: ["Matcha", "Oat Milk", "Honey"],
    creator: "HealthyChoice",
    likes: 176,
    price: 130,
    image: "🍵",
    description: "Healthy matcha with oat milk and natural sweetness"
  },
  {
    id: 7,
    name: "Caramel Macchiato",
    ingredients: ["Espresso", "Caramel", "Whipped Cream", "Caramel Drizzle"],
    creator: "CaramelFan",
    likes: 210,
    price: 125,
    image: "☕",
    description: "Rich espresso with sweet caramel topping"
  },
  {
    id: 8,
    name: "Spiced Herbal Tea",
    ingredients: ["Herbal Tea", "Cinnamon", "Cardamom", "Honey"],
    creator: "WellnessWarrior",
    likes: 87,
    price: 80,
    image: "🍵",
    description: "Soothing herbal tea with warming spices"
  }
];

const AI_SUGGESTIONS = [
  "Add Cardamom for authentic Indian flavor",
  "Try with Almond Milk for a dairy-free option",
  "Jaggery pairs well with Masala Chai",
  "A dash of Cinnamon enhances the aroma",
  "Whipped cream adds a luxurious texture",
  "Cold brew is smoother and less acidic",
  "Honey is a natural sweetener with health benefits",
  "Oat milk creates a creamy texture without dairy"
];

const CoffeeCustomizer = () => {
  const [activeTab, setActiveTab] = useState('coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCreation, setSelectedCreation] = useState(null);
  const [price, setPrice] = useState(0);
  const [drinkPreference, setDrinkPreference] = useState('coffee');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [showMoreCombinations, setShowMoreCombinations] = useState(false);
  const [creationName, setCreationName] = useState('');
  const cupRef = useRef(null);
  
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useFavorites();
  const navigate = useNavigate();

  // Set random AI suggestion on load
  useEffect(() => {
    const randomSuggestion = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
    setAiSuggestion(randomSuggestion);
  }, []);

  // Filter ingredients based on search query
  const filteredIngredients = INGREDIENTS[activeTab].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate price based on ingredients (in Indian Rupees)
  useEffect(() => {
    const basePrice = drinkPreference === 'coffee' ? 60 : 50;
    const additionalPrice = ingredients.reduce((total, item) => total + item.price, 0);
    setPrice(basePrice + additionalPrice);
  }, [ingredients, drinkPreference]);

  // Add ingredient to cup
  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
    
    // Animation for adding ingredient
    if (cupRef.current) {
      cupRef.current.classList.add('ingredient-added');
      setTimeout(() => {
        if (cupRef.current) cupRef.current.classList.remove('ingredient-added');
      }, 500);
    }
  };

  // Remove ingredient from cup
  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const ingredientData = e.dataTransfer.getData("ingredient");
    if (ingredientData) {
      const ingredient = JSON.parse(ingredientData);
      addIngredient(ingredient);
    }
  };

  // Handle drag start event
  const handleDragStart = (e, ingredient) => {
    e.dataTransfer.setData("ingredient", JSON.stringify(ingredient));
  };

  // Open modal
  const openModal = (type, creation = null) => {
    setModalType(type);
    setSelectedCreation(creation);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCreation(null);
    setUserDescription('');
    setCreationName('');
  };

  // Try a random mix
  const tryRandomMix = () => {
    const randomIngredients = [];
    const categories = Object.keys(INGREDIENTS);
    
    // Add 1-2 random ingredients from different categories
    for (let i = 0; i < 3; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomIngredient = INGREDIENTS[randomCategory][Math.floor(Math.random() * INGREDIENTS[randomCategory].length)];
      
      if (!randomIngredients.some(item => item.name === randomIngredient.name)) {
        randomIngredients.push(randomIngredient);
      }
    }
    
    setIngredients(randomIngredients);
    
    // Set new AI suggestion
    const randomSuggestion = AI_SUGGESTIONS[Math.floor(Math.random() * AI_SUGGESTIONS.length)];
    setAiSuggestion(randomSuggestion);
  };

  // Copy a creation
  const copyCreation = (creation) => {
    const newIngredients = creation.ingredients.map(name => {
      for (const category of Object.keys(INGREDIENTS)) {
        const found = INGREDIENTS[category].find(item => item.name === name);
        if (found) return found;
      }
      return { name, price: 0, image: '❓' };
    });
    
    setIngredients(newIngredients);
    closeModal();
  };

  // Handle saving creation to favorites
  const handleSaveToFavorites = () => {
    const creation = {
      id: Date.now(),
      name: creationName || `My ${drinkPreference} Creation`,
      ingredients: ingredients.map(ing => ing.name),
      description: userDescription || `Custom ${drinkPreference} creation`,
      price: price,
      image: drinkPreference === 'coffee' ? '☕' : '🍵',
      creator: 'You'
    };
    addToFavorites(creation);
    closeModal();
  };

  // Handle ordering the drink
  const handleOrder = () => {
    const orderItem = {
      id: Date.now(),
      name: `Custom ${drinkPreference === 'coffee' ? 'Coffee' : 'Tea'}`,
      ingredients: ingredients.map(ing => ing.name),
      description: userDescription,
      price: price,
      quantity: 1
    };
    
    addToCart(orderItem);
    closeModal();
    navigate('/cart');
  };

  // Handle ordering a popular creation directly
  const handleOrderCreation = (creation) => {
    const orderItem = {
      id: creation.id,
      name: creation.name,
      ingredients: creation.ingredients,
      description: creation.description,
      price: creation.price,
      quantity: 1
    };
    
    addToCart(orderItem);
    navigate('/cart');
  };

  // Get visible combinations (first 4 or all if showMoreCombinations is true)
  const visibleCombinations = showMoreCombinations 
    ? POPULAR_CREATIONS 
    : POPULAR_CREATIONS.slice(0, 4);

  return (
    <div className="coffee-customizer">
      {/* Space for navbar */}
      <div className="navbar-space"></div>
      
      <div className="customizer-container">
        {/* Left Side: Cup Preview */}
        <div className="cup-preview">
          <div className="preview-header">
            <h2>Your {drinkPreference === 'coffee' ? 'Coffee' : 'Tea'}</h2>
            <div className="preference-selector">
              <button 
                className={drinkPreference === 'coffee' ? 'active' : ''}
                onClick={() => setDrinkPreference('coffee')}
              >
                Coffee
              </button>
              <button 
                className={drinkPreference === 'tea' ? 'active' : ''}
                onClick={() => setDrinkPreference('tea')}
              >
                Tea
              </button>
            </div>
          </div>
          
          <div className="cup-container">
            <div 
              className="cup" 
              ref={cupRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="mug-image">
                <div className="mug-handle"></div>
                <div className="mug-body">
                  <div className="cup-liquid">
                    {/* Liquid layers based on ingredients */}
                    {ingredients.map((ingredient, index) => (
                      <div 
                        key={index} 
                        className={`liquid-layer layer-${index}`}
                        style={{ 
                          backgroundColor: getIngredientColor(ingredient.name),
                          height: `${100 / (ingredients.length || 1)}%`,
                          bottom: `${(index * 100) / (ingredients.length || 1)}%`
                        }}
                      >
                        <div className="liquid-wave"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating toppings */}
                  {ingredients.filter(ing => 
                    ['Whipped Cream', 'Chocolate Shavings', 'Cinnamon Powder', 'Rose Petals'].includes(ing.name)
                  ).map((topping, index) => (
                    <div key={index} className={`floating-topping topping-${index}`}>
                      {topping.image}
                    </div>
                  ))}
                  
                  {/* Steam animation */}
                  <div className="steam"></div>
                </div>
              </div>
            </div>
            
            <div className="ai-suggestion-tip">
              <div className="lightbulb-icon">💡</div>
              <p>{aiSuggestion}</p>
            </div>
          </div>
          
          {/* Ingredients list */}
          <div className="ingredients-display">
            <h3>Your Ingredients</h3>
            {ingredients.length === 0 ? (
              <p className="empty-state">No ingredients added yet. Start building your drink!</p>
            ) : (
              <div className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-chip">
                    <span className="ingredient-image">{ingredient.image}</span>
                    <span className="ingredient-name">{ingredient.name}</span>
                    <span className="ingredient-price">₹{ingredient.price}</span>
                    <button className="remove-btn" onClick={() => removeIngredient(index)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

         
        </div>

        {/* Right Side: Customization Panel */}
        <div className="customization-panel">
          <h2>Customize Your Drink</h2>
          
          {/* Search bar */}
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category tabs */}
          <div className="category-tabs">
            {Object.keys(INGREDIENTS).map(category => (
              <button
                key={category}
                className={activeTab === category ? 'active' : ''}
                onClick={() => setActiveTab(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Ingredient list */}
          <div className="ingredient-list">
            {filteredIngredients.map(ingredient => (
              <div 
                key={ingredient.name} 
                className="ingredient-item"
                draggable
                onDragStart={(e) => handleDragStart(e, ingredient)}
                onClick={() => addIngredient(ingredient)}
              >
                <span className="ingredient-image">{ingredient.image}</span>
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-price">₹{ingredient.price}</span>
                <button className="add-button">+</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Price and action buttons */}
        <div className="action-bar">
          <div className="price-display">
            <div className="price-label">Total:</div>
            <div className="price">₹{price}</div>
          </div>
          
          <div className="ai-suggestion">
            <span className="suggestion-icon">💡</span>
            <span className="suggestion-text">{aiSuggestion}</span>
          </div>
          
          <div className="action-buttons">
            <div className="random-mix-section">
              <button className="random-mix-btn" onClick={tryRandomMix}>
                <span className="icon">🎲</span>
                Try Random Mix
              </button>
            </div>
            <button className="save-btn" onClick={() => openModal('save')}>Save</button>
            <button className="buy-btn" onClick={() => openModal('buy')}>Order Now</button>
          </div>
        </div>
        
        {/* Popular Combinations */}
        <div className="popular-combinations">
          <div className="combinations-header">
            <h3>Popular Combinations</h3>
          </div>
          <div className="combinations-list">
  {visibleCombinations.map((creation, index) => (
    <div
      key={creation.id}
      className="combination-card"
      style={{ animationDelay: `${index * 0.2}s` }} // delay 0.2s between cards
    >
      <div className="combination-image" onClick={() => openModal('view', creation)}>
        <div className="mini-mug">
          <div className="mini-mug-body">{creation.image}</div>
          <div className="mini-mug-handle"></div>
        </div>
      </div>

      <div className="combination-info">
        <h4 onClick={() => openModal('view', creation)}>{creation.name}</h4>
        <p className="creator">by {creation.creator}</p>
        <p className="creation-description">{creation.description}</p>
        <div className="combination-meta">
          <span className="likes">♥ {creation.likes}</span>
          <span className="price">₹{creation.price}</span>
        </div>
        <button
          className="order-now-btn"
          onClick={() => handleOrderCreation(creation)}
        >
          Order Now
        </button>
      </div>
    </div>
  ))}
</div>

          
          {/* View More/Less Button - Now placed below all cards */}
          {POPULAR_CREATIONS.length > 4 && (
            <div className="view-more-container">
              <button 
                className="show-more-btn"
                onClick={() => setShowMoreCombinations(!showMoreCombinations)}
              >
                {showMoreCombinations ? 'Show Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Now spans full width */}
      <div className="full-width-footer-container">
        <Footer />
      </div>

      {/* Modals */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalType === 'buy' && (
              <BuyModal 
                ingredients={ingredients} 
                price={price} 
                onEdit={closeModal} 
                userDescription={userDescription}
                setUserDescription={setUserDescription}
                onConfirm={handleOrder}
              />
            )}
            
            {modalType === 'view' && selectedCreation && (
              <ViewCreationModal 
                creation={selectedCreation} 
                onCopy={() => copyCreation(selectedCreation)}
                onClose={closeModal}
                onFavorite={() => {
                  const favoriteItem = {
                    ...selectedCreation,
                    id: Date.now(),
                    isFavorite: true
                  };
                  addToFavorites(favoriteItem);
                  closeModal();
                }}
                onOrder={() => {
                  const orderItem = {
                    id: selectedCreation.id,
                    name: selectedCreation.name,
                    ingredients: selectedCreation.ingredients,
                    description: selectedCreation.description,
                    price: selectedCreation.price,
                    quantity: 1
                  };
                  addToCart(orderItem);
                  closeModal();
                  navigate('/cart');
                }}
              />
            )}
            
            {modalType === 'save' && (
              <SaveModal 
                ingredients={ingredients} 
                onClose={closeModal}
                userDescription={userDescription}
                setUserDescription={setUserDescription}
                creationName={creationName}
                setCreationName={setCreationName}
                onSave={handleSaveToFavorites}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Components
const BuyModal = ({ ingredients, price, onEdit, userDescription, setUserDescription, onConfirm }) => (
  <div className="modal buy-modal">
    <h2>Confirm Your Order</h2>
    <div className="order-summary">
      <h3>Your Custom Drink</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <span className="ingredient-image">{ingredient.image}</span>
            <span className="ingredient-name">{ingredient.name}</span>
            <span className="ingredient-price">₹{ingredient.price}</span>
          </li>
        ))}
      </ul>
      
      <div className="description-section">
        <label htmlFor="order-description">Special Instructions:</label>
        <textarea
          id="order-description"
          placeholder="Tell the barista how you'd like your drink prepared..."
          value={userDescription}
          onChange={(e) => setUserDescription(e.target.value)}
          rows="3"
        />
      </div>
      
      <div className="order-total">Total: ₹{price}</div>
    </div>
    <div className="modal-actions">
      <button className="edit-btn" onClick={onEdit}>Edit Order</button>
      <button className="confirm-btn" onClick={onConfirm}>Confirm Purchase</button>
    </div>
  </div>
);

const ViewCreationModal = ({ creation, onCopy, onClose, onFavorite, onOrder }) => (
  <div className="modal view-modal">
    <h2>{creation.name}</h2>
    <p className="creator">by {creation.creator}</p>
    {creation.description && <p className="creation-description">{creation.description}</p>}
    
    <div className="creation-details">
      <h3>Ingredients</h3>
      <ul>
        {creation.ingredients.map((ingredient, index) => (
          <li key={index}>
            <span className="ingredient-image">{getIngredientEmoji(ingredient)}</span>
            {ingredient}
          </li>
        ))}
      </ul>
      
      <div className="creation-price">Price: ₹{creation.price}</div>
    </div>
    
    <div className="modal-actions">
      <button className="copy-btn" onClick={onCopy}>Use This Recipe</button>
      <button className="favorite-btn" onClick={onFavorite}>Add to Favorites</button>
      <button className="order-btn" onClick={onOrder}>Order Now</button>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  </div>
);

const SaveModal = ({ ingredients, onClose, userDescription, setUserDescription, creationName, setCreationName, onSave }) => {
  return (
    <div className="modal save-modal">
      <h2>Save Your Creation</h2>
      <div className="save-form">
        <input
          type="text"
          placeholder="Name your creation"
          value={creationName}
          onChange={(e) => setCreationName(e.target.value)}
        />
        
        <div className="description-section">
          <label htmlFor="save-description">Description:</label>
          <textarea
            id="save-description"
            placeholder="Add notes about your creation..."
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            rows="3"
          />
        </div>
        
        <div className="ingredients-list">
          <h4>Ingredients:</h4>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="ingredient-image">{ingredient.image}</span>
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
        <button className="save-confirm-btn" disabled={!creationName} onClick={onSave}>
          Save to Favorites
        </button>
      </div>
    </div>
  );
};

// Helper function to get color for ingredients
const getIngredientColor = (ingredient) => {
  const colorMap = {
    'Espresso': '#4B382A',
    'Americano': '#5C4033',
    'Filter Coffee': '#6F4E37',
    'Latte': '#D3BC8D',
    'Cappuccino': '#E0C9A6',
    'Green Tea': '#A1C349',
    'Black Tea': '#7C5C42',
    'Chai': '#B5651D',
    'Masala Chai': '#C07844',
    'Matcha': '#9ABC56',
    'Whole Milk': '#F8F5F0',
    'Almond Milk': '#F0E8D0',
    'Oat Milk': '#EEE0C9',
    'Soy Milk': '#F5F3EF',
    'Chocolate': '#6B4423',
    'Caramel': '#C85C25',
    'Vanilla': '#F3E5AB',
    'Cardamom': '#8FBC8F',
    'Jaggery': '#D2B48C',
    'Whipped Cream': '#FFFFFF',
    'Rose Petals': '#FFE4E1'
  };
  
  return colorMap[ingredient] || '#8B4513';
};

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

export default CoffeeCustomizer;