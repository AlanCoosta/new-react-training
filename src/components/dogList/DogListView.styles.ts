import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const DogListStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 20,
    },
    list: {
      width: "100%",
      maxWidth: 360,
      height: "100%",
      maxHeight: 300,
      overflow: "auto",
    },
    listItemImage: {
      width: 100,
      height: 100,
      objectFit: "cover",
    },
  })
);
