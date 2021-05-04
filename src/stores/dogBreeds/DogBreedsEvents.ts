import { createEvent } from "effector";

import { DogBreed } from "../../types/DogBreedsTypes";

export const setDogBreeds = createEvent<DogBreed[]>();
