import { createContext, useContext, useState } from 'react'

export const FavoritesContext = createContext()

export const useFavorites = () => {
  return useContext(FavoritesContext)
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addToFavorites = (creation) => {
    setFavorites(prev => {
      // Check if the creation with the same name already exists
      const exists = prev.some(item => item.name === creation.name);
      if (!exists) {
        const newFavorites = [...prev, creation];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      }
      return prev;
    });
  }

  const removeFromFavorites = (creationId) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(item => item.id !== creationId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    hasFavorite: (name) => favorites.some(item => item.name === name)
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}