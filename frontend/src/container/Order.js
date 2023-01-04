import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useWeb } from "./hooks/useWeb";
import Title from "../Title";
import Row from "./Row";

function Order() {
  const { CRUD, customer_id } = useWeb();
  const Query = CRUD("R", "/orders_create");

  useEffect(() => {
    const Render = async () => {
      try {
        const result = await CRUD("R", "/orders_create")({ customer_id });
        setProducts(result);
      } catch (err) {
        alert("有問題");
      }
    };
    Render();
  }, [sort]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="p-4" sx={{ overflowX: "hidden" }}>
      <Title>Order</Title>
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
              //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        {/* <TableFooter>
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
        </TableFooter> */}
      </Table>
    </Paper>
  );
}

export default Table_Board;
