import React from "react";
import { shallow } from "enzyme";
import { keys } from "lodash";

import DogList from "./DogList";
import DogListView from "./DogListView";
import { getAllBreeds } from "../../services/dogList/DogListService";
import { getImageBreed } from "../../services/dogImage/DogImageService";

jest.mock("../../services/dogList/DogListService.ts");
jest.mock("../../services/dogImage/DogImageService.ts");

describe("DogList", () => {
  it("should DogList have type of DogListView", () => {
    const wrapper = shallow(<DogList />);

    expect(wrapper.type()).toBe(DogListView);
    expect(wrapper.matchesElement(<DogListView />));
  });

  it("should useEffect have been called", () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    shallow(<DogList />);

    expect(React.useEffect).toHaveBeenCalled();
    expect(getAllBreeds).toHaveBeenCalled();
  });

  it("should get images of each breed in dogBreedsList", async () => {
    const dogBreedsList = {
      message: {
        african: [],
        basenji: [],
      },
    };

    const mockBreedNames = keys(dogBreedsList.message);

    getAllBreeds.mockImplementationOnce(() => Promise.resolve(dogBreedsList));

    getImageBreed.mockImplementation(() =>
      Promise.resolve({ message: "url of image of breed" })
    );

    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    shallow(<DogList />);

    await getAllBreeds();

    expect(getImageBreed).toHaveBeenCalledTimes(mockBreedNames.length);
  });
});
