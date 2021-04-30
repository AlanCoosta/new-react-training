import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const AppStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 900,
      margin: "0px auto",
    },
    button: {
      margin: 32,
    },
  })
);
