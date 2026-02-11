import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/" });

const DBContext = createContext({
  page: 0, //顯示是在第幾頁 table
  rowsPerPage: 10, //一頁包含幾個 tuple
  table: [], //後端回傳的詳細資料
  indexName: "",
  path: "",
  CRUD: () => {}, //axios api
});

const DBProvider = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [table, setTable] = useState([]);
  const [indexName, setIndexName] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    if (table.length > 0) {
      const columns = Object.keys(table[0].origin ? table[0].origin : table[0]);
      setIndexName(columns[columns.findIndex((c) => c.includes("id"))]);
    }
  }, [table]);

  const CRUD =
    (type, path) =>
    async (value = null) => {
      switch (type) {
        case "C":
          try {
            const {
              data: { result },
            } = await instance.post(`${path}`, value);
            if (typeof result !== "undefined") {
              if (result[0].origin) {
                setTable(result);
              } else {
                setTable([...result, ...table]);
              }
            }
            break;
          } catch (error) {
            // return new Promise((resolve, reject) => {
            //   reject(new Error("500: Internal Server Error"));
            // });
            throw error;
          }
        case "R":
          try {
            const {
              data: { result },
            } = await instance.get(`${path}`);
            setTable(result);
            break;
          } catch (error) {
            console.log(error);
          }
        case "U":
          try {
            const {
              data: { result },
            } = await instance.put(`${path}`, { value });
            const newResult = [];
            if (result[0].origin) {
              setTable(result);
            } else {
              for (const tuple of table) {
                newResult.push(
                  tuple[indexName] === result[0][indexName] ? result[0] : tuple
                );
              }
              setTable(newResult);
            }
            break;
          } catch (error) {
            throw error;
          }
        case "D":
          try {
            const {
              data: { result },
            } = await instance.delete(`${path}`, { params: { id: value } });
            setTable(result);
            break;
          } catch (error) {
            throw error;
          }
        default:
          break;
      }
    };

  return (
    <DBContext.Provider
      value={{
        page,
        rowsPerPage,
        table,
        indexName,
        path,
        setPage,
        setRowsPerPage,
        setTable,
        setPath,
        CRUD,
      }}
      {...props}
    />
  );
};

const useDB = () => useContext(DBContext);

export { DBProvider, useDB };
