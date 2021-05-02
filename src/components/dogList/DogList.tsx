import { useCallback, useMemo } from "react";
import { useStoreMap } from "effector-react";

import DogListView from "./DogListView";
import { DogBreed } from "../../types/DogBreedsTypes";

import DogBreedSelectedStore from "../../stores/dogBreedSelected/DogBreedSelectedStore";
import DogBreedsStore from "../../stores/dogBreeds/DogBreedsStore";
import LetterDogBreedSelectedStore from "../../stores/letterDogBreedSelected/LetterDogBreedSelectedStore";
import LoaderStore from "../../stores/loader/LoaderStore";

import * as DogBreedSelectedEffect from "../../stores/dogBreedSelected/DogBreedSelectedEffect";

const DogList = () => {
  const { dogBreeds } = useStoreMap({
    store: DogBreedsStore,
    keys: [],
    fn: (state) => state,
  });

  const { dogBreedSelected } = useStoreMap({
    store: DogBreedSelectedStore,
    keys: [],
    fn: (state) => state,
  });

  const { letterDogBreedSelected } = useStoreMap({
    store: LetterDogBreedSelectedStore,
    keys: [],
    fn: (state) => state,
  });

  const { isLoading } = useStoreMap({
    store: LoaderStore,
    keys: [],
    fn: (state) => state,
  });

  const handleSelectDogBreed = useCallback((dogBreedSelected: DogBreed) => {
    DogBreedSelectedEffect.onSelectBreed({ dogBreedSelected });
  }, []);

  const dogBreedsFiltered = useMemo(() => {
    if (letterDogBreedSelected === "") {
      return dogBreeds;
    }

    return dogBreeds.filter(
      (item) =>
        item.name.charAt(0).toLowerCase() ===
        letterDogBreedSelected.toLowerCase()
    );
  }, [dogBreeds, letterDogBreedSelected]);

  return (
    <DogListView
      dogBreeds={dogBreedsFiltered}
      isLoading={isLoading}
      dogBreedSelected={dogBreedSelected}
      handleSelectDog={handleSelectDogBreed}
    />
  );
};

export default DogList;
