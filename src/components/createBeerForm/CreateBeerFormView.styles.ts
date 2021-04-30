import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const CreateBeerFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 20,
    },
    label: {
      display: "block",
    },
    textarea: {
      width: "100%",
      resize: "none",
    },
  })
);
