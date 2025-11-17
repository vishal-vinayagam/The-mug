import './Menu.css'
import { useFavorites } from '../../context/FavoritesContext';

const Menu = ({ addToCart }) => {
  const menuItems = [
    {
      id: 1,
      name: "Caramel Macchiato",
      price: "$40",
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Espresso with steamed milk and caramel drizzle"
    },
    {
      id: 2,
      name: "Mocha Frappé",
      price: "$55",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Blended coffee with chocolate and whipped cream"
    },
    {
      id: 3,
      name: "Cappuccino",
      price: "$33",
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Equal parts espresso, steamed milk, and foam"
    },
    {
      id: 4,
      name: "Iced Americano",
      price: "$45",
      image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Espresso shots topped with cold water"
    },
    {
      id: 5,
      name: "Vanilla Latte",
      price: "$45",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Espresso with steamed milk and vanilla syrup"
    },
    {
      id: 6,
      name: "Seasonal Special",
      price: "$50",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Ask your barista about our current seasonal offering"
    }
  ]

  return (
    <section id="menu" className="menu section">
      <div className="container">
        <h2 className="section-title">Featured Menu</h2>
        
        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image">
                <img src={item.image} alt={item.name} />
                <button className="add-to-cart" onClick={addToCart}>
                  <i className="fas fa-plus"></i> Add to Cart
                </button>
              </div>
              <div className="menu-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-item-bottom">
                  <span className="price">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menu