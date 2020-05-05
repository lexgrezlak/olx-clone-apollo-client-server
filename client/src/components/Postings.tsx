import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTINGS } from "../graphql/queries";
import { useField } from "../hooks/index";
import Search from "./Search";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarIconBorder from "@material-ui/icons/StarBorder";

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
      transform: "translateZ(0)",
    },
    icon: {
      color: "white",
    },
  })
);

interface Props {
  needToRefetch: boolean;
  setNeedToRefetch: Function;
}

const Postings: React.FC<Props> = ({ needToRefetch, setNeedToRefetch }) => {
  const filter = useField("search");
  const { data, loading, error, refetch } = useQuery(GET_POSTINGS, {
    variables: { title: filter.value },
  });
  const classes = useStyles();

  const makeRefetch = async () => {
    await refetch();
    setNeedToRefetch(false);
  };

  if (needToRefetch) makeRefetch();

  return (
    <div className={classes.root}>
      <Search filter={filter} />
      {!loading && !error && (
        <GridList cellHeight={200} className={classes.gridList}>
          {data.postings.map((item: any) => (
            <GridListTile key={item.id} cols={1} rows={1}>
              <img src={item.imageUrls[0] || ""} alt={item.title} />
              <GridListTileBar
                title={"$" + item.price}
                subtitle={<span>{item.title}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`follow the posting: ${item.title}`}
                    className={classes.icon}
                  >
                    <StarIconBorder />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
};

export default Postings;
