import { shallow } from "enzyme";
import { useStoreMap } from "effector-react";

import DogList from "./DogList";
import DogListView from "./DogListView";

import * as DogBreedSelectedEffect from "../../stores/dogBreedSelected/DogBreedSelectedEffect.ts";

import DogBreedSelectedStore from "../../stores/dogBreedSelected/DogBreedSelectedStore";
import DogBreedsStore from "../../stores/dogBreeds/DogBreedsStore";
import LetterDogBreedSelectedStore from "../../stores/letterDogBreedSelected/LetterDogBreedSelectedStore";
import LoaderStore from "../../stores/loader/LoaderStore";

jest.mock("effector-react");
jest.mock("../../services/dogList/DogListService.ts");
jest.mock("../../services/dogImage/DogImageService.ts");
jest.mock("../../stores/dogBreedSelected/DogBreedSelectedEffect.ts");

describe("DogList", () => {
  it("should render DogList and have type of DogListView and matches elements", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected())
      .mockReturnValueOnce(stateLetterBreed())
      .mockReturnValueOnce(stateLoader());
    const wrapper = shallow(<DogList />);

    expect(wrapper.type()).toBe(DogListView);
    expect(wrapper.matchesElement(<DogListView />)).toBe(true);
  });

  it("should return list filtered when user select one letter", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected())
      .mockReturnValueOnce(stateLetterBreed())
      .mockReturnValueOnce(stateLoader());

    const wrapper = shallow(<DogList />);

    wrapper.invoke("handleSelectDog")(stateBreeds().dogBreeds[0]);

    expect(wrapper.prop("dogBreeds")).toHaveLength(1);
    expect(DogBreedSelectedEffect.onSelectBreed).toHaveBeenCalledTimes(1);
    expect(DogBreedSelectedEffect.onSelectBreed).toHaveBeenCalledWith({
      dogBreedSelected: {
        name: "affenpinscher",
        image: "test",
        counter: 0,
      },
    });
  });

  it("should return all breeds when letterDogBreedSelected is empty", () => {
    function stateLetterBreedEmpty() {
      return {
        letterDogBreedSelected: "",
      };
    }

    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected())
      .mockReturnValueOnce(stateLetterBreedEmpty())
      .mockReturnValueOnce(stateLoader());

    const wrapper = shallow(<DogList />);

    expect(wrapper.prop("dogBreeds")).toEqual(stateBreeds().dogBreeds);
  });

  it("should call storeMap and return the right props from store", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected())
      .mockReturnValueOnce(stateLetterBreed())
      .mockReturnValueOnce(stateLoader());

    shallow(<DogList />);

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

    expect(useStoreMap.mock.calls[1][0].store).toBe(DogBreedSelectedStore);
    expect(useStoreMap.mock.calls[1][0].keys).toEqual([]);
    expect(useStoreMap.mock.calls[1][0].fn(stateBreedSelected())).toMatchObject(
      {
        name: "affenpinscher",
        image: "test",
        counter: 0,
      }
    );

    expect(useStoreMap.mock.calls[2][0].store).toBe(
      LetterDogBreedSelectedStore
    );
    expect(useStoreMap.mock.calls[2][0].keys).toEqual([]);
    expect(useStoreMap.mock.calls[2][0].fn(stateLetterBreed())).toMatchObject({
      letterDogBreedSelected: "a",
    });

    expect(useStoreMap.mock.calls[3][0].store).toBe(LoaderStore);
    expect(useStoreMap.mock.calls[3][0].keys).toEqual([]);
    expect(useStoreMap.mock.calls[3][0].fn(stateLoader())).toMatchObject({
      isLoading: false,
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

function stateBreedSelected() {
  return {
    name: "affenpinscher",
    image: "test",
    counter: 0,
  };
}

function stateLetterBreed() {
  return {
    letterDogBreedSelected: "a",
  };
}

function stateLoader() {
  return {
    isLoading: false,
  };
}
