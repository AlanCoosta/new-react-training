import { useCallback, useEffect, useState } from "react";
import { keys } from "lodash";

import DogWrapperView from "./DogWrapperView";
import { getAllBreeds } from "../../services/dogList/DogListService";
import { getImageBreed } from "../../services/dogImage/DogImageService";
import { DogBreed } from "../../types/DogBreedsTypes";

const DogWrapper = () => {
  const [dogBreeds, setDogBreeds] = useState<DogBreed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dogSelected, setDogSelected] = useState<DogBreed>({} as DogBreed);

  const listAllBreeds = async () => {
    try {
      const response = await getAllBreeds();

      const breedsNames = keys(response.message);

      const formatBreeds: DogBreed[] = await Promise.all(
        breedsNames.map(
          async (item: string): Promise<DogBreed> => {
            const imageBreed = await getImageBreed({ breed: item });

            return {
              name: item,
              image: imageBreed,
            };
          }
        )
      );

      setDogBreeds(formatBreeds);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    listAllBreeds();
  }, []);

  const handleSelectDog = useCallback((dog: DogBreed) => {
    setDogSelected(dog);
  }, []);

  return (
    <DogWrapperView
      dogBreeds={dogBreeds}
      isLoading={isLoading}
      dogSelected={dogSelected}
      handleSelectDog={handleSelectDog}
    />
  );
};

export default DogWrapper;
