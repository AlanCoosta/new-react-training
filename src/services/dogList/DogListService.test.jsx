import axios from "axios";

import { getAllBreeds } from "./DogListService";

jest.mock("axios");

describe("DogListService", () => {
  it("should return a breed list with success", async () => {
    // Need to change to data because axios expect data in result.
    const data = {
      message: {
        affenpinscher: [],
        african: [],
      },
    };

    axios.get.mockImplementation(() => Promise.resolve({ data }));

    const result = await getAllBreeds();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      "https://dog.ceo/api/breeds/list/all"
    );
  });

  it("should throw error when the server request has error", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    try {
      await getAllBreeds();
    } catch {
      await expect(axios.get).rejects.toThrow(errorMessage);
    }
  });
});
