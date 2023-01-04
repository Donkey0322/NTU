import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useWeb } from "./hooks/useWeb";
const items = [
  {
    name: "會員資料",
    icon: <PersonIcon />,
    to: "/vipinfo",
  },
  {
    name: "訂單查詢",
    icon: <ShoppingBagIcon />,
    to: "/customer-services",
  },
  {
    name: "登出",
    icon: <LogoutIcon />,
    to: "",
  }
];

function VipSideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const {removeCookie, setLogin} = useWeb();
  // console.log(Link);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toMain = () => {
      removeCookie('customer_id', { path: '/' });
      setLogin(false);
      navigate("/");
    };
  return (
    <>
      {items.map((item) => (
        <ListItemButton
          key={item.name}
          component={Link}
          to={item.to}
          selected={currentPath === item.to}
          onClick={item.name === "登出" ? handleClickOpen : null}
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
          <DialogTitle id="alert-dialog-title">
          {"確定要登出嗎"}
          </DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
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
