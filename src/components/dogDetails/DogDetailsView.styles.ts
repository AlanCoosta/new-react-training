import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const DogDetailsStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    image: {
      maxWidth: 300,
      height: 300,
      objectFit: "cover",
      display: "block",
    },

    buttonBark: {
      margin: "8px 0px",
    },
  })
);
