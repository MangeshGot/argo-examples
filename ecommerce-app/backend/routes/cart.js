const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const carts = new Map();

router.get('/', authMiddleware, (req, res) => {
  const cart = carts.get(req.userId) || [];
  res.json(cart);
});

router.post('/add', authMiddleware, (req, res) => {
  try {
    const { productId, quantity, name, price, image } = req.body;
    
    let cart = carts.get(req.userId) || [];
    
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ productId, quantity, name, price, image });
    }
    
    carts.set(req.userId, cart);
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

router.put('/update', authMiddleware, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    let cart = carts.get(req.userId) || [];
    
    const itemIndex = cart.findIndex(item => item.productId === productId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
    }
    
    carts.set(req.userId, cart);
    res.json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

router.delete('/remove/:productId', authMiddleware, (req, res) => {
  try {
    const { productId } = req.params;
    
    let cart = carts.get(req.userId) || [];
    cart = cart.filter(item => item.productId !== productId);
    
    carts.set(req.userId, cart);
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

router.delete('/clear', authMiddleware, (req, res) => {
  try {
    carts.set(req.userId, []);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
