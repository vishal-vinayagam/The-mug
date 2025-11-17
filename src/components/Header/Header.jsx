import { useState, useEffect, useContext, useRef } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { CartContext } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const profileRef = useRef(null)

  const { getCartItemsCount } = useContext(CartContext)
  const { favorites } = useFavorites()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsProfileOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user && user.displayName) {
      return user.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return 'US'
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          
          {/* Logo */}
          <Link to="/" className="logo">
            <img src="logo.png" alt="Mug Vibe" />
            <span>The Mug</span>
          </Link>
          
          {/* Nav Menu */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a></li>
              <li><Link to="/customize-mug" onClick={() => setIsMenuOpen(false)}>Make Your Drink</Link></li>
              <li><a href="#reservation" onClick={() => setIsMenuOpen(false)}>Reservation</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              {user && <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>}
            </ul>
          </nav>
          
          {/* Actions */}
          <div className="header-actions">
            
            {/* Cart */}
            <Link to="/cart" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              {getCartItemsCount() > 0 && <span className="cart-count">{getCartItemsCount()}</span>}
            </Link>
            
            {/* Favorites */}
            <Link to="/favorites" className="favorites-btn">
              <i className="fas fa-heart"></i>
              {favorites && favorites.length > 0 && (
                <span className="favorites-count">{favorites.length}</span>
              )}
            </Link>
            
            {/* Profile */}
            <div className="profile-container" ref={profileRef}>
              {user ? (
                <>
                  <button className="profile-toggle" onClick={toggleProfile}>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="profile-avatar-small" />
                    ) : (
                      <div className="profile-avatar-initials">{getUserInitials()}</div>
                    )}
                  </button>
                  
                  {isProfileOpen && (
                    <div className="profile-dropdown">
                      <div className="profile-header">
                        <div className="profile-avatar">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || 'User'} />
                          ) : (
                            <div className="profile-avatar-large">{getUserInitials()}</div>
                          )}
                        </div>
                        <div className="profile-info">
                          <h4>{user.displayName || 'User'}</h4>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="profile-menu">
                        <Link to="/profile" className="profile-item" onClick={() => setIsProfileOpen(false)}>
                          <i className="fas fa-user"></i>
                          <span>My Profile</span>
                        </Link>
                        <Link to="/orders" className="profile-item" onClick={() => setIsProfileOpen(false)}>
                          <i className="fas fa-shopping-bag"></i>
                          <span>My Orders</span>
                        </Link>
                        <Link to="/favorites" className="profile-item" onClick={() => setIsProfileOpen(false)}>
                          <i className="fas fa-heart"></i>
                          <span>My Favorites</span>
                          {favorites && favorites.length > 0 && (
                            <span className="badge">{favorites.length}</span>
                          )}
                        </Link>
                        <Link to="/coupons" className="profile-item" onClick={() => setIsProfileOpen(false)}>
                          <i className="fas fa-ticket-alt"></i>
                          <span>Coupons & Offers</span>
                          <span className="badge">3</span>
                        </Link>
                        <Link to="/messages" className="profile-item" onClick={() => setIsProfileOpen(false)}>
                          <i className="fas fa-envelope"></i>
                          <span>Messages</span>
                          <span className="badge">5</span>
                        </Link>
                        <div className="profile-divider"></div>
                        <button className="profile-item logout-btn" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt"></i>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="login-btn">
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
