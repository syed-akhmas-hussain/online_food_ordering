import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { CartStackLayoutStackParamList } from "./CartStackLayout";
import { StackScreenProps } from "@react-navigation/stack";
import { useCartContext } from "../../providers/CartProvider";
import MyButton from "../../componenets/MyButton";
import useUserLocationHook from "../CustomHooks/useUserLocation";
import { useCallback, useEffect, useState } from "react";
import { locationType, userCred } from "../../types";
import { LocationGeocodedAddress } from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useAuthContext } from "../../providers/AuthProvider";
import { useOrderContext } from "../../providers/OrderBucketProvider";

type PaymentScreenProps = StackScreenProps<
  CartStackLayoutStackParamList,
  "paymentScreen"
>;
const { height, width } = Dimensions.get("screen");
const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  const insets = useSafeAreaInsets();
  const { cartItem, setCartItems } = useCartContext();
  const { signupData, setSignUpData } = useAuthContext();
  const { orderList, setOrderList } = useOrderContext();
  const [locForform, setlocForform] = useState<string>("");
  const { userLocation, readAbleAddr, hasPermission } = useUserLocationHook();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [userData, setUserData] = useState<userCred>({
    name: "",
    address: "",
    email: "",
    contactNum: "",
  });
  const handleChangeText = (key: string | number, val: string | number) => {
    setUserData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };
  const setlocation = () => {
    console.log("func trigggered");
    setIsFetching(true);
    setTimeout(() => {
      if (userLocation.latitude && userLocation.longitude) {
        const addr: Partial<LocationGeocodedAddress> = readAbleAddr?.[0] || {};
        const { name, street, district, postalCode, region, city } = addr;
        const formattedAddr = [name, street, district, postalCode, city, region]
          .filter(Boolean)
          .join(", ");
        console.log(formattedAddr);
        setlocForform(formattedAddr);
        setUserData((prev) => ({ ...prev, address: formattedAddr }));
        setCartItems((prev) => ({
          ...prev,
          userDetails: { ...prev.userDetails, address: userLocation },
        }));
        setSignUpData((prev) => ({
          ...prev,
          userDetails: { ...prev.userDetails, address: formattedAddr },
        }));
      }
      setIsFetching(false);
    }, 2000);
  };
  useEffect(() => {
    if (
      userLocation.latitude &&
      userLocation.longitude &&
      userData.address === ""
    ) {
      setlocation();
    }
  }, [userLocation]);

  useEffect(() => {
    console.log(
      `this is stored address ${userLocation.latitude} ${userLocation.longitude}`
    );
    console.log(`this is readable stored address ${readAbleAddr?.[0].name}`);
    console.log(`this is locforform ${locForform}`);
    console.log("Updated userData.address:", userData.address);
    console.log(
      "Updated signupData.userDetails.address:",
      signupData.userDetails.address
    );
    if (typeof cartItem.userDetails.address === "object") {
      console.log(
        `Addr in cart ${cartItem.userDetails.address.latitude}, ${cartItem.userDetails.address.longitude}`
      );
    }
    console.log(signupData.userDetails);
  }, []);
  return (
    <SafeAreaView
      style={[styles.container, { marginBottom: insets.bottom + 100 }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Text style={styles.heading}>Delivery Details</Text>
          <View>
            <Text style={styles.labelText}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Jhon Mark"
              multiline={false}
              value={String(userData.name)}
              onChangeText={(t) => handleChangeText("name", t)}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="example@gmail.com"
              multiline={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={String(userData.email)}
              onChangeText={(t) => handleChangeText("email", t)}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Contact No.</Text>
            <TextInput
              style={styles.textInput}
              placeholder="03xx-xxxxxxx"
              multiline={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              value={String(userData.contactNum)}
              onChangeText={(t) => handleChangeText("contactNum", Number(t))}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder={
                locForform === ""
                  ? "House/appartment #, Area, block #, street, city"
                  : locForform
              }
              multiline={true}
              autoCapitalize="none"
              autoCorrect={false}
              value={String(userData.address)}
              onChangeText={(t) => handleChangeText("address", t)}
            />
          </View>
          <View style={{ flex: 1 }}>
            {signupData.userDetails.name &&
              signupData.userDetails.contactNum && signupData.userDetails.email && (
                <MyButton
                  text="Go with login credentials"
                  onPress={() => setUserData(signupData.userDetails)}
                />
              )}
            {!hasPermission && (
                <MyButton
                  text="Go with current location"
                  onPress={setlocation}
                />
              )}
          </View>
          <View>
            <Text
              style={{ alignSelf: "center", fontSize: 13, fontWeight: "400" }}
            >
              {isFetching ? "Fetching your current location" : ""}
            </Text>
          </View>
          {cartItem.userDetails && (
            <View style={styles.paymentRow}>
              <MyButton
                text="Cash on delivery?"
                onPress={() => {
                  setCartItems((prev) => ({ ...prev, paymentMethod: "COD" }));
                  console.log(cartItem.paymentMethod);
                  Alert.alert(
                    `Payment method cannot be changed later!! want to proceed?`,
                    "",
                    [
                      {
                        text: "Pay by card?",
                        onPress: () => {
                          setCartItems((prev) => ({
                            ...prev,
                            paymentMethod: "CARD",
                          }));
                          setOrderList((prev) => [...prev, cartItem]);
                        },
                      },
                      { text: "Proceed" },
                    ]
                  );
                }}
              />
              <MyButton
                text="By card"
                onPress={() => {
                  setCartItems((prev) => ({ ...prev, paymentMethod: "CARD" }));
                  console.log(cartItem.paymentMethod);
                  Alert.alert(
                    `Payment method cannot be changed later!! want to proceed?`,
                    "",
                    [
                      {
                        text: "Pay by card?",
                        onPress: () => {
                          setCartItems((prev) => ({
                            ...prev,
                            paymentMethod: "CARD",
                          }));
                          setOrderList((prev) => [...prev, cartItem]);
                        },
                      },
                      { text: "Proceed" },
                    ]
                  );
                }}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    padding: 20,
    width: width * 0.95,
    marginTop: 10,
  },
  paymentRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignSelf: "center",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "grey",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "300",
    textAlign: "center",
    textAlignVertical: "center",
    textDecorationLine: "underline",
  },
  textInput: {
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 3,
    width: "100%",
    marginBottom: 10,
  },
  label: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    maxWidth: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 3,
  },
  labelText: {
    alignSelf: "flex-start",
    paddingLeft: 10,
    fontWeight: "500",
    fontSize: 15,
  },
});
export default PaymentScreen;
