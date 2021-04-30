import { getAllBreeds } from "./DogListService";

describe("DogListService", () => {
  it("should return a breed list with success", async () => {
    const mockSuccessResponse = {
      message: {
        affenpinscher: [],
        african: [],
      },
    };

    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const result = await getAllBreeds();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSuccessResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://dog.ceo/api/breeds/list/all"
    );
  });

  it("should throw error when the server request has error", async () => {
    const errorMessage = "Network Error";

    global.fetch = jest.fn((f) => Promise.reject(new Error(errorMessage)));

    try {
      await getAllBreeds();
    } catch {
      await expect(global.fetch).rejects.toThrow(errorMessage);
    }
  });
});
