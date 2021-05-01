import { shallow } from "enzyme";

import DogFilter from "./DogFilter";
import DogFilterView from "./DogFilterView";

const dogBreedsMock = [
  {
    name: "affenpinscher",
    image: "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
    counter: 0,
  },
  {
    name: "african",
    image: "https://images.dog.ceo/breeds/african/n02116738_9164.jpg",
    counter: 0,
  },
];
const handleSelectLetterMock = jest.fn();

describe("DogFilter", () => {
  it("should DogFilter have type of DogFilterView", () => {
    const wrapper = shallow(
      <DogFilter
        dogBreeds={dogBreedsMock}
        handleSelectLetter={handleSelectLetterMock}
        letterSelected=""
      />
    );

    expect(wrapper.type()).toBe(DogFilterView);
  });
});
