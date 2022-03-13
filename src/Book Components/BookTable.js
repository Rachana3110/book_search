import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import AuthorTable from "./AuthorTable";
import Drawer from "@mui/material/Drawer";

const useStyles = makeStyles({
  root: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  table: {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "white",
  },
  column: {
    border: "1px solid white",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
  },
  row: {
    textAlign: "left",
    border: "1px solid black",
  },
  SideBar: {
    display: "flex",
  },
  link: {
    color: "blue",
  },
  drawer: {
    backgroundColor: "grey",
  },
});

const BookTable = ({ data }) => {
  const classes = useStyles();
  const [authorDetails, setAuthorDetails] = useState();
  const [display, setDisplay] = useState(false);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (autherName, anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    setDisplay(true);
    setAuthorDetails(autherName);
  };

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <table className={classes.table}>
          <tr>
            <th className={classes.column}> Book Name</th>
            <th className={classes.column}> Author Name</th>
            <th className={classes.column}> Year of Publish</th>
            <th className={classes.column}> Published Languages</th>
            <th className={classes.column}> Published Places</th>
          </tr>
          {data.map((val, key) => {
            return (
              <>
                <tr key={key}>
                  <td className={classes.row}>{val.title}</td>
                  <td className={classes.row}>
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <a
                          href="!#"
                          className={classes.link}
                          onClick={toggleDrawer(
                            val.author_name[0],
                            anchor,
                            true
                          )}
                        >
                          {" "}
                          {val.author_name[0]}{" "}
                        </a>
                        <Drawer
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(
                            val.author_name[0],
                            anchor,
                            false
                          )}
                          className={classes.drawer}
                        >
                          <>
                            {authorDetails && (
                              <AuthorTable value={authorDetails} />
                            )}
                          </>
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </td>
                  <td className={classes.row}>{val.first_publish_year}</td>
                  <td className={classes.row}>
                    {val.language != null
                      ? val.language.join(", ")
                      : val.language}
                  </td>
                  <td className={classes.row}>
                    {val.place != null ? val.place.join(", ") : val.place}
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default BookTable;
