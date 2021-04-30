import React from "react";
import { shallow } from "enzyme";

import DogList from "./DogList";
import DogListView from "./DogListView";
import { getAllBreeds } from "../../services/dogList/DogListService";

jest.mock("../../services/dogList/DogListService.ts");

describe("DogList", () => {
  const dogBreedsMock = ["affenpinscher", "basenji"];

  it("should DogList have type of DogListView", () => {
    const wrapper = shallow(<DogList />);

    expect(wrapper.type()).toBe(DogListView);
    expect(wrapper.matchesElement(<DogListView dogBreeds={dogBreedsMock} />));
  });

  it("should useEffect have been called", () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    shallow(<DogList />);

    expect(React.useEffect).toHaveBeenCalled();
    expect(getAllBreeds).toHaveBeenCalled();
  });
});
