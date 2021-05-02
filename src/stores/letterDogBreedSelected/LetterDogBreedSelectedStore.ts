import { createStore } from "effector";
import { cloneDeep } from "lodash";

import { onLetterDogBreedSelected } from "./LetterDogBreedSelectedEffect";
import LetterDogBreedSelectedState from "./LetterDogBreedSelectedState";

const initialState: LetterDogBreedSelectedState = {
  letterDogBreedSelected: "",
};

const LetterBreedSelectedStore = createStore<LetterDogBreedSelectedState>(
  initialState
).on(onLetterDogBreedSelected, (state, letterBreedSelected) => {
  return cloneDeep({
    ...state,
    ...letterBreedSelected,
  });
});

export default LetterBreedSelectedStore;
