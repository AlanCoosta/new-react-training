import DogListView from "./DogListView";
import { DogBreed } from "../../types/DogBreedsTypes";

interface Props {
  dogBreeds: DogBreed[];
  isLoading: boolean;
  dogSelected: DogBreed;
  handleSelectDog: (dog: DogBreed) => void;
}

const DogList = ({
  dogBreeds,
  isLoading,
  dogSelected,
  handleSelectDog,
}: Props) => {
  return (
    <DogListView
      dogBreeds={dogBreeds}
      isLoading={isLoading}
      dogSelected={dogSelected}
      handleSelectDog={handleSelectDog}
    />
  );
};

export default DogList;
