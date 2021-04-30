import { useEffect, useState } from "react";
import { keys } from "lodash";

import DogListView from "./DogListView";
import { getAllBreeds } from "../../services/dogList/DogListService";
import { getImageBreed } from "../../services/dogImage/DogImageService";
import { DogBreed } from "../../types/DogBreedsTypes";

const DogList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dogBreeds, setDogBreeds] = useState<DogBreed[]>([]);

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

  return <DogListView dogBreeds={dogBreeds} isLoading={isLoading} />;
};

export default DogList;
