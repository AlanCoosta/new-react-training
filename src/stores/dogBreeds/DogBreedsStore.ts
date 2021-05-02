import { createStore } from "effector";
import { cloneDeep } from "lodash";

import { dogBreeds, setDogBreeds } from "./DogBreedsEffect";
import DogBreedsState from "./DogBreedsState";

const initialState: DogBreedsState = {
  dogBreeds: [],
};

const DogListStore = createStore<DogBreedsState>(initialState)
  .on(dogBreeds, (state) => cloneDeep({ ...state }))
  .on(dogBreeds.doneData, (state, payload) => {
    return cloneDeep({
      ...state,
      dogBreeds: payload,
    });
  })
  .on(setDogBreeds, (state, updateScold) => {
    return cloneDeep({
      ...state,
      dogBreeds: updateScold,
    });
  });

export default DogListStore;
