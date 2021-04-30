import axios from "axios";

import { getImageBreed } from "./DogImageService";

jest.mock("axios");

describe("DogListService", () => {
  it("should return a breed list with success", async () => {
    // Need to change to data because axios expect data in result.
    const data = {
      message: "https://images.dog.ceo/breeds/affenpinscher/n02110627_7694.jpg",
      status: "success",
    };

    axios.get.mockImplementation(() => Promise.resolve({ data }));

    const result = await getImageBreed({ breed: "affenpinscher" });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data.message);
    expect(axios.get).toHaveBeenCalledWith(
      "https://dog.ceo/api/breed/affenpinscher/images/random"
    );
  });

  it("should throw error when the server request has error", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    try {
      await getImageBreed({ breed: "affenpinscher" });
    } catch {
      await expect(axios.get).rejects.toThrow(errorMessage);
    }
  });
});
