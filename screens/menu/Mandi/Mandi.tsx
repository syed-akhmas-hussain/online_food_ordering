import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MandiStackParamList } from "./MAndiStack";
import { useState } from "react";
import { order_cred } from "../../../types";
import { useCartContext } from "../../../providers/CartProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MandiDetailScreenProps = NativeStackScreenProps<
  MandiStackParamList,
  "mandiDetails"
>;
type selectionType = {
  bg1: string;
  bg2: string;
  bg3: string;
  single: boolean;
  double: boolean;
  family: boolean;
};
const { height, width } = Dimensions.get("window");
const MandiDetails = ({ route }: MandiDetailScreenProps) => {
  const { item } = route.params;
  const { cartItem, setCartItems } = useCartContext();
  const insets = useSafeAreaInsets();
  const [selection, setSelection] = useState<selectionType>({
    bg1: "#ffffff",
    bg2: "#ffffff",
    bg3: "#ffffff",
    single: false,
    double: false,
    family: false,
  });
  const handleOnPress = (id: number) => {
    if (id === 1) {
      setSelection(() => ({
        bg1: "#3c99dc",
        bg2: "#ffffff",
        bg3: "#ffffff",
        single: true,
        double: false,
        family: false,
      }));
    } else if (id === 2) {
      setSelection(() => ({
        bg1: "#ffffff",
        bg2: "#3c99dc",
        bg3: "#ffffff",
        single: false,
        double: true,
        family: false,
      }));
    } else {
      setSelection(() => ({
        bg1: "#ffffff",
        bg2: "#ffffff",
        bg3: "#3c99dc",
        single: false,
        double: false,
        family: true,
      }));
    }
  };
  // const [itemCounter, setItemCounter] = useState<number>(0);
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: "#ffffff",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: insets.bottom + 100,
          height: height,
        },
      ]}
    >
      <Image source={{ uri: item.Image }} style={s.image} />
      <Text style={[s.text, { fontWeight: "bold" }]}> {item.MandiName} </Text>
      <Text style={[s.text, { paddingHorizontal: 10, fontSize: 15 }]}>
        {" "}
        {item.Description}{" "}
      </Text>
      <View
        style={[
          {
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginBottom: 30,
            width: "96%",
          },
        ]}
      >
        <TouchableOpacity
          style={[s.smallBox, { backgroundColor: selection.bg1 }]}
          onPress={() => handleOnPress(1)}
        >
          <Text style={s.text2}> {item.MandiSize.single} </Text>
          <Text style={s.text3}> {item.MandiPrice.single} </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.smallBox, { backgroundColor: selection.bg2 }]}
          onPress={() => handleOnPress(2)}
        >
          <Text style={s.text2}> {item.MandiSize.double} </Text>
          <Text style={s.text3}> {item.MandiPrice.double} </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.smallBox, { backgroundColor: selection.bg3 }]}
          onPress={() => handleOnPress(3)}
        >
          <Text style={s.text2}> {item.MandiSize.family} </Text>
          <Text style={s.text3}> {item.MandiPrice.family} </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={s.button}
        onPress={() => {
          const isSelectionMade =
            selection.double || selection.family || selection.single;
          if (!isSelectionMade) {
            Alert.alert("Please select mandi serving size!!!");
            return;
          }
          const selectedSize = selection.single
            ? item.MandiSize.single
            : selection.double
            ? item.MandiSize.double
            : item.MandiSize.family;
          const price = selection.single
            ? item.MandiPrice.single
            : selection.double
            ? item.MandiPrice.double
            : item.MandiPrice.family;
          const existingIndex = cartItem.orderDetails.findIndex(
            (i) => i.itemName === item.MandiName && i.itemSize === selectedSize
          );
          const updateCart = [...cartItem.orderDetails];
          if (existingIndex === -1) {
            const newOrder: order_cred = {
              itemName: item.MandiName,
              itemPrice: price,
              itemSize: selectedSize,
              itemQty: 1,
            };
            updateCart.push(newOrder);
          } else {
            updateCart[existingIndex].itemQty += 1;
          }
          const newTotal = updateCart.reduce(
            (sum, i) => sum + i.itemQty * i.itemPrice,
            0
          );

          setCartItems((prev) => ({
            ...prev,
            orderId: Date.now().toString(),
            orderStatus: "Cooking",
            orderDetails: updateCart,
            total: newTotal,
          }));
          Alert.alert("Proceed?", "", [
            { text: "Cancel", style: "cancel" },
            { text: "Confirm", onPress: () => console.log("Confirmed!") },
          ]);
        }}
      >
        <Text style={[s.text, { paddingTop: 5 }]}>Add to cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const s = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  button: {
    width: "40%",
    margin: 2,
    borderRadius: 10,
    backgroundColor: "#3C99DC",
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  text2: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  text3: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  smallBox: {
    width: "25%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#757575",
  },
});
export default MandiDetails;
