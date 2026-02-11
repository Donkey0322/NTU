import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDB } from "../../hooks/useDB";

import Title from "../Title";
import Row from "./Row";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

function Table_Board({ title, updatable, deletable }) {
  const {
    page,
    rowsPerPage,
    indexName,
    table,
    setPage,
    setRowsPerPage,
    setPath,
    CRUD,
  } = useDB();
  const location = useLocation();
  const currentPath = location.pathname;
  const Query = CRUD("R", currentPath);

  useEffect(() => {
    Query();
    setPath(currentPath);
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="p-4" sx={{ overflowX: "hidden" }}>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {table.length > 0 &&
              Object.keys(table[0].origin ? table[0].origin : table[0]).map(
                (column, index) => (
                  <TableCell variant="head" key={index}>
                    {column.includes("id") ? "" : column}
                  </TableCell>
                )
              )}
            <TableCell variant="head" />
          </TableRow>
        </TableHead>
        <TableBody>
          {table.length > 0 &&
            table
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((tuple, index) => (
                <Row
                  key={index}
                  item={tuple}
                  id={index}
                  updatable={updatable}
                  deletable={deletable}
                />
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={table.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

export default Table_Board;
