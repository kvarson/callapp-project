import { useEffect, useState } from "react";
import { Table } from "antd";
import "./App.css";
import axios from "axios";

import data from "../../backend/data/data.json";

console.log(data);
function App() {
  const [columns, setColumns] = useState([
    {
      title: "ID",
      dataIndex: "id",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [dataSource, setDataSource] = useState([]);
  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
}

export default App;
