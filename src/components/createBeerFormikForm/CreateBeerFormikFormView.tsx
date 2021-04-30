import { Formik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";

import { BeerFormData } from "./CreateBeerFormikForm.types";
import { typeBeerMock } from "../../mocks/typeBeerMock";
import { CreateBeerFormikFormStyle } from "./CreateBeerFormikFormView.styles";

interface Props {
  onSubmit: (values: BeerFormData) => void;
}

const CreateBeerFormikFormView = ({ onSubmit }: Props) => {
  const classes = CreateBeerFormikFormStyle();

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
      {({ values, handleChange, handleSubmit, dirty, errors }) => (
        <Card className={classes.card}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
              Create Beer Formik Form
            </Typography>

            <TextField
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              label="Nome da bebida"
              variant="outlined"
              fullWidth
              helperText={errors.name}
            />

            <br />
            <br />

            <TextField
              select
              name="type"
              id="type"
              onChange={handleChange}
              value={values.type}
              label="Tipo de bebida"
              variant="outlined"
              fullWidth
              helperText={errors.type}
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
                  onChange={handleChange}
                  checked={values.hasCorn}
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
              onChange={handleChange}
              value={values.ingredients}
              className={classes.textarea}
            />

            <Button
              type="submit"
              disabled={!dirty}
              variant="contained"
              color="primary"
              fullWidth
            >
              Enviar
            </Button>
          </form>
        </Card>
      )}
    </Formik>
  );
};

export default CreateBeerFormikFormView;
