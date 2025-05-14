import React, { createContext, ReactNode, useContext, useState } from "react";
import { SignUpCredentialsType } from "../types";

type AuthContextType = {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  signupData: SignUpCredentialsType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpCredentialsType>>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [login, setLogin] = useState<boolean>(false);
  const [signupData, setSignUpData] = useState<SignUpCredentialsType>({
    userDetails: {
      name: "",
      address: { longitude: 0, latitude: 0 },
      email: "",
      contactNum: "",
    },
    age: "",
    pass1: "",
    pass2: "",
    signup: false,
  });
  return (
    <AuthContext.Provider
      value={{ login, setLogin, signupData, setSignUpData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuthContext must be used within AuthProvider");
  }
  return context;
};
export { AuthProvider, useAuthContext };
