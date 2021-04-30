import { useCallback } from "react";

import CreateBeerFormikFormView from "./CreateBeerFormikFormView";
import { BeerFormData } from "./CreateBeerFormikForm.types";

const CreateBeerFormikForm = () => {
  const onSubmit = useCallback((values: BeerFormData) => {
    console.log(values);
  }, []);

  return <CreateBeerFormikFormView onSubmit={onSubmit} />;
};

export default CreateBeerFormikForm;
