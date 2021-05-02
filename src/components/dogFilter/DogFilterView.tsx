import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import { capitalize } from "lodash";

import { DogBreed } from "../../types/DogBreedsTypes";
import { alphabet } from "../../utils/alphabet";

import { DogFilterStyle } from "./DogFilterView.styles";

interface Props {
  dogBreeds: DogBreed[];
  letterDogBreedSelected: string;
  handleSelectLetter: (letter: string) => void;
}

const DogFilterView = ({
  dogBreeds,
  letterDogBreedSelected,
  handleSelectLetter,
}: Props) => {
  const classes = DogFilterStyle();

  return (
    <div className={classes.container}>
      <FormControl component="fieldset">
        <Typography variant="h4" gutterBottom>
          Select the initial letter of breed
        </Typography>

        <RadioGroup
          row
          aria-label="breed"
          name="breed"
          value={letterDogBreedSelected}
          onChange={(e) => handleSelectLetter(e.target.value)}
          className={classes.content}
        >
          <FormControlLabel
            key="all"
            value=""
            control={<Radio color="primary" />}
            label={<p>All - {dogBreeds?.length}</p>}
          />

          {alphabet.map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio color="primary" />}
              label={
                <>
                  {capitalize(item)} -{" "}
                  {
                    dogBreeds.filter(
                      (n) =>
                        n.name.charAt(0).toLowerCase() === item.toLowerCase()
                    ).length
                  }
                </>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default DogFilterView;
