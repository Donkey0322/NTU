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
import { useEffect, useState } from "react";
import { useWeb } from "./hooks/useWeb";
import Row from "./Row";

function Order() {
  const { CRUD, cookies } = useWeb();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const Render = async () => {
      try {
        const result = await CRUD(
          "R",
          "/orders_manage"
        )({ customer_id: cookies.customer_id });
        setOrder(result);
      } catch (err) {
        alert("有問題");
      }
    };
    if (cookies.customer_id) Render();
  }, [cookies.customer_id]);

  return (
    <Paper className="p-4" sx={{ overflowX: "hidden" }}>
      {/* <Title>Order</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            {order.length > 0 &&
              Object.keys(order[0].origin).map((column, index) => (
                <TableCell variant="head" key={index}>
                  {column.includes("id") ? "" : column}
                </TableCell>
              ))}
            <TableCell variant="head" />
          </TableRow>
        </TableHead>
        <TableBody>
          {order.length > 0 &&
            order.map((tuple, index) => (
              <Row key={index} item={tuple} id={index} />
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

export default Order;
