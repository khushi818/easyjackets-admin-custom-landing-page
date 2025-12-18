import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customCart , setCustomCart ] = useState([])

  useEffect(() => {
    let existingCartItem = sessionStorage.getItem("cart");
    let existingCartCustomItem = sessionStorage.getItem("customcart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
    if(existingCartCustomItem) setCustomCart(JSON.parse(existingCartCustomItem))
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart , customCart , setCustomCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
