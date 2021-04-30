import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import CreateBeerFormView from "./CreateBeerFormView";

const CreateBeerForm = () => {
  interface Beer {
    name: string;
    type: string;
    hasCorn: boolean;
    ingredients: "";
  }

  const [beer, setBeer] = useState<Beer>({
    name: "",
    type: "",
    hasCorn: false,
    ingredients: "",
  });

  const onChangeText = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const newValue = event.target.value;
      setBeer({
        ...beer,
        [event.target.name]: newValue,
      });
    },
    [beer]
  );

  const onChangeCheckBox = useCallback(() => {
    setBeer({
      ...beer,
      hasCorn: !beer.hasCorn,
    });
  }, [beer]);

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      console.log(beer);
    },
    [beer]
  );

  return (
    <CreateBeerFormView
      name={beer.name}
      type={beer.type}
      hasCorn={beer.hasCorn}
      ingredients={beer.ingredients}
      onChangeText={onChangeText}
      onChangeCheckBox={onChangeCheckBox}
      onSubmit={onSubmit}
    />
  );
};

export default CreateBeerForm;
