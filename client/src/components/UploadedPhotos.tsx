import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import DeletePhotoButton from "./DeletePhotoButton";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      marginTop: "16px",
      marginBottom: "8px",
    },
    gridList: {
      width: 500,
      height: "auto",
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

export default function UploadedPhotos({ urls, setUrls }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {urls.map((url) => (
          <GridListTile key={url}>
            <img src={url} alt="you just uploaded this" />
            <GridListTileBar
              className={classes.tileBar}
              actionIcon={
                <DeletePhotoButton
                  urls={urls}
                  setUrls={setUrls}
                  deletedUrl={url}
                />
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
