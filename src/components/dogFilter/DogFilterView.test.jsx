import { shallow } from "enzyme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

import DogBreedsStore from "../../stores/dogBreeds/DogBreedsStore";
import LetterDogBreedSelectedStore from "../../stores/letterDogBreedSelected/LetterDogBreedSelectedStore";

import DogFilterView from "./DogFilterView";
import { DogFilterStyle } from "./DogFilterView.styles";

import { alphabet } from "../../utils/alphabet";

jest.mock("./DogFilterView.styles.ts");
jest.mock("../../stores/dogBreeds/DogBreedsStore.ts", () => {
  const { createStore } = jest.requireActual("effector");
  return createStore({
    dogBreeds: [
      {
        name: "affenpinscher",
        image:
          "https://images.dog.ceo/breeds/affenpinscher/n02110627_13782.jpg",
        counter: 0,
      },
      {
        name: "african",
        image: "https://images.dog.ceo/breeds/african/n02116738_9164.jpg",
        counter: 0,
      },
    ],
  });
});

const dogBreedsMock = DogBreedsStore.getState().dogBreeds;
const letterDogBreedSelectedMock = LetterDogBreedSelectedStore.getState()
  .letterDogBreedSelected;
const handleSelectLetterMock = jest.fn();

describe("DogFilterView", () => {
  beforeEach(() => {
    DogFilterStyle.mockReturnValue({
      container: "container",
      containerLetters: "containerLetters",
    });
  });

  it("should render all letters of alphabet", () => {
    const RADIO_BUTTON_ALL_BREEDS_LENGTH = 1;

    const wrapper = shallow(
      <DogFilterView
        dogBreeds={dogBreedsMock}
        handleSelectLetter={handleSelectLetterMock}
        letterDogBreedSelected={letterDogBreedSelectedMock}
      />
    );

    expect(wrapper.find(FormControlLabel)).toHaveLength(
      alphabet.length + RADIO_BUTTON_ALL_BREEDS_LENGTH
    );
  });

  it("should call function handleSelectLetter", () => {
    const wrapper = shallow(
      <DogFilterView
        dogBreeds={dogBreedsMock}
        handleSelectLetter={handleSelectLetterMock}
        letterDogBreedSelected={letterDogBreedSelectedMock}
      />
    );

    const radioGroup = wrapper.find(RadioGroup).first();
    radioGroup.simulate("change", {
      target: { name: "breed", value: "affenpinscher" },
    });

    expect(handleSelectLetterMock).toHaveBeenCalled();
  });
});
