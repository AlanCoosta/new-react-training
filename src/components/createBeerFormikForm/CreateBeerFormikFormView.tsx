import { Formik } from "formik";
import * as yup from "yup";

import { BeerFormData } from "./CreateBeerFormikForm.types";
import { typeBeerMock } from "../../mocks/typeBeerMock";

interface Props {
  onSubmit: (values: BeerFormData) => void;
}

const CreateBeerFormikFormView = ({ onSubmit }: Props) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("O nome da bebida é obrigatório"),
    type: yup.string().required("O tipo da bebida é obrigatório"),
    ingredients: yup.string().required("O ingrediente é obrigatório"),
  });

  return (
    <Formik
      initialValues={{ name: "", type: "", hasCorn: true, ingredients: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
