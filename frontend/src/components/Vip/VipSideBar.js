import { Link } from "react-router-dom";
import { ShoppingBag, Logout, Person } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
const items = [
  {
    name: "會員資料",
    icon: <Person />,
    to: "/vipinfo",
  },
  {
    name: "訂單查詢",
    icon: <ShoppingBag />,
    to: "/order",
  },
  {
    name: "登出",
    icon: <Logout />,
    to: "",
  },
];

function VipSideBar({ SIDEBAR }) {
  const {
    currentPath,
    open,
    handleClickOpen,
    handleClose,
    toMain,
    handleGetInfo,
  } = SIDEBAR;
  return (
    <>
      {items.map((item) => (
        <ListItemButton
          key={item.name}
          component={Link}
          to={item.to}
          selected={currentPath === item.to}
          onClick={
            item.name === "登出"
              ? handleClickOpen
              : item.name === "會員資料"
              ? handleGetInfo
              : null
          }
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"確定要登出嗎"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={toMain} autoFocus>
            確定登出
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VipSideBar;
