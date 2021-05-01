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
  const dogBreedsMock = [
    { name: "affenpinscher", image: "", counter: 0 },
    { name: "akita", image: "", counter: 0 },
  ];

  const dogBreedSelectedMock = { name: "affenpinscher", image: "", counter: 0 };

  const dogBreedToSelectMock = {
    name: "affenpinscher",
    image: "",
    counter: 0,
  };

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

  it("should get images of each breed in dogBreedsList", async () => {
    const dogBreedsList = {
      message: {
        african: [],
        australian: [],
      },
    };

    const mockBreedNames = keys(dogBreedsList.message);

    getAllBreeds.mockImplementationOnce(() => Promise.resolve(dogBreedsList));

    getImageBreed.mockImplementation(() =>
      Promise.resolve({ message: "url of image of breed" })
    );

    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    shallow(<DogWrapper />);

    await getAllBreeds();

    expect(getImageBreed).toHaveBeenCalledTimes(mockBreedNames.length);
  });

  it("should be call function handleSelectDog", () => {
    const wrapper = shallow(<DogWrapper />);

    wrapper.invoke("handleSelectDog")(dogBreedToSelectMock);

    expect(wrapper.prop("dogSelected")).toStrictEqual({
      name: "affenpinscher",
      image: "",
      counter: 0,
    });
  });

  it("should show an alert if any breed was selected", async () => {
    window.alert = jest.fn();

    const wrapper = shallow(<DogWrapper />);

    wrapper.invoke("onScold")("");

    expect(window.alert).toHaveBeenCalledWith(
      "Please, select a breed in DogList!"
    );
  });

  it("should call function onScold and handleSelectLetter", async () => {
    const realUseState = React.useState;

    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => realUseState(dogBreedsMock));

    const wrapper = shallow(<DogWrapper />);

    await wrapper.invoke("onScold")(dogBreedSelectedMock.name);

    expect(React.useState).toHaveBeenCalled();
  });
});
