import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Mandi, pizza } from "../types";
import axios from "axios";

type DataType = {
  pizza_data: pizza[] | null;
  mandi_data: Mandi[] | null;
  err: string | null;
  loading: boolean;
};
type DataProviderContextType = {
  data: DataType;
};
type DataProviderProps = {
  children: ReactNode;
};
const DataContext = createContext<DataProviderContextType | undefined>(
  undefined
);
const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataType>({
    pizza_data: null,
    mandi_data: null,
    err: null,
    loading: true,
  });
  const url1 = "http://192.168.7.113:3000/data/pizza";
  const url2 = "http://192.168.7.113:3000/data/mandi";
  const url11 = "http://192.168.100.243:3000/data/pizza";
  const url22 = "http://192.168.100.243:3000/data/mandi";
  const url111 = "http://192.168.7.111:3000/data/pizza";
  const url222 = "http://192.168.7.111:3000/data/mandi";
  const mobileDataPIzzaUrl = "http://192.168.43.177:3000/data/pizza";
  const mobileDataMandiUrl = "http://192.168.43.177:3000/data/mandi";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get<pizza[]>(url111);
        const res2 = await axios.get<Mandi[]>(url222);
        setData((prev) => ({
          ...prev,
          pizza_data: res1.data,
          mandi_data: res2.data,
          err: null,
          loading: false,
        }));
      } catch (error: any) {
        setData((prev) => ({
          ...prev,
          err: "Error loading data",
          loading: false,
        }));
      }
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within DataProvider");
  }
  return context;
};
export { DataProvider, useDataContext };
