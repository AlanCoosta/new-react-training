export const API = "https://dog.ceo/api/breeds";

interface BreedsResponse {
  message: Array<string[]>;
}

export const getAllBreeds = async (): Promise<BreedsResponse> => {
  try {
    const url = `${API}/list/all`;
    const response = await fetch(url);

    return response.json();
  } catch (error) {
    throw error;
  }
};
