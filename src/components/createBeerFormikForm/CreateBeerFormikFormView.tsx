import { Formik } from "formik";

import { BeerFormData } from "./CreateBeerFormikForm.types";
import { typeBeerMock } from "../../mocks/typeBeerMock";

interface Props {
  onSubmit: (values: BeerFormData) => void;
}

const CreateBeerFormikFormView = ({ onSubmit }: Props) => {
  return (
    <Formik
      initialValues={{ name: "", type: "", hasCorn: true, ingredients: "" }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit}>
          <h4>Create Beer Formik Form</h4>

          <label htmlFor="name">Nome da bebida: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="type">Tipo de bebida: </label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={values.type}
            required
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {typeBeerMock.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>

          <br />

          <label htmlFor="hasCorn">Tem cevada?: </label>
          <input
            type="checkbox"
            name="hasCorn"
            id="hasCorn"
            onChange={handleChange}
            checked={values.hasCorn}
            required
          />

          <br />

          <label htmlFor="ingredients">Ingredientes: </label>
          <textarea
            name="ingredients"
            id="ingredients"
            placeholder="Digite os ingredientes"
            onChange={handleChange}
            value={values.ingredients}
            required
          />

          <button type="submit" disabled={!dirty}>
            Enviar
          </button>
        </form>
      )}
    </Formik>
  );
};

export default CreateBeerFormikFormView;
