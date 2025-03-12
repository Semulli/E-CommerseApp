import axios from "axios";


const api = axios.create({
  baseURL: " https://dummyjson.com/products",
});
export const getData = async () => {
  try {
    const response = await api.get();
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const getSingleData= async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };