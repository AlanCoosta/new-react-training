import { useCallback, useState } from "react";

import DogDetailsView from "./DogDetailsView";

interface Props {
  name: string;
  image: string;
}

const DogDetails = ({ name, image }: Props) => {
  const [scoldCounter, setScoldCounter] = useState(0);

  const onBark = useCallback(() => {
    alert("Woof! Woof!");
  }, []);

  const onScold = useCallback(() => {
    setScoldCounter((prevState) => prevState + 1);
  }, []);

  return (
    <DogDetailsView
      name={name}
      image={image}
      onBark={onBark}
      onScold={onScold}
      scoldCounter={scoldCounter}
    />
  );
};

export default DogDetails;
