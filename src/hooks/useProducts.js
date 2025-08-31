import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both products and categories
      const [productsByCategory, categoryNames] = await Promise.all([
        ApiService.getProductsByCategory(),
        ApiService.getCategoryNames()
      ]);
      
      setProducts(productsByCategory);
      setCategories(categoryNames);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError(err.message);
      
      // Fallback to static data if API fails
      const { categories: staticCategories, products: staticProducts } = await import('../../src/data/products');
      setCategories(staticCategories);
      setProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    products,
    categories,
    loading,
    error,
    refetch
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
