import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pie } from "@ant-design/plots";
import axios from "axios";

const ChartComponent = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      const data = response.data;

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }
  const cities = {};
  data?.forEach((person) => {
    const city = person?.address?.city;
    if (city) {
      cities[city] = (cities[city] || 0) + 1;
    }
  });

  const cityData = Object.keys(cities).map((city) => ({
    name: city,
    value: cities[city],
    percent: ((cities[city] / data.length) * 100).toFixed(2),
  }));

  return (
    <>
      <Link to='/'>Click to Go back to the table</Link>
      <div className='divider'></div>
      <Pie
        data={cityData}
        angleField='value'
        colorField='name'
        radius={0.8}
        label={{
          type: "inner",
          offset: "-30%",
          formatter: ({ name, value }) =>
            ` ${((value / data.length) * 100).toFixed(2)}%`,
        }}
        width={800}
        height={600}
        legend={{
          position: "right",
          offsetY: 0,
          offsetX: -50,
        }}
        tooltip={{
          title: "City",
          formatter: ({ name, value }) =>
            `${name}: ${((value / data.length) * 100).toFixed(2)}%`,
        }}
      />
    </>
  );
};

export default ChartComponent;
