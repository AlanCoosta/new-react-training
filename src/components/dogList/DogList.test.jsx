import { shallow } from "enzyme";

import DogList from "./DogList";
import DogListView from "./DogListView";

jest.mock("../../services/dogList/DogListService.ts");
jest.mock("../../services/dogImage/DogImageService.ts");

const handleSelectDogMock = jest.fn();
const isLoadingMock = false;

const dogBreedsMock = [
  {
    name: "affenpinscher",
    image: "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
    counter: 0,
  },
  {
    name: "basenji",
    image: "https://images.dog.ceo/breeds/basenji/n02110806_1369.jpg",
    counter: 0,
  },
];

describe("DogList", () => {
  it("should DogList have type of DogListView", () => {
    const wrapper = shallow(
      <DogList
        dogBreeds={dogBreedsMock}
        isLoading={isLoadingMock}
        dogSelected={dogBreedsMock[0]}
        handleSelectDog={handleSelectDogMock}
        letterSelected=""
      />
    );

    expect(wrapper.type()).toBe(DogListView);
    expect(wrapper.matchesElement(<DogListView />));
  });

  it("should list breeds have only breeds with the initial letter wished", async () => {
    const isLoadingMock = false;

    const wrapper = shallow(
      <DogList
        dogBreeds={dogBreedsMock}
        isLoading={isLoadingMock}
        dogSelected={dogBreedsMock[0]}
        handleSelectDog={handleSelectDogMock}
        letterSelected="a"
      />
    );

    const resultExpect = [
      {
        name: "affenpinscher",
        image:
          "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
        counter: 0,
      },
    ];

    expect(wrapper.prop("dogBreeds")).toStrictEqual(resultExpect);
  });
});
