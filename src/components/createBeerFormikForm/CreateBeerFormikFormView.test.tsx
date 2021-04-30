import { shallow } from "enzyme";
import {
  FormikErrors,
  FormikHandlers,
  FormikState,
  FormikTouched,
  FormikValues,
  FormikComputedProps,
} from "formik";

import CreateBeerFormikFormView from "./CreateBeerFormikFormView";
import { typeBeerMock } from "../../mocks/typeBeerMock";

describe("CreateBeerFormikFormView", () => {
  const mockFn = jest.fn();
  const error: FormikErrors<FormikValues> = {
    name: "",
    type: "",
    hasCorn: "",
    ingredients: "",
  };
  const touch: FormikTouched<FormikValues> = {
    name: false,
    type: false,
    hasCorn: false,
    ingredients: false,
  };

  const formikHandlers = {
    getFieldHelpers: mockFn(),
    getFieldMeta: mockFn(),
    getFieldProps: mockFn(),
    handleBlur: mockFn(),
    handleChange: mockFn(),
    handleReset: mockFn(),
    handleSubmit: mockFn(),
  } as FormikHandlers;

  const propsFormik = {
    handleSubmit: mockFn(),
    handleChange: mockFn(),
    touched: touch,
    errors: error,
    values: { name: "", type: "", hasCorn: false, ingredients: "" },
    isSubmitting: false,
    isValidating: false,
    submitCount: 1,
  } as FormikState<FormikValues>;

  const formikComputedProps = {
    dirty: false,
    isValid: false,
  } as FormikComputedProps<FormikValues>;

  const wrapper = shallow(<CreateBeerFormikFormView onSubmit={mockFn} />);
  const formWrapper = wrapper.renderProp("children")({
    ...propsFormik,
    ...formikHandlers,
  });

  it("should render CreateBeerFormikFormView with right props", () => {
    expect(
      formWrapper.matchesElement(
        <form onSubmit={formikHandlers.handleSubmit}>
          <h4>Create Beer Formik Form</h4>

          <label htmlFor="name">Nome da bebida: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={propsFormik.values.name}
            onChange={formikHandlers.handleChange}
            required
          />

          <br />

          <label htmlFor="type">Tipo de bebida: </label>
          <select
            name="type"
            id="type"
            onChange={formikHandlers.handleChange}
            value={propsFormik.values.type}
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
            onChange={formikHandlers.handleChange}
            checked={propsFormik.values.hasCorn}
            required
          />

          <br />

          <label htmlFor="ingredients">Ingredientes: </label>
          <textarea
            name="ingredients"
            id="ingredients"
            placeholder="Digite os ingredientes"
            onChange={formikHandlers.handleChange}
            value={propsFormik.values.ingredients}
            required
          />

          <button type="submit" disabled={!formikComputedProps.dirty}>
            Enviar
          </button>
        </form>
      )
    );
  });

  it("should render all list type of beer in select", () => {
    const SELECT_OPTION_DISABLED_COUNT = 1;

    expect(formWrapper.find("select").children()).toHaveLength(
      SELECT_OPTION_DISABLED_COUNT + typeBeerMock.length
    );
  });
});
