import { shallow } from "enzyme";

import DogDetails from "../dogDetails/DogDetails";
import DogList from "../dogList/DogList";
import DogWrapperView from "./DogWrapperView";
import { DogWrapperStyle } from "./DogWrapperView.styles";

jest.mock("./DogWrapperView.styles.ts");

describe("DogWrapperView", () => {
  const dogBreedSelectedEmpty = {
    name: "",
    image: "",
  };

  const dogBreedsMock = [
    {
      name: "affenpinscher",
      image: "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
    },
    {
      name: "basenji",
      image: "https://images.dog.ceo/breeds/basenji/n02110806_238.jpg",
    },
  ];

  const handleSelectDogMock = jest.fn();

  beforeEach(() => {
    DogWrapperStyle.mockReturnValue({
      container: "container",
    });
  });

  it("should render DogWrapperView correctly", () => {
    const wrapper = shallow(
      <DogWrapperView
        dogBreeds={dogBreedsMock}
        isLoading={false}
        dogSelected={dogBreedSelectedEmpty}
        handleSelectDog={handleSelectDogMock}
      />
    );

    expect(
      wrapper.matchesElement(
        <div className={"container"}>
          <DogDetails
            name={dogBreedSelectedEmpty.name}
            image={dogBreedSelectedEmpty.name}
          />

          <DogList
            dogBreeds={dogBreedsMock}
            isLoading={false}
            dogSelected={dogBreedSelectedEmpty}
            handleSelectDog={handleSelectDogMock}
          />
        </div>
      )
    ).toBe(true);
  });
});
