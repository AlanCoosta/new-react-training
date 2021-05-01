import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import capitalize from "lodash/capitalize";

import { DogBreed } from "../../types/DogBreedsTypes";
import { DogListStyle } from "./DogListView.styles";

interface Props {
  dogBreeds: DogBreed[];
  isLoading: boolean;
  dogSelected: DogBreed;
  handleSelectDog: (dog: DogBreed) => void;
}

const DogListView = ({
  dogBreeds,
  isLoading,
  dogSelected,
  handleSelectDog,
}: Props) => {
  const classes = DogListStyle();

  return (
    <Card className={classes.card}>
      <Typography variant="h4" gutterBottom>
        DogListView
      </Typography>

      {isLoading && (
        <Card className={classes.loading}>
          <CircularProgress />
        </Card>
      )}

      {!isLoading && (
        <List className={classes.list}>
          {dogBreeds.map((item) => (
            <ListItem
              key={item.image}
              onClick={() => handleSelectDog(item)}
              className={
                item.name === dogSelected?.name
                  ? classes.listItemSelected
                  : classes.listItem
              }
            >
              <img
                src={item.image}
                alt={item.name}
                className={classes.listItemImage}
              />
              <ListItemText className={classes.listItemText}>
                {capitalize(item.name)}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default DogListView;
