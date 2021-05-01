import { useCallback } from "react";

import DogDetailsView from "./DogDetailsView";

interface Props {
  name: string;
  image: string;
  onScold: (name: string) => void;
}

const DogDetails = ({ name, image, onScold }: Props) => {
  const onBark = useCallback(() => {
    alert("Woof! Woof!");
  }, []);

  return (
    <DogDetailsView
      name={name}
      image={image}
      onBark={onBark}
      onScold={onScold}
    />
  );
};

export default DogDetails;
