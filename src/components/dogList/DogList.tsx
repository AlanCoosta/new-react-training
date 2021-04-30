import { useEffect, useState } from "react";
import { keys } from "lodash";

import DogListView from "./DogListView";
import { getAllBreeds } from "../../services/dogList/DogListService";

const DogList = () => {
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);

  const listAllBreeds = async () => {
    const response = await getAllBreeds();

    setDogBreeds(keys(response.message));
  };

  useEffect(() => {
    listAllBreeds();
  }, []);

  return <DogListView dogBreeds={dogBreeds} />;
};

export default DogList;
