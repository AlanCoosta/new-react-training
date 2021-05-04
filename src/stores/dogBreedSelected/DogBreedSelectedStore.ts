import { createStore } from "effector";
import { cloneDeep } from "lodash";

import { onSelectBreed } from "./DogBreedSelectedEvents";
import DogBreedSelectedState from "./DogBreedSelectedState";

const initialState: DogBreedSelectedState = {
  dogBreedSelected: {
    name: "",
    image: "",
    counter: 0,
  },
};

const DogBreedSelectedStore = createStore<DogBreedSelectedState>(
  initialState
).on(onSelectBreed, (state, dogBreedSelected) => {
  return cloneDeep({
    ...state,
    ...dogBreedSelected,
  });
});

export default DogBreedSelectedStore;
