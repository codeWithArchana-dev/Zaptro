import axios from "axios";
import { createContext, useState, useContext } from "react";

export const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // fetching alll products from api
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log(res);
      const productsData = res.data;
      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  };
  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });

    newVal = ["All", ...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueCategory(data, "category");
  
  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, categoryOnlyData }}
    >
      {children}
    </DataContext.Provider>
  );
};
// create custom hooks
export const getData = () => useContext(DataContext);
