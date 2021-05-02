import { useCallback } from "react";
import { useStoreMap } from "effector-react";

import DogDetailsView from "./DogDetailsView";
import * as DogBreedsEffect from "../../stores/dogBreeds/DogBreedsEffect";
import DogBreedSelectedStore from "../../stores/dogBreedSelected/DogBreedSelectedStore";
import DogBreedsStore from "../../stores/dogBreeds/DogBreedsStore";

const DogDetails = () => {
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

  const onBark = useCallback(() => {
    alert("Woof! Woof!");
  }, []);

  const onScold = useCallback(
    (name: string) => {
      if (name === "") {
        alert("Please, select a breed in DogList!");

        return;
      }

      const breedIndex = dogBreeds?.findIndex((item) => item.name === name);

      const result = {
        name: dogBreeds[breedIndex]?.name,
        image: dogBreeds[breedIndex]?.image,
        counter: dogBreeds[breedIndex]?.counter + 1,
      };

      dogBreeds[breedIndex] = result;

      DogBreedsEffect.setDogBreeds(dogBreeds);
    },
    [dogBreeds]
  );

  return (
    <DogDetailsView
      name={dogBreedSelected?.name}
      image={dogBreedSelected?.image}
      onBark={onBark}
      onScold={onScold}
    />
  );
};

export default DogDetails;
