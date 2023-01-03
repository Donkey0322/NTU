import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Filter = ({ data, submit, setProducts }) => {
  const filter = [
    {
      section: "hot",
      src: require("../../icons/top.png"),
      primary: "熱門商品",
    },
    {
      section: "calene",
      src: require("../../icons/canele.png"),
      primary: "可麗露",
    },
    {
      section: "cake",
      src: require("../../icons/basque.png"),
      primary: "蛋糕",
    },
    {
      section: "cookie",
      src: require("../../icons/cookie.png"),
      primary: "餅乾",
    },
    {
      section: "hot",
      src: null,
      primary: "組合",
    },
  ];
  return (
    <List
      sx={{
        width: "180px",
        // maxWidth: "150px",
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-label="secondary mailbox folders"
    >
      {filter.map((f, index) => (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const result = submit({
                ...data,
                section: f.section,
              });
              setProducts(result);
            }}
          >
            <img className="icon" src={f.src} alt="" />
            <ListItemText primary={f.primary} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Filter;
