import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the CartItem interface to structure the items in the cart
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Define the CartContextType interface that includes all the methods and state
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
}

// Create a context for the cart
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component that wraps the app and provides the CartContext
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Cart state to hold all items added to the cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find((product) => product.id === item.id);

      if (existingItem) {
        // If the item exists, update its quantity
        return prevItems.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + item.quantity } // Add to the existing quantity
            : product
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevItems, item];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Filter out the item with the given id
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item // Prevent quantity from being less than 1
      )
    );
  };

  // Function to calculate the total price of all items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext in components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

