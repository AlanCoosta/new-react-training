import DogListView from "./DogListView";
import { DogBreed } from "../../types/DogBreedsTypes";
import { useMemo } from "react";

interface Props {
  dogBreeds: DogBreed[];
  isLoading: boolean;
  dogSelected: DogBreed;
  handleSelectDog: (dog: DogBreed) => void;
  letterSelected: string;
}

const DogList = ({
  dogBreeds,
  isLoading,
  dogSelected,
  handleSelectDog,
  letterSelected,
}: Props) => {
  const listLetterSelected = useMemo(() => {
    if (letterSelected === "") {
      return dogBreeds;
    }

    return dogBreeds.filter(
      (item) =>
        item.name.charAt(0).toLowerCase() === letterSelected.toLowerCase()
    );
  }, [dogBreeds, letterSelected]);

  return (
    <DogListView
      dogBreeds={listLetterSelected}
      isLoading={isLoading}
      dogSelected={dogSelected}
      handleSelectDog={handleSelectDog}
    />
  );
};

export default DogList;
