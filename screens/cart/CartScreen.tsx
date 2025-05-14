import { FlatList, Text, View, StyleSheet, Dimensions } from "react-native";
import { useCartContext } from "../../providers/CartProvider";
import { cartItems, order_cred } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import MyButton from "../../componenets/MyButton";
import { CartStackLayoutStackParamList } from "./CartStackLayout";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

type CartScreenProps = StackScreenProps<
  CartStackLayoutStackParamList,
  "cartScreen"
>;

const { height, width } = Dimensions.get("window");
const Cart = ({ navigation }: CartScreenProps) => {
  const bottomTabHeight = useBottomTabBarHeight();
  const topHeaderHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { cartItem, setCartItems } = useCartContext();
  const availableHeight =
    height - (bottomTabHeight + topHeaderHeight + insets.bottom + insets.top);

  const PlaceOrderFunc = () => {
    navigation.navigate("paymentScreen");
  };
  const onLess = (index: number) => {
    const eachItemQty = [...cartItem.orderDetails];
    eachItemQty[index].itemQty -= 1;
    const updatedOrderDetails = eachItemQty.filter((i) => i.itemQty > 0);
    const newTotal = eachItemQty.reduce((sum, i) => sum + i.itemPrice * i.itemQty, 0);
    setCartItems((prev) => ({
      ...prev,
      orderDetails: updatedOrderDetails,
      total: newTotal,
    }));
  };

  const onAdd = (index: number) => {
    const eachItemQty = [...cartItem.orderDetails];
    eachItemQty[index].itemQty += 1;
    // item.itemQty += 1;
    const newTotal = eachItemQty.reduce((sum, i) => sum + i.itemPrice * i.itemQty, 0);
    setCartItems((prev) => ({
      ...prev,
      orderDetails: eachItemQty,
      total: newTotal,
    }));
  };

  const clearCartFunc = () => {
    const nullcart: cartItems = {
      orderId: "",
      orderDetails: [],
      total: 0,
      userDetails: {
        name: "",
        address: { latitude: 0, longitude: 0 },
        email: "",
        contactNum: "",
      },
      orderStatus: "",
      paymentMethod: "",
    };
    setCartItems(() => nullcart);
  };

  const renderItems = ({
    item,
    index,
  }: {
    item: order_cred;
    index: number;
  }) => {
    return (
      <View style={styles.row}>
        <View style={styles.EachItem}>
          <Text style={[styles.itemText, { width: "33%" }]}>
            {item.itemName} x {item.itemQty}
          </Text>
          <Text style={[styles.itemText]}> {item.itemSize} </Text>
          <Text style={styles.itemText}> Rs. {item.itemPrice} </Text>
        </View>
        <View style={[styles.buttonRow]}>
          <Icon
            name="remove-circle-outline"
            onPress={() => onLess(index)}
            size={35}
          />
          <Icon
            name="add-circle-outline"
            onPress={() => onAdd(index)}
            size={35}
          />
        </View>
      </View>
    );
  };
  return (
    <View
      style={[
        styles.mainContainer,
        { height: availableHeight, paddingBottom: bottomTabHeight * 2 },
      ]}
    >
      <FlatList
        data={cartItem.orderDetails}
        renderItem={renderItems}
        style={styles.container}
        keyExtractor={(index) => index.toString()}
        ListHeaderComponent={
          <View>
            <View style={styles.heading}>
              <Text style={{ fontSize: 30, fontWeight: "400" }}>Order Id:</Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "300",
                  textAlign: "center",
                  textAlignVertical: "bottom",
                }}
              >
                #{cartItem.orderId}{" "}
              </Text>
            </View>
            <View
              style={[
                styles.EachItem,
                {
                  paddingTop: 10,
                  paddingHorizontal: 5,
                  width: width * 0.9,
                  marginTop: 10,
                  borderBottomWidth: 2,
                  borderColor: "white",
                },
              ]}
            >
              <Text style={[styles.itemText, { fontWeight: "400" }]}>
                Item name
              </Text>
              <Text style={[styles.itemText, { fontWeight: "400" }]}>
                Item size
              </Text>
              <Text style={[styles.itemText, { fontWeight: "400" }]}>
                Item price
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 5 }}>
              <MyButton text="Clear Cart" onPress={clearCartFunc} />
            </View>
            <View style={styles.total}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                  Total: Rs. {cartItem.total}
                </Text>
              </View>
            </View>
          </View>
        }
      />
      {cartItem.orderDetails.length === 0 ? (
        <></>
      ) : (
        <MyButton text="Place Order" onPress={PlaceOrderFunc} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    borderBottomWidth: 3,
    borderBottomColor: "black",
    marginBottom: 10,
  },
  mainContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: width * 0.9,
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: "white",
  },
  EachItem: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  total: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  itemText: {
    textAlign: "center",
    textAlignVertical: "bottom",
    alignSelf: "flex-end",
    fontSize: 20,
    fontWeight: "300",
  },
  totalText: {
    textAlign: "center",
    textAlignVertical: "bottom",
    fontSize: 20,
    fontWeight: "300",
  },
  totalContainer: {
    borderWidth: 2,
    borderColor: "white",
    height: "100%",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
  },
});
export default Cart;
