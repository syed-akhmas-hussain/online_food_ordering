import { createContext, ReactNode, useContext, useState } from "react";
import { cartItems } from "../types";

interface CartContextType {
  cartItem: cartItems;
  setCartItems: React.Dispatch<React.SetStateAction<cartItems>>;
}
type CartProviderType = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: CartProviderType) => {
  const [cartItem, setCartItems] = useState<cartItems>({
    orderId: "",
    orderDetails: [],
    userDetails: {
      name: "",
      address: { longitude: 0, latitude: 0 },
      email: "",
      contactNum: "",
    },
    total: 0,
    orderStatus: "",
    paymentMethod: "",
  });
  return (
    <CartContext.Provider value={{ cartItem, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Cart context must be used within CartProvider");
  }
  return context;
};
export { CartProvider, useCartContext };
