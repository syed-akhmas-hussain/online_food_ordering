import { createStackNavigator } from "@react-navigation/stack";
import Cart from "./CartScreen";
import PaymentScreen from "./PaymentScreen";
import { OrderBucketProvider } from "../../providers/OrderBucketProvider";

export type CartStackLayoutStackParamList = {
  cartScreen: undefined;
  paymentScreen: undefined;
};
const Stack = createStackNavigator<CartStackLayoutStackParamList>();
const CartStackLayout = () => {
  return (
    <OrderBucketProvider>
      <Stack.Navigator initialRouteName="cartScreen">
        <Stack.Screen
          name="cartScreen"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="paymentScreen"
          component={PaymentScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              elevation: 0,
            },
          }}
        />
      </Stack.Navigator>
    </OrderBucketProvider>
  );
};
export default CartStackLayout;
