import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const DogListStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 20,
    },
    loading: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    list: {
      background: "#fff",
      height: "100%",
      maxHeight: 400,
      overflow: "auto",
    },
    listItem: {
      cursor: "pointer",
      transition: "180ms ease-in",
      "&:hover": {
        background: "#dadada",
      },
    },
    listItemSelected: {
      background: "#dadada",
    },
    listItemImage: {
      width: 100,
      height: 100,
      objectFit: "cover",
    },
    listItemText: {
      marginLeft: 8,
    },
  })
);
