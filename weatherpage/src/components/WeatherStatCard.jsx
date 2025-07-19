// src/components/WeatherStatCard.jsx
import React from "react";

const WeatherStatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl p-4 text-center flex flex-col items-center justify-center shadow-[0_0_37px_rgba(0,0,0,0.15)]">
    <div className="text-gray-500 mb-1">{icon}</div>
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default WeatherStatCard;
