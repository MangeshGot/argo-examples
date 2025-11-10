import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        {
          productId: product._id,
          quantity,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/update`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
