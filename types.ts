export type LoginCredentialsType = {
    email: string;
    password: string;
  };
  export type userCred = {
    name: string;
    address: locationType | string;
    email: string;
    contactNum: number | string;
  };
  export type SignUpCredentialsType = {
    userDetails: userCred;
    age: number | "";
    pass1: string;
    pass2: string;
    signup: boolean;
  };
  type PizzaSize = "small" | "medium" | "large";
  type PizzaPrice = 499 | 799 | 1199;
  export type pizza = {
    id: number;
    PizzaName: string;
    Description: string;
    Image: string;
    PizzaSize: Record<"s" | "m" | "l", PizzaSize>;
    PizzaPrice: Record<"s" | "m" | "l", PizzaPrice>;
  };
  type MandiSize = "1 person" | "2 person" | "3 person";
  type MandiPrice = 1499 | 2499 | 3999;
  export type Mandi = {
    id: string;
    MandiName: string;
    Description: string;
    Image: string;
    MandiSize: Record<"single" | "double" | "family", MandiSize>;
    MandiPrice: Record<"single" | "double" | "family", MandiPrice>;
  };
  export type OrderStatus = "Cooking" | "On the way" | "Delivered";
  export type userOrderCred = {
    userLocation: string;
    userDetails: userCred;
  };
  export type order_cred = {
    itemName: string;
    itemSize: MandiSize | PizzaSize;
    itemPrice: MandiPrice | PizzaPrice;
    itemQty: number;
  };

  export type cartItems = {
    orderId: string;
    orderDetails: order_cred[];
    userDetails: userCred;
    orderStatus: OrderStatus | "";
    total: number;
    paymentMethod: 'COD' | 'CARD' | "";
  };
  export type locationType = {
    longitude: number;
    latitude: number;
  };
  //orders to deliver and current orders will be dealt using context api, s
  //state(array of cartItem) content will be similar and copied from cart item\ nu
