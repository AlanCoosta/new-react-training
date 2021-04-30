import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";

import { typeBeerMock } from "../../mocks/typeBeerMock";
import { CreateBeerFormStyle } from "./CreateBeerFormView.styles";

interface Props {
  name: string;
  type: string;
  hasCorn: boolean;
  ingredients: string;
  onChangeText: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onChangeCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const CreateBeerFormView = ({
  name,
  type,
  hasCorn,
  ingredients,
  onChangeText,
  onChangeCheckBox,
  onSubmit,
}: Props) => {
  const classes = CreateBeerFormStyle();

  return (
    <Card className={classes.card}>
      <form onSubmit={onSubmit}>
        <Typography variant="h4" gutterBottom>
          Create Beer Form
        </Typography>

        <TextField
          name="name"
          id="name"
          value={name}
          onChange={onChangeText}
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
          onChange={onChangeText}
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
              onChange={onChangeCheckBox}
              checked={hasCorn}
              color="primary"
            />
          }
          label="Tem cevada?"
        />

        <br />

        <label htmlFor="ingredients" className={classes.label}>
          Ingredientes:{" "}
        </label>
        <TextareaAutosize
          rowsMin={5}
          name="ingredients"
          id="ingredients"
          placeholder="Digite os ingredientes"
          onChange={onChangeText}
          value={ingredients}
          className={classes.textarea}
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
  );
};

export default CreateBeerFormView;
