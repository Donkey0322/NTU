import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import WcIcon from "@mui/icons-material/Wc";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GradingIcon from "@mui/icons-material/Grading";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    name: "Home",
    icon: <HomeIcon />,
    to: "/",
  },
  {
    name: "Customers",
    icon: <WcIcon />,
    to: "/customers",
  },
  {
    name: "Customer Service",
    icon: <SupportAgentIcon />,
    to: "/customer_services",
  },
  {
    name: "Employees",
    icon: <SupervisedUserCircleIcon />,
    to: "/employees",
  },
  {
    name: "Orders",
    icon: <GradingIcon />,
    to: "/orders",
  },
  {
    name: "Products",
    icon: <CategoryIcon />,
    to: "/products",
  },
  {
    name: "Purchases",
    icon: <ShoppingCartIcon />,
    to: "/purchases",
  },
];

function SideBarItems() {
  const location = useLocation();
  const currentPath = location.pathname;

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

export default SideBarItems;
