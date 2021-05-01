import React from "react";
import { shallow } from "enzyme";
import { keys } from "lodash";

import DogWrapper from "./DogWrapper";
import DogWrapperView from "./DogWrapperView";
import { getAllBreeds } from "../../services/dogList/DogListService";
import { getImageBreed } from "../../services/dogImage/DogImageService";

jest.mock("../../services/dogList/DogListService.ts");
jest.mock("../../services/dogImage/DogImageService.ts");
jest.mock("./DogWrapperView.styles.ts");

describe("DogWrapper", () => {
  it("should DogWrapper have type of DogWrapperView", () => {
    const wrapper = shallow(<DogWrapper />);

    expect(wrapper.type()).toBe(DogWrapperView);
  });

  it("should useEffect have been called", () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    shallow(<DogWrapper />);

    expect(React.useEffect).toHaveBeenCalled();
    expect(getAllBreeds).toHaveBeenCalled();
  });

  it("should get images of each breed in breedList", async () => {
    const breedList = {
      message: {
        african: [],
        australian: [],
      },
    };

    const mockBreedNames = keys(breedList.message);

    getAllBreeds.mockImplementationOnce(() => Promise.resolve(breedList));

    getImageBreed.mockImplementation(() =>
      Promise.resolve({ message: "url of image of breed" })
    );

    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    shallow(<DogWrapper />);

    await getAllBreeds();

    expect(getImageBreed).toHaveBeenCalledTimes(mockBreedNames.length);
  });

  it("should be call function handleSelectDog", () => {
    const dogInfoNew = {
      name: "Vira lata",
      image: "image url",
    };

    const wrapper = shallow(<DogWrapper />);

    wrapper.invoke("handleSelectDog")(dogInfoNew);

    expect(wrapper.prop("dogSelected")).toStrictEqual({
      name: "Vira lata",
      image: "image url",
    });
  });
});
