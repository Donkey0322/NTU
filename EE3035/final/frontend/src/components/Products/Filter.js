import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Filter = ({ data, submit, setProducts }) => {
  const filter = [
    {
      section: "all",
      src: require("../../icons/all.png"),
      primary: "全部商品",
    },
    {
      section: "hot",
      src: require("../../icons/top.png"),
      primary: "熱門商品",
    },
    {
      section: "canele",
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
      section: "set",
      src: require("../../icons/set.png"),
      primary: "組合",
    },
  ];
  return (
    <List
      sx={{
        width: "180px",
        // maxWidth: "150px",
        bgcolor: "background.paper",
        position: "sticky",
        top: "calc(calc(max(120px, 1vmin) * 0.75) + 10vmin + 40px)"
      }}
      component="nav"
      aria-label="secondary mailbox folders"
    >
      {filter.map((f, index) => (
        <ListItem disablePadding key={index} >
          <ListItemButton onClick={() => submit(f.section)}>
            <img className="icon" src={f.src} alt="" />
            <ListItemText primary={f.primary}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Filter;
