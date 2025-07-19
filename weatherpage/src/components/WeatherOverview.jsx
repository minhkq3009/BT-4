import React, { useEffect, useState } from "react";
import ChipSelector from "./ChipSelector";
import DayCards from "./DayCards";
import HourlyChart from "./HourlyChart";
import WeatherDetailModal from "./WeatherDetailModal";

const WeatherOverview = ({ city }) => {
  const [forecast, setForecast] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("Nhiệt độ");
  const [modalData, setModalData] = useState(null);

  const apiKey = "f5ac4be4a19c47d8a3e42522222112";

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`)
      .then((res) => res.json())
      .then((data) => {
        setForecast(data.forecast.forecastday);
        setSelectedDate(data.forecast.forecastday[0].date);
      });
  }, [city]);

  if (!forecast) return <div>Đang tải...</div>;

  const dayData = forecast.find((d) => d.date === selectedDate);

  const hourlyData = dayData.hour.map((h) => ({
    time: h.time.slice(11, 16),
    temp: h.temp_c,
    humidity: h.humidity,
    uv: h.uv,
  }));

  const metricMap = {
    "Nhiệt độ": "temp",
    "Độ ẩm": "humidity",
    "Tia UV": "uv",
  };

  const days = forecast.map((d, idx) => ({
    date: d.date,
    label:
      idx === 0
        ? "Hôm nay"
        : new Date(d.date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
          }),
    icon: d.day.condition.icon,
    max: d.day.maxtemp_c,
    min: d.day.mintemp_c,
    humidityMax: Math.round(Math.max(...d.hour.map((h) => h.humidity))),
    humidityMin: Math.round(Math.min(...d.hour.map((h) => h.humidity))),
    uv: Math.max(...d.hour.map((h) => h.uv)),
    fulData: d,
  }));

  return (
    <div className="space-y-6 rounded-2xl p-6 bg-white shadow-[0_0_37px_rgba(0,0,0,0.15)]">
      <ChipSelector selected={selectedMetric} onChange={setSelectedMetric} />
      <DayCards
        days={days}
        selectedDate={selectedDate}
        selectedMetric={selectedMetric}
        onSelect={setSelectedDate}
        onDoubleClick={(day)=>setModalData(day.fulData)}
      />
      <HourlyChart data={hourlyData} dataKey={metricMap[selectedMetric]} />

      {/* MODAL */}
      {modalData &&(
        <WeatherDetailModal data={modalData} onClose={() => setModalData(null)} />
      )}
    </div>
  );
};

export default WeatherOverview;
