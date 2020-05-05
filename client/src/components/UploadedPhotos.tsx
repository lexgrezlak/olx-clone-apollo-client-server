import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    tileBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)",
    },
  })
);

type Props = { urls: string[]; setUrls: Function };

export default function Photos({ urls, setUrls }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {urls.map((url) => (
          <GridListTile key={url}>
            <img src={url} alt="uploaded photo" />
            <GridListTileBar
              className={classes.tileBar}
              actionIcon={
                <IconButton
                  onClick={() =>
                    setUrls(urls.filter((oldUrl: string) => oldUrl !== url))
                  }
                  aria-label={"delete button"}
                  className={classes.icon}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
