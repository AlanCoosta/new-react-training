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
              counter: 0,
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

  const onScold = useCallback(
    (name: string) => {
      if (name === "") {
        alert("Please, select a breed in DogList!");

        return;
      }

      const breedIndex = dogBreeds.findIndex((item) => item.name === name);

      const result = {
        name: dogBreeds[breedIndex].name,
        image: dogBreeds[breedIndex].image,
        counter: dogBreeds[breedIndex].counter + 1,
      };

      dogBreeds[breedIndex] = result;

      setDogBreeds([...dogBreeds]);
    },
    [dogBreeds]
  );

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
      onScold={onScold}
    />
  );
};

export default DogWrapper;
