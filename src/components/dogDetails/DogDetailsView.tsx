import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { capitalize } from "lodash";

import { DogDetailsStyle } from "./DogDetailsView.styles";

interface Props {
  name: string;
  image: string;
  onBark: () => void;
  onScold: (name: string) => void;
}

const DogDetailsView = ({ name, image, onBark, onScold }: Props) => {
  const classes = DogDetailsStyle();

  return (
    <div className={classes.container}>
      <Typography variant="h2" gutterBottom>
        {name === "" ? "Name of breed" : capitalize(name)}
      </Typography>

      <img src={image} alt={name} className={classes.image} />

      <Button
        onClick={onBark}
        id="button"
        variant="contained"
        color="primary"
        className={classes.buttonBark}
      >
        Bark!
      </Button>

      <Button onClick={() => onScold(name)} variant="contained" color="primary">
        Scold!
      </Button>
    </div>
  );
};

export default DogDetailsView;
