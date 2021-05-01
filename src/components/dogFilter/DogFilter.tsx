import DogFilterView from "./DogFilterView";
import { DogBreed } from "../../types/DogBreedsTypes";

interface Props {
  dogBreeds: DogBreed[];
  letterSelected: string;
  handleSelectLetter: (letter: string) => void;
}

const DogFilter = ({
  dogBreeds,
  letterSelected,
  handleSelectLetter,
}: Props) => {
  return (
    <DogFilterView
      dogBreeds={dogBreeds}
      letterSelected={letterSelected}
      handleSelectLetter={handleSelectLetter}
    />
  );
};

export default DogFilter;
