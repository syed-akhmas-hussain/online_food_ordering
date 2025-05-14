import { createContext, ReactNode, useContext, useState } from "react";

type SearchTextProviderType = {
  text: string;
  setText: (value: string) => void;
};
type SearchTextProviderProps = {
  children: ReactNode;
};
const SearchTextContext = createContext<SearchTextProviderType | undefined>(
  undefined
);
const SearchTextProvider = ({ children }: SearchTextProviderProps) => {
  const [text, setText] = useState<string>("");
  return (
    <SearchTextContext.Provider value={{ text, setText }}>
      {children}
    </SearchTextContext.Provider>
  );
};
const useSearchTextContext = () => {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext can only be used in SearchTextProvider"
    );
  }
  return context;
};
export { SearchTextProvider, useSearchTextContext };
