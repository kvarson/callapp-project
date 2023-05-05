import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import PieChart from "antd/es/chart/PieChart";
import { Pie } from "@ant-design/plots";
// import { Pie } from "@ant-design/charts";
// import { Line } from "@ant-design/charts";
import axios from "axios";

const dataz = [
  { type: "Direct", value: 335 },
  { type: "Email", value: 310 },
  { type: "Affiliate", value: 274 },
  { type: "Video Ads", value: 235 },
  { type: "Search", value: 400 },
];

const ChartComponent = () => {
  const [data, setData] = useState(null);
  console.log(data);
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

  // calculate the percentage of people in each city
  const cities = {};
  data?.forEach((person) => {
    const city = person.address.city;
    cities[city] = (cities[city] || 0) + 1;
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
