import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import dayjs from "../../utils/day";
import ItemFormModal from "../ItemFormModal";
import Chip from "@mui/joy/Chip";
import { useDB } from "../../hooks/useDB";

function Row({ item, updatable, deletable, id }) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { page, rowsPerPage, path, indexName, CRUD } = useDB();

  const Query = CRUD("D", path);

  const onCollapse = () => {
    setOpen((open) => !open);
  };

  const onEdit = () => {
    setModalOpen(true);
  };

  const handleDelete = () => {
    Query(item.origin ? item.origin[indexName] : item[indexName]);
  };

  return (
    <>
      <TableRow data-cy="item" hover>
        {item &&
          Object.keys(item.origin ? item.origin : item).map((column, index) => (
            <TableCell
              onClick={onCollapse}
              sx={{ cursor: "pointer" }}
              key={index}
            >
              <Typography>
                {/* {item.date && dayjs(item.date).calendar()} */}
                {column === "working" || column === "selling" ? (
                  item[column] === 1 ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip
                      color="danger"
                      disabled={false}
                      onClick={function () {}}
                      size="md"
                      variant="soft"
                    >
                      {" "}
                      False
                    </Chip>
                  )
                ) : column.includes("day") || column.includes("date") ? (
                  dayjs(
                    item.origin ? item.origin[column] : item[column]
                  ).calendar()
                ) : column.includes("id") ? (
                  id + page * rowsPerPage + 1
                ) : item.origin ? (
                  item.origin[column]
                ) : (
                  item[column]
                )}
              </Typography>
            </TableCell>
          ))}

        {/* 
        <TableCell onClick={onCollapse} sx={{ cursor: "pointer" }}>
          <Typography>{item.date && dayjs(item.date).calendar()}</Typography>
        </TableCell>
        <TableCell
          data-cy="item-name"
          onClick={onCollapse}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{item.name}</Typography>
        </TableCell>
        <TableCell data-cy="item-amount" align="right">
          <Typography>{item.amount && `$${item.amount}`}</Typography>
        </TableCell>
        <TableCell
          data-cy="item-category"
          onClick={onCollapse}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{item.category?.toLowerCase()}</Typography>
        </TableCell> */}
        <TableCell align="right" data-cy="item-edit">
          {updatable && (
            <IconButton onClick={onEdit} data-cy="update-item">
              <EditIcon />
            </IconButton>
          )}
          {deletable && (
            <IconButton onClick={handleDelete} data-cy="delete-item">
              <DeleteIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      {item.detail && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {Object.keys(item.detail[0]).map(
                        (column, index) =>
                          !column.includes("id") && (
                            <TableCell key={index}>{column}</TableCell>
                          )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.detail.map((d, index) => (
                      <TableRow key={index}>
                        {Object.keys(d).map(
                          (i, index) =>
                            !i.includes("id") && (
                              <TableCell component="th" scope="row" key={index}>
                                {d[i]}
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
      {/* <TableRow key={`${item.id}-descriptions`}>
        <TableCell colSpan={5} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Collapse in={descriptionOpen} timeout="auto" unmountOnExit>
            <div className="p-4">
              <Typography gutterBottom>Descriptions</Typography>
              <Typography variant="subtitle2" sx={{ textIndent: "1rem" }}>
                {item.description || "No description"}
              </Typography>
            </div>
          </Collapse>
        </TableCell>
      </TableRow> */}
      <ItemFormModal
        title="Edit Item"
        move="U"
        defaultFormData={item}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
}

export default Row;
