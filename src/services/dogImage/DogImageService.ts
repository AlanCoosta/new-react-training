export const API = "https://dog.ceo/api/breed";

interface Props {
  breed: string;
}

interface ResponseImage {
  message: string;
  status: string;
}

export const getImageBreed = async ({
  breed,
}: Props): Promise<ResponseImage> => {
  try {
    const url = `${API}/${breed}/images/random`;
    const response = await fetch(url);

    return response.json();
  } catch (error) {
    throw error;
  }
};
