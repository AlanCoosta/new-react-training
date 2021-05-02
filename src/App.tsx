import { useCallback } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import CreateBeerForm from "./components/createBeerForm/CreateBeerForm";
import CreateBeerFormikForm from "./components/createBeerFormikForm/CreateBeerFormikForm";
import DogDetails from "./components/dogDetails/DogDetails";
import DogList from "./components/dogList/DogList";
import DogFilter from "./components/dogFilter/DogFilter";

import { AppStyles } from "./App.styles";
import "./App.css";

const App = () => {
  const classes = AppStyles();

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
          <DogDetails />
        </Grid>

        <Grid item sm={6}>
          <DogList />
        </Grid>

        <Grid item xs={12}>
          <DogFilter />
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
