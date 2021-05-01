import DogDetails from "../dogDetails/DogDetails";
import DogList from "../dogList/DogList";
import { DogWrapperStyle } from "./DogWrapperView.styles";
import { DogBreed } from "../../types/DogBreedsTypes";
import DogFilter from "../dogFilter/DogFilter";

interface Props {
  dogBreeds: DogBreed[];
  isLoading: boolean;
  dogSelected: DogBreed;
  handleSelectDog: (dog: DogBreed) => void;
  onScold: (name: string) => void;
  letterSelected: string;
  handleSelectLetter: (letter: string) => void;
}

const DogWrapperView = ({
  dogBreeds,
  isLoading,
  dogSelected,
  handleSelectDog,
  onScold,
  letterSelected,
  handleSelectLetter,
}: Props) => {
  const classes = DogWrapperStyle();

  return (
    <div className={classes.container}>
      <DogDetails
        name={dogSelected.name}
        image={dogSelected.image}
        onScold={onScold}
      />

      <DogList
        dogBreeds={dogBreeds}
        isLoading={isLoading}
        dogSelected={dogSelected}
        handleSelectDog={handleSelectDog}
        letterSelected={letterSelected}
      />

      <DogFilter
        dogBreeds={dogBreeds}
        letterSelected={letterSelected}
        handleSelectLetter={handleSelectLetter}
      />
    </div>
  );
};

export default DogWrapperView;
