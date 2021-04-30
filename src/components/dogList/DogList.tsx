import { useEffect, useState } from "react";
import { keys } from "lodash";

import DogListView from "./DogListView";
import { getAllBreeds } from "../../services/dogList/DogListService";
import { getImageBreed } from "../../services/dogImage/DogImageService";
import { DogBreed } from "../../types/DogBreedsTypes";

const DogList = () => {
  const [dogBreeds, setDogBreeds] = useState<DogBreed[]>([]);

  const listAllBreeds = async () => {
    const response = await getAllBreeds();

    const breedsNames = keys(response.message);

    const formatBreeds: DogBreed[] = await Promise.all(
      breedsNames.map(
        async (item: string): Promise<DogBreed> => {
          const imageBreed: string = await getImageBreed({ breed: item }).then(
            (data) => data.message
          );

          return {
            name: item,
            image: imageBreed,
          };
        }
      )
    );

    setDogBreeds(formatBreeds);
  };
  useEffect(() => {
    listAllBreeds();
  }, []);

  return <DogListView dogBreeds={dogBreeds} />;
};

export default DogList;
