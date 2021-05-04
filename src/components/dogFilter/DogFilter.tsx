import { useStoreMap } from "effector-react";
import { useCallback } from "react";

import DogFilterView from "./DogFilterView";
import DogBreedsStore from "../../stores/dogBreeds/DogBreedsStore";
import LetterDogBreedSelectedStore from "../../stores/letterDogBreedSelected/LetterDogBreedSelectedStore";
import { onLetterDogBreedSelected } from "../../stores/letterDogBreedSelected/LetterDogBreedSelectedEvents";

const DogFilter = () => {
  const { dogBreeds } = useStoreMap({
    store: DogBreedsStore,
    keys: [],
    fn: (state) => state,
  });

  const { letterDogBreedSelected } = useStoreMap({
    store: LetterDogBreedSelectedStore,
    keys: [],
    fn: (state) => state,
  });

  const handleSelectLetter = useCallback((letterDogBreedSelected: string) => {
    onLetterDogBreedSelected({
      letterDogBreedSelected,
    });
  }, []);

  return (
    <DogFilterView
      dogBreeds={dogBreeds}
      letterDogBreedSelected={letterDogBreedSelected}
      handleSelectLetter={handleSelectLetter}
    />
  );
};

export default DogFilter;
