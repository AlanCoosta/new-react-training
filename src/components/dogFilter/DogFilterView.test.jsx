import { shallow } from "enzyme";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

import DogFilterView from "./DogFilterView";
import { DogFilterStyle } from "./DogFilterView.styles";

import { alphabet } from "../../utils/alphabet";

jest.mock("./DogFilterView.styles.ts");

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

describe("DogFilterView", () => {
  beforeEach(() => {
    DogFilterStyle.mockReturnValue({
      container: "container",
      containerLetters: "containerLetters",
    });
  });

  it("should render all letters of alphabet", () => {
    const wrapper = shallow(
      <DogFilterView
        dogBreeds={dogBreedsMock}
        handleSelectLetter={handleSelectLetterMock}
        letterSelected=""
      />
    );

    expect(wrapper.find(FormControlLabel)).toHaveLength(alphabet.length);
  });

  it("should call function handleSelectLetter", () => {
    const wrapper = shallow(
      <DogFilterView
        dogBreeds={dogBreedsMock}
        handleSelectLetter={handleSelectLetterMock}
        letterSelected=""
      />
    );

    const radioGroup = wrapper.find(RadioGroup).first();
    radioGroup.simulate("change", {
      target: { name: "breed", value: "affenpinscher" },
    });

    expect(handleSelectLetterMock).toHaveBeenCalled();
  });
});
