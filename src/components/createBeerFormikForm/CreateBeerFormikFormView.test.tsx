import { shallow } from "enzyme";
import {
  FormikErrors,
  FormikHandlers,
  FormikState,
  FormikTouched,
  FormikValues,
  FormikComputedProps,
} from "formik";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";

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
        <Card style={{ padding: 20 }}>
          <form onSubmit={formikHandlers.handleSubmit}>
            <Typography variant="h4" gutterBottom>
              Create Beer Formik Form
            </Typography>

            <TextField
              name="name"
              id="name"
              value={propsFormik.values.name}
              onChange={formikHandlers.handleChange}
              label="Nome da bebida"
              variant="outlined"
              fullWidth
              helperText={propsFormik.errors.name}
            />

            <br />
            <br />

            <TextField
              select
              name="type"
              id="type"
              onChange={formikHandlers.handleChange}
              value={propsFormik.values.type}
              label="Tipo de bebida"
              variant="outlined"
              fullWidth
              helperText={propsFormik.errors.type}
            >
              <MenuItem value="" disabled>
                Selecione uma opção
              </MenuItem>

              {typeBeerMock.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            <br />

            <FormControlLabel
              control={
                <Checkbox
                  name="hasCorn"
                  id="hasCorn"
                  onChange={formikHandlers.handleChange}
                  checked={propsFormik.values.hasCorn}
                  color="primary"
                />
              }
              label="Tem cevada?"
            />

            <br />

            <label htmlFor="ingredients" style={{ display: "block" }}>
              Ingredientes:{" "}
            </label>
            <TextareaAutosize
              rowsMin={5}
              name="ingredients"
              id="ingredients"
              placeholder="Digite os ingredientes"
              onChange={formikHandlers.handleChange}
              value={propsFormik.values.ingredients}
              style={{ width: "100%", resize: "none" }}
            />

            <Button
              type="submit"
              disabled={!formikComputedProps.dirty}
              variant="contained"
              color="primary"
              fullWidth
            >
              Enviar
            </Button>
          </form>
        </Card>
      )
    );
  });

  it("should render all list type of beer in select", () => {
    const SELECT_OPTION_DISABLED_COUNT = 1;

    expect(formWrapper.find(MenuItem).children()).toHaveLength(
      SELECT_OPTION_DISABLED_COUNT + typeBeerMock.length
    );
  });

  it("should TextField beer name must be have the name prop declared as name", () => {
    expect(formWrapper.find("#name").props().name).toBe("name");
  });

  it("should TextField type of beer must be have the name prop declared as type", () => {
    expect(formWrapper.find("#type").props().name).toBe("type");
  });

  it("should TextField ingredients must be have the name prop declared as ingredients", () => {
    expect(formWrapper.find("#ingredients").props().name).toBe("ingredients");
  });
});
