import { createEvent } from "effector";
import DogBreedSelectedState from "./DogBreedSelectedState";

export const onSelectBreed = createEvent<DogBreedSelectedState>();
