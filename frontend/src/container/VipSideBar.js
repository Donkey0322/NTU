import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from "react-router-dom";

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
  }
];

function VipSideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(Link);

  return (
    <>
      {items.map((item) => (
        <ListItemButton
          key={item.name}
          component={Link}
          to={item.to}
          selected={currentPath === item.to}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </>
  );
}

export default VipSideBar;
