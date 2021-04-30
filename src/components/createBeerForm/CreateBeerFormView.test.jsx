import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";

import CreateBeerFormView from "./CreateBeerFormView";
import { CreateBeerFormStyle } from "./CreateBeerFormView.styles";
import { typeBeerMock } from "../../mocks/typeBeerMock";

jest.mock("./CreateBeerFormView.styles.ts");
const onSubmitMock = jest.fn((f) => f);
const onChangeTextMock = jest.fn((f) => f);
const onChangeCheckBoxMock = jest.fn((f) => f);
const beerMock = {
  name: "beer test",
  type: "Brahma",
  hasCorn: true,
  ingredients: "ingredients test",
  onChangeText: onChangeTextMock,
  onChangeCheckBox: onChangeCheckBoxMock,
};

const {
  name,
  type,
  hasCorn,
  ingredients,
  onChangeText,
  onChangeCheckBox,
} = beerMock;

describe("CreateBeerFormView", () => {
  beforeEach(() => {
    CreateBeerFormStyle.mockReturnValue({
      card: "card",
      label: "label",
      textarea: "textarea",
    });
  });

  it("should render CreateBeerFormView with right props and correct elements", () => {
    const wrapper = shallow(
      <CreateBeerFormView onSubmit={onSubmitMock} {...beerMock} />
    );

    expect(
      wrapper.matchesElement(
        <Card className={"card"}>
          <form onSubmit={onSubmitMock}>
            <Typography variant="h4" gutterBottom>
              Create Beer Form
            </Typography>

            <TextField
              name="name"
              id="name"
              value={name}
              onChange={onChangeTextMock}
              label="Nome da bebida"
              variant="outlined"
              fullWidth
            />

            <br />
            <br />

            <TextField
              select
              name="type"
              id="type"
              onChange={onChangeTextMock}
              value={type}
              label="Tipo de bebida"
              variant="outlined"
              fullWidth
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
                  onChange={onChangeCheckBoxMock}
                  checked={hasCorn}
                  color="primary"
                />
              }
              label="Tem cevada?"
            />

            <br />

            <label htmlFor="ingredients" className={"label"}>
              Ingredientes:{" "}
            </label>
            <TextareaAutosize
              rowsMin={5}
              name="ingredients"
              id="ingredients"
              placeholder="Digite os ingredientes"
              onChange={onChangeTextMock}
              value={ingredients}
              className={"textarea"}
            />

            <br />

            <Button
              type="submit"
              disabled={!name || !type || !ingredients}
              variant="contained"
              color="primary"
              fullWidth
            >
              Enviar
            </Button>
          </form>
        </Card>
      )
    ).toBe(true);
  });

  it("should submit form", () => {
    const wrapper = shallow(
      <CreateBeerFormView onSubmit={onSubmitMock} {...beerMock} />
    );

    wrapper.find("form").first().simulate("submit");
    expect(onSubmitMock).toHaveBeenCalled();
  });

  it("should render all list type of beer in select", () => {
    const wrapper = shallow(
      <CreateBeerFormView onSubmit={onSubmitMock} {...beerMock} />
    );

    const SELECT_OPTION_DISABLED_COUNT = 1;

    expect(wrapper.find(MenuItem).children()).toHaveLength(
      SELECT_OPTION_DISABLED_COUNT + typeBeerMock.length
    );
  });
});
