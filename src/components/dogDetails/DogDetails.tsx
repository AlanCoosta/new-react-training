import { useCallback } from "react";
import DogDetailsView from "./DogDetailsView";

interface Props {
  name: string;
  image: string;
}

const DogDetails = ({ name, image }: Props) => {
  const onBark = useCallback(() => {
    alert("Woof! Woof!");
  }, []);

  return <DogDetailsView name={name} image={image} onBark={onBark} />;
};

export default DogDetails;
