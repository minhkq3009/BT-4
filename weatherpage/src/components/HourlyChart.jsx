import React from "react";
import HourlyWeatherSection from "./HourlyWeatherSection";

const HourlyChart = ({ data, dataKey }) => {
  return <HourlyWeatherSection data={data} dataKey={dataKey} />;
};

export default HourlyChart;
