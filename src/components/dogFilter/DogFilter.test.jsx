import { shallow } from "enzyme";
import { useStoreMap } from "effector-react";

import DogFilter from "./DogFilter";
import DogFilterView from "./DogFilterView";

import DogBreedsStore from "../../stores/dogBreeds/DogBreedsStore";

import * as LetterDogBreedSelectedEffect from "../../stores/letterDogBreedSelected/LetterDogBreedSelectedEvents";
import LetterDogBreedSelectedStore from "../../stores/letterDogBreedSelected/LetterDogBreedSelectedStore";

jest.mock("effector-react");
jest.mock(
  "../../stores/letterDogBreedSelected/LetterDogBreedSelectedEffect.ts"
);
jest.mock("../../stores/letterDogBreedSelected/LetterDogBreedSelectedStore.ts");

describe("DogFilterView", () => {
  it("should render DogFilter with right props and have type of DogFilterView", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateLetterBreed());

    const wrapper = shallow(<DogFilter />);

    expect(wrapper.type()).toBe(DogFilterView);
    expect(wrapper.matchesElement(<DogFilterView />)).toBe(true);
  });

  it("should call onLetterBreedSelected effect when change an option", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateLetterBreed());

    const wrapper = shallow(<DogFilter />);

    wrapper.invoke("handleSelectLetter")("a");

    expect(
      LetterDogBreedSelectedEffect.onLetterDogBreedSelected
    ).toHaveBeenCalledTimes(1);
  });

  it("should call storeMap and return the right props from store", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateLetterBreed());

    shallow(<DogFilter />);

    expect(useStoreMap.mock.calls[0][0].store).toBe(DogBreedsStore);
    expect(useStoreMap.mock.calls[0][0].keys).toEqual([]);
    expect(useStoreMap.mock.calls[0][0].fn(stateBreeds())).toMatchObject({
      dogBreeds: [
        {
          name: "affenpinscher",
          image: "test",
          counter: 0,
        },
        {
          name: "beagle",
          image: "test",
          counter: 0,
        },
      ],
    });

    expect(useStoreMap.mock.calls[1][0].store).toBe(
      LetterDogBreedSelectedStore
    );
    expect(useStoreMap.mock.calls[1][0].keys).toEqual([]);
    expect(useStoreMap.mock.calls[1][0].fn(stateLetterBreed())).toMatchObject({
      letterDogBreedSelected: "a",
    });
  });
});

function stateBreeds() {
  return {
    dogBreeds: [
      {
        name: "affenpinscher",
        image: "test",
        counter: 0,
      },
      {
        name: "beagle",
        image: "test",
        counter: 0,
      },
    ],
  };
}

function stateLetterBreed() {
  return {
    letterDogBreedSelected: "a",
  };
}
