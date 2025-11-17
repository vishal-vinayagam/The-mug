import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import LiveCafe from './components/LiveCafe/LiveCafe';
import LiveCafePage from './Pages/LiveCafePage';
import CoffeeCustomizer from './components/CoffeeCustomizer/CoffeeCustomizer';
import Reservation from './components/Reservation/Reservation';
import About from './components/About/About';
import Testimonials from './components/Testimonials/Testimonials';
import Events from './components/Events/Events';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import Login from './components/Auth/Login';
import CoffeeLoader from './components/CoffeeLoader/CoffeeLoader';
import Cart from './components/Cart/Cart';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import Profile from './Pages/Profile/Profile.jsx';
import Orders from './Pages/Orders/Orders';
import Favorites from './Pages/Favorites/Favorites';
import Coupons from './Pages/Coupons/Coupons';
import Messages from './Pages/Messages/Messages';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import RouteWithErrorBoundary from './components/RouteWithErrorBoundary/RouteWithErrorBoundary';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show the loader for 3 seconds on initial load
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(loaderTimer);
    };
  }, []);

  if (showLoader) {
    return <CoffeeLoader />;
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <ErrorBoundary>
                <Header user={user} />
                <Routes>
                  <Route path="/login" element={<RouteWithErrorBoundary><Login /></RouteWithErrorBoundary>} />
                  <Route path="/custom_live" element={<RouteWithErrorBoundary><LiveCafePage /></RouteWithErrorBoundary>} />
                  <Route path="/customize-mug" element={<RouteWithErrorBoundary><CoffeeCustomizer /></RouteWithErrorBoundary>} />
                  <Route path="/cart" element={<RouteWithErrorBoundary><Cart /></RouteWithErrorBoundary>} />
                  {/* Profile Routes */}
                  <Route path="/profile" element={<RouteWithErrorBoundary><Profile /></RouteWithErrorBoundary>} />
                  <Route path="/orders" element={<RouteWithErrorBoundary><Orders /></RouteWithErrorBoundary>} />
                  <Route path="/favorites" element={<RouteWithErrorBoundary><Favorites /></RouteWithErrorBoundary>} />
                  <Route path="/coupons" element={<RouteWithErrorBoundary><Coupons /></RouteWithErrorBoundary>} />
                  <Route path="/messages" element={<RouteWithErrorBoundary><Messages /></RouteWithErrorBoundary>} />
                  <Route path="/" element={
                    <RouteWithErrorBoundary>
                      <>
                        <Hero />
                        <About />
                        <Menu />
                        <LiveCafe />
                        <Reservation />
                        <Testimonials />
                        <Events />
                        <Newsletter />
                        <Footer />
                      </>
                    </RouteWithErrorBoundary>
                  } />
                </Routes>
              </ErrorBoundary>
            </div>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;