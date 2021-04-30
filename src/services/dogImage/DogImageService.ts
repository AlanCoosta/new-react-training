import axios from "axios";

export const API = "https://dog.ceo/api/breed";

interface Props {
  breed: string;
}

export const getImageBreed = async ({ breed }: Props): Promise<string> => {
  try {
    const url = `${API}/${breed}/images/random`;
    const response = await axios.get(url);

    return response.data.message;
  } catch (error) {
    throw error;
  }
};
