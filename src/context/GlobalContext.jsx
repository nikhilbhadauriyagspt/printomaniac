import React, { createContext, useContext, useState, useEffect } from 'react';
import API_BASE_URL from '../config';

const GlobalContext = createContext();

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initial fast fetch for critical data
        const [catRes, brandRes, initialProdRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json()),
          fetch(`${API_BASE_URL}/products?limit=20`).then(r => r.json())
        ]);

        if (catRes.status === 'success') setCategories(catRes.data || []);
        if (brandRes.status === 'success') setBrands(brandRes.data || []);
        if (initialProdRes.status === 'success') setProducts(initialProdRes.data || []);
        
        // Mark loading as false as soon as we have enough for the initial view
        setLoading(false);

        // Fetch remaining products in the background without blocking
        fetch(`${API_BASE_URL}/products?limit=1000`)
          .then(r => r.json())
          .then(fullProdRes => {
            if (fullProdRes.status === 'success') {
              setProducts(fullProdRes.data || []);
            }
          })
          .catch(err => console.error('Background product fetch failed', err));

      } catch (err) {
        console.error('GlobalContext: Data fetch failed', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{
      categories,
      products,
      brands,
      loading
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
