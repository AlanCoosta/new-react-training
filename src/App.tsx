import { useCallback } from "react";

import CreateBeerForm from "./components/createBeerForm/CreateBeerForm";
import CreateBeerFormikForm from "./components/createBeerFormikForm/CreateBeerFormikForm";
import DogDetails from "./components/dogDetails/DogDetails";

const App = () => {
  const dogInfo = {
    name: "Golden Retriever",
    image:
      "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
  };

  const onAlert = useCallback(() => {
    alert("Welcome to the React Training");
  }, []);

  return (
    <div>
      <button onClick={onAlert}>Alert</button>

      <DogDetails name={dogInfo.name} image={dogInfo.image} />
      <CreateBeerForm />
      <CreateBeerFormikForm />
    </div>
  );
};

export default App;
