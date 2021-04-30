import axios from "axios";

export const API = "https://dog.ceo/api/breeds";
interface BreedsResponse {
  message: Array<string[]>;
}

export const getAllBreeds = async (): Promise<BreedsResponse> => {
  try {
    const url = `${API}/list/all`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};
