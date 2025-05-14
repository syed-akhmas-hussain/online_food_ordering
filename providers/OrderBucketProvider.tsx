import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { cartItems } from "../types";

interface OrderBucketContextType {
  orderList: cartItems[] | null;
  setOrderList: React.Dispatch<SetStateAction<cartItems[]>>;
}
type OrderBucketProviderProptype = {
  children: ReactNode;
};
const OrderBucketContext = createContext<OrderBucketContextType | undefined>(
  undefined
);
const OrderBucketProvider = ({ children }: OrderBucketProviderProptype) => {
  const [orderList, setOrderList] = useState<cartItems[]>([]);
  return (
    <OrderBucketContext.Provider value={{ orderList, setOrderList }}>
      {children}
    </OrderBucketContext.Provider>
  );
};
const useOrderContext = () => {
  const context = useContext(OrderBucketContext);
  if (!context) {
    throw new Error("useOrderContext must be used withi OrderBucketProvider");
  }
  return context;
};
export { OrderBucketProvider, useOrderContext };
