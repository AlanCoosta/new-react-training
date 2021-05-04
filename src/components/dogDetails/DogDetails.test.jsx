import { shallow } from "enzyme";
import { useStoreMap } from "effector-react";

import DogDetails from "./DogDetails";
import DogDetailsView from "./DogDetailsView";

import * as DogBreedsEvents from "../../stores/dogBreeds/DogBreedsEvents";

import DogBreedsStore from "../../stores/dogBreeds/DogBreedsStore";
import DogBreedSelectedStore from "../../stores/dogBreedSelected/DogBreedSelectedStore";

jest.mock("effector-react");
jest.mock("../../stores/dogBreeds/DogBreedsEvents.ts");

const dogBreedMock = {
  name: "affenpinscher",
  image:
    "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
};

describe("DogDetails", () => {
  it("should be render DogDetails with the right props", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected());

    const wrapper = shallow(
      <DogDetails name={dogBreedMock.name} image={dogBreedMock.image} />
    );
    expect(wrapper.type()).toBe(DogDetailsView);
  });

  it("should render alert when onBark function is called", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected());

    window.alert = jest.fn();
    const wrapper = shallow(<DogDetails />);
    wrapper.invoke("onBark")("");
    expect(window.alert).toHaveBeenCalledWith("Woof! Woof!");
  });

  it("should call function onScold and counter of breed was to be sum", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected());

    jest
      .spyOn(DogBreedsEvents, "setDogBreeds")
      .mockImplementation(() => "some value");

    const wrapper = shallow(<DogDetails />);

    wrapper.invoke("onScold")("affenpinscher");

    expect(DogBreedsEvents.setDogBreeds).toBeCalledWith([
      {
        name: "affenpinscher",
        image: "test",
        counter: 1,
      },
      {
        name: "beagle",
        image: "test",
        counter: 0,
      },
    ]);
  });

  it("should render alert if function onScold is passed without breed name", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected());

    window.alert = jest.fn();

    const wrapper = shallow(<DogDetails />);

    wrapper.invoke("onScold")("");

    expect(window.alert).toHaveBeenCalledWith(
      "Please, select a breed in DogList!"
    );
  });

  it("should call storeMap and return the right props from store", () => {
    useStoreMap
      .mockReturnValueOnce(stateBreeds())
      .mockReturnValueOnce(stateBreedSelected());

    shallow(<DogDetails />);

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
