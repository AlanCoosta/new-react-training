import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { DogDetailsStyle } from "./DogDetailsView.styles";

interface Props {
  name: string;
  image: string;
  onBark: () => void;
  onScold: () => void;
  scoldCounter: number;
}

const DogDetailsView = ({
  name,
  image,
  onBark,
  onScold,
  scoldCounter,
}: Props) => {
  const classes = DogDetailsStyle();

  return (
    <div className={classes.container}>
      <Typography variant="h2" gutterBottom>
        {name}
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

      <Typography variant="h4" gutterBottom>
        Scold counter: <b>{scoldCounter}</b>{" "}
        <Button onClick={onScold} variant="contained" color="primary">
          Scold!
        </Button>
      </Typography>
    </div>
  );
};

export default DogDetailsView;
