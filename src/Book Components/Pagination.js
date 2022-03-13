import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  pagination: {
    paddingLeft: "0rem",
    textAlign: "center",
    paddingBottom: "20px",
  },
  button: {
    marginLeft: "1px",
    fontSize: "20px",
  },
  clickedButton: {
    fontSize: "25px",
    color: "white",
    backgroundColor: "black",
  },
});

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const classes = useStyles();
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
  }, [totalBooks]);

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers &&
          pageNumbers.map((num) => {
            return (
              <button
                className={
                  currentPage !== num ? classes.button : classes.clickedButton
                }
                onClick={() => paginate(num)}
              >
                {num}
              </button>
            );
          })}
      </ul>
    </nav>
  );
};

export default Pagination;
