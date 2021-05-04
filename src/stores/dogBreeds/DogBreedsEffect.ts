import { createEffect } from "effector";
import { keys } from "lodash";

import * as LoaderEffect from "../loader/LoaderEffect";
import { getImageBreed } from "../../services/dogImage/DogImageService";
import { getAllBreeds } from "../../services/dogList/DogListService";

import { DogBreed } from "../../types/DogBreedsTypes";

export const dogBreeds = createEffect(async () => {
  LoaderEffect.setLoading({ isLoading: true });

  const dogBreedsResponse = await getAllBreeds();
  const keyDogBreedsNames = keys(dogBreedsResponse.message);

  const formatDogBreeds: DogBreed[] = await Promise.all(
    keyDogBreedsNames.map(
      async (item: string): Promise<DogBreed> => {
        const imageUrl = await getImageBreed({ breed: item });

        return {
          name: item,
          image: imageUrl,
          counter: 0,
        };
      }
    )
  );

  LoaderEffect.setLoading({ isLoading: false });

  return formatDogBreeds;
});
