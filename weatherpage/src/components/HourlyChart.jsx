import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

// 🎯 Tooltip tiếng Việt
const CustomTooltip = ({ active, payload, label, metric }) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;
  let labelText = "", unit = "";

  if (metric === "temp") {
    labelText = "Nhiệt độ";
    unit = "°C";
  } else if (metric === "humidity") {
    labelText = "Độ ẩm";
    unit = "%";
  } else if (metric === "uv") {
    labelText = "Tia UV";
    unit = "";
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm shadow-md">
      <div className="text-gray-500 font-medium mb-1">{label}</div>
      <div>
        {labelText}: <span className="font-bold">{value}{unit}</span>
      </div>
    </div>
  );
};

// 🎯 Tô màu cột UV riêng theo giá trị
const getUvColor = (uv) => {
  if (uv <= 2) return "#22c55e";      // xanh lá
  if (uv <= 5) return "#facc15";      // vàng
  if (uv <= 7) return "#f97316";      // cam
  return "#ef4444";                   // đỏ
};

const HourlyChart = ({ data, dataKey }) => {
  const gradientId = `gradient-${dataKey}`;

  const coloredData = dataKey === "uv"
    ? data.map((item) => ({
        ...item,
        fillColor: getUvColor(item.uv),
      }))
    : data;

  const renderGradient = () => {
    switch (dataKey) {
      case "temp":
        return (
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#fde047" stopOpacity={0.3} />
          </linearGradient>
        );
      case "humidity":
        return (
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.2} />
          </linearGradient>
        );
      default:
        return null;
    }
  };

  const strokeColor = {
    temp: "#f97316",
    humidity: "#3b82f6",
  }[dataKey] || "#8884d8";

  return (
    <ResponsiveContainer width="100%" height={250}>
      {dataKey === "uv" ? (
        <BarChart data={coloredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(time, idx) => (idx % 2 === 0 ? time : "")}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} width={35} domain={[0, 13]} />
          <Tooltip content={<CustomTooltip metric={dataKey} />} />
          <Bar dataKey="uv" radius={[10, 10, 0, 0]}>
            {coloredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fillColor} />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <AreaChart data={data}>
          <defs>{renderGradient()}</defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(time, idx) => (idx % 2 === 0 ? time : "")}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} width={35} />
          <Tooltip content={<CustomTooltip metric={dataKey} />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export default HourlyChart;
