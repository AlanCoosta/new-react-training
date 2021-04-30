import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import capitalize from "lodash/capitalize";

import { DogBreed } from "../../types/DogBreedsTypes";
import { DogListStyle } from "./DogListView.styles";

interface Props {
  dogBreeds: DogBreed[];
}

const DogListView = ({ dogBreeds }: Props) => {
  const classes = DogListStyle();

  return (
    <Card className={classes.card}>
      <Typography variant="h4" gutterBottom>
        DogListView
      </Typography>

      <List className={classes.list}>
        {dogBreeds.map((item) => (
          <ListItem key={item.image}>
            <img
              src={item.image}
              alt={item.name}
              className={classes.listItemImage}
            />
            <ListItemText>{capitalize(item.name)}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default DogListView;
