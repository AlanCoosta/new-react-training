import { useCallback } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import CreateBeerForm from "./components/createBeerForm/CreateBeerForm";
import CreateBeerFormikForm from "./components/createBeerFormikForm/CreateBeerFormikForm";
import DogDetails from "./components/dogDetails/DogDetails";
import DogList from "./components/dogList/DogList";

import { AppStyles } from "./App.styles";
import "./App.css";

const App = () => {
  const classes = AppStyles();

  const dogInfo = {
    name: "Golden Retriever",
    image:
      "https://www.petlove.com.br/static/pets/dog/48881/hd_1531952446-photo.jpg",
  };

  const onAlert = useCallback(() => {
    alert("Welcome to the React Training");
  }, []);

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        onClick={onAlert}
        className={classes.button}
      >
        Alert
      </Button>

      <Grid container spacing={3}>
        <Grid item sm={6}>
          <DogDetails name={dogInfo.name} image={dogInfo.image} />
        </Grid>

        <Grid item sm={6}>
          <DogList />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item sm={6}>
          <CreateBeerForm />
        </Grid>

        <Grid item sm={6}>
          <CreateBeerFormikForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
