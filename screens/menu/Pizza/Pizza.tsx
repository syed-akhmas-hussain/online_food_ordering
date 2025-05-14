import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PizzaStackParamList } from "./PizzaStack";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useCartContext } from "../../../providers/CartProvider";
import { order_cred } from "../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type select = {
  small: boolean;
  medium: boolean;
  large: boolean;
};

type bgColor = {
  bg1: string;
  bg2: string;
  bg3: string;
};

type PizzaDetailProps = NativeStackScreenProps<
  PizzaStackParamList,
  "pizza_detail"
>;
const PizzaDetails = ({ route }: PizzaDetailProps) => {
  const { cartItem, setCartItems } = useCartContext();
  const insets = useSafeAreaInsets();
  const {
    PizzaName,
    Description,
    Image: pizzaImage,
    PizzaSize,
    PizzaPrice,
  } = route.params;

  const [bgColor, setBgColor] = useState<bgColor>({
    bg1: "#ffffff",
    bg2: "#ffffff",
    bg3: "#ffffff",
  });
  const [selection, setSelection] = useState<select>({
    small: false,
    medium: false,
    large: false,
  });

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: "#ffffff",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: insets.bottom + 100,
        },
      ]}
    >
      <View style={{ width: "90%" }}>
        <Image source={{ uri: pizzaImage }} style={styles.image} />
        <Text style={[styles.text, { fontWeight: "bold" }]}>{PizzaName}</Text>
        <Text style={[styles.text, { paddingHorizontal: 10 }]}>
          {Description}
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
            style={[styles.smallBox, { backgroundColor: bgColor.bg1 }]}
            onPress={() => {
              setBgColor(() => ({
                bg1: "#3c99dc",
                bg2: "#ffffff",
                bg3: "#ffffff",
              }));
              setSelection(() => ({
                small: true,
                medium: false,
                large: false,
              }));
            }}
          >
            <Text style={styles.text2}>{PizzaSize.s}</Text>
            <Text style={styles.text3}>{PizzaPrice.s}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallBox, { backgroundColor: bgColor.bg2 }]}
            onPress={() => {
              setBgColor(() => ({
                bg2: "#3c99dc",
                bg1: "#ffffff",
                bg3: "#ffffff",
              }));
              setSelection(() => ({
                small: false,
                medium: true,
                large: false,
              }));
            }}
          >
            <Text style={styles.text2}>{PizzaSize.m}</Text>
            <Text style={styles.text3}>{PizzaPrice.m}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallBox, { backgroundColor: bgColor.bg3 }]}
            onPress={() => {
              setBgColor(() => ({
                bg1: "#ffffff",
                bg2: "#ffffff",
                bg3: "#3c99dc",
              }));
              setSelection(() => ({
                small: false,
                medium: false,
                large: true,
              }));
            }}
          >
            <Text style={styles.text2}>{PizzaSize.l}</Text>
            <Text style={styles.text3}>{PizzaPrice.l}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!selection.large && !selection.medium && !selection.small) {
              Alert.alert("Please select pizza size!!!");
              return;
            }
            const selectedSize = selection.small
              ? PizzaSize.s
              : selection.medium
              ? PizzaSize.m
              : PizzaSize.l;
            const price = selection.small
              ? PizzaPrice.s
              : selection.medium
              ? PizzaPrice.m
              : PizzaPrice.l;
            const existingIndex = cartItem.orderDetails.findIndex(
              (val) =>
                val.itemName === PizzaName && val.itemSize === selectedSize
            );
            // console.log(`not same ${notSameItems}`);
            // console.log(`are same ${alreadyInCart}`);
            const updateCart = [...cartItem.orderDetails];
            if (existingIndex === -1) {
              const currOrder: order_cred = {
                itemName: PizzaName,
                itemPrice: price,
                itemSize: selectedSize,
                itemQty: 1,
              };
              updateCart.push(currOrder);
            } else {
              updateCart[existingIndex].itemQty += 1;
            }
            const newTotal = updateCart.reduce(
              (sum, i) => sum + i.itemPrice * i.itemQty,
              0
            );
            setCartItems((prev) => ({
              ...prev,
              orderDetails: updateCart,
              total: newTotal,
              orderId: Date.now().toString(),
              orderStatus: "Cooking",
            }));
            Alert.alert(
              "Proceed?",
              "",
              [
                { text: "Cancel", style: "cancel" }, // Cancel button
                { text: "Confirm", onPress: () => console.log("Confirmed!") }, // OK button
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={[styles.text, { paddingTop: 5 }]}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: "center",
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
    width: "20%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#757575",
  },
});

export default PizzaDetails;
