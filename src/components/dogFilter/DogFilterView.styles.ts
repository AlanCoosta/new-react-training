import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const DogFilterStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 20,
      marginBottom: 20,
    },
    content: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 100px)",
    },
  })
);
