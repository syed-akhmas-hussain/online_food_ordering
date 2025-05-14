import { SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import MyButton from "../../componenets/MyButton";
import { TextInput } from "react-native";
import { LoginCredentialsType } from "../../types";
import { AuthStackParamList } from "./Layout";
import { useAuthContext } from "../../providers/AuthProvider";

type LocalSignInProps = NativeStackScreenProps<AuthStackParamList, "sign_in">;
const SignIn = ({ navigation }: LocalSignInProps) => {
  const [loginData, setLoginData] = useState<LoginCredentialsType>({
    email: "",
    password: "",
  });
  const { login, setLogin } = useAuthContext();
  const handlePress = () => {
    setLogin((prev) => !prev);
  };
  const handleChangeText = (key: "email" | "password", val: string) => {
    setLoginData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };
  const createAcc = () => {
    navigation.navigate("sign_up");
  };
  useEffect(() => {
    if (login) {
      navigation.reset({
        index: 0,
        routes: [{ name: "drawer_nav" }],
      });
    }
  }, [login, navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
            <Text style={styles.labels}>Email</Text>
            <TextInput
              keyboardType={"email-address"}
              placeholder="example@gmail.com"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={loginData.email}
              onChangeText={(text) => handleChangeText("email", text)}
            />
          </View>
          <View>
            <Text style={styles.labels}>Password</Text>
            <TextInput
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={loginData.password}
              onChangeText={(text) => handleChangeText("password", text)}
            />
          </View>
          <MyButton text="Log In" onPress={handlePress} />
          <MyButton text="Create Account" onPress={createAcc} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labels: {
    marginBottom: 3,
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});
export default SignIn;
