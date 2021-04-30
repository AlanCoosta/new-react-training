import { getImageBreed } from "./DogImageService";

describe("DogListService", () => {
  it("should return a breed list with success", async () => {
    const mockSuccessResponse = {
      message: "https://images.dog.ceo/breeds/affenpinscher/n02110627_7694.jpg",
      status: "success",
    };

    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const result = await getImageBreed({ breed: "affenpinscher" });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSuccessResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://dog.ceo/api/breed/affenpinscher/images/random"
    );
  });

  it("should throw error when the server request has error", async () => {
    const errorMessage = "Network Error";

    global.fetch = jest.fn((f) => Promise.reject(new Error(errorMessage)));

    try {
      await getImageBreed({ breed: "affenpinscher" });
    } catch {
      await expect(global.fetch).rejects.toThrow(errorMessage);
    }
  });
});
