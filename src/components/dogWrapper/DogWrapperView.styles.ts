import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const DogWrapperStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 50,
    },
  })
);
