import React, { useEffect, useState } from 'react';
import WeatherStatCard from "./WeatherStatCard";
import { Wind, Droplets, Gauge, Eye } from "lucide-react";

const translateCondition = (text) => {
  const translations = {
    "Sunny": "Nắng",
    "Partly cloudy": "Trời ít mây",
    "Cloudy": "Nhiều mây",
    "Overcast": "U ám",
    "Mist": "Sương mù",
    "Patchy rain possible": "Có thể có mưa nhỏ",
    "Patchy snow possible": "Có thể có tuyết nhỏ",
    "Patchy sleet possible": "Có thể có mưa tuyết",
    "Patchy freezing drizzle possible": "Có thể có mưa phùn đóng băng",
    "Thundery outbreaks possible": "Có thể có giông sét",
    "Blowing snow": "Tuyết thổi",
    "Blizzard": "Bão tuyết",
    "Fog": "Sương mù dày đặc",
    "Freezing fog": "Sương mù đóng băng",
    "Patchy light drizzle": "Mưa phùn nhẹ rải rác",
    "Light drizzle": "Mưa phùn nhẹ",
    "Freezing drizzle": "Mưa phùn đóng băng",
    "Heavy freezing drizzle": "Mưa phùn đóng băng nặng",
    "Patchy light rain": "Mưa nhẹ rải rác",
    "Light rain": "Mưa nhẹ",
    "Moderate rain at times": "Mưa vừa từng lúc",
    "Moderate rain": "Mưa vừa",
    "Heavy rain at times": "Mưa to từng lúc",
    "Heavy rain": "Mưa to",
    "Light freezing rain": "Mưa đóng băng nhẹ",
    "Moderate or heavy freezing rain": "Mưa đóng băng vừa hoặc nặng",
    "Light sleet": "Mưa tuyết nhẹ",
    "Moderate or heavy sleet": "Mưa tuyết vừa hoặc nặng",
    "Patchy light snow": "Tuyết nhẹ rải rác",
    "Light snow": "Tuyết nhẹ",
    "Patchy moderate snow": "Tuyết vừa rải rác",
    "Moderate snow": "Tuyết vừa",
    "Patchy heavy snow": "Tuyết dày rải rác",
    "Heavy snow": "Tuyết dày",
    "Ice pellets": "Mưa đá",
    "Light rain shower": "Mưa rào nhẹ",
    "Moderate or heavy rain shower": "Mưa rào vừa hoặc nặng",
    "Torrential rain shower": "Mưa xối xả",
    "Light sleet showers": "Mưa tuyết nhẹ",
    "Moderate or heavy sleet showers": "Mưa tuyết vừa hoặc nặng",
    "Light snow showers": "Tuyết rơi nhẹ",
    "Moderate or heavy snow showers": "Tuyết rơi vừa hoặc nặng",
    "Light showers of ice pellets": "Mưa đá nhẹ",
    "Moderate or heavy showers of ice pellets": "Mưa đá vừa hoặc nặng",
    "Patchy light rain with thunder": "Mưa nhẹ rải rác kèm sấm sét",
    "Moderate or heavy rain with thunder": "Mưa vừa hoặc to kèm sấm sét",
    "Patchy light snow with thunder": "Tuyết nhẹ rải rác kèm sấm sét",
    "Moderate or heavy snow with thunder": "Tuyết vừa hoặc dày kèm sấm sét",
    "Thundery outbreaks in nearby": "Có giông sét gần khu vực",
  };

  return translations[text] || text;
};

const translateForecastText = (text, maxTemp) => {
  return `Trời sẽ ${translateCondition(text).toLowerCase()}. Nhiệt độ cao nhất trong ngày là ${maxTemp}°C.`;
};

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = "f5ac4be4a19c47d8a3e42522222112";

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  }, [city]);

  if (!weather) return <div className="text-sm text-gray-500">Đang tải thời tiết...</div>;

  const {
    temp_c,
    feelslike_c,
    condition,
    wind_kph,
    humidity,
    pressure_mb,
    vis_km,
  } = weather.current;

  const { name, region, country } = weather.location;
  const forecast = weather.forecast?.forecastday?.[0]?.day;

  return (
    <div className="grid lg:grid-cols-[1fr_auto] gap-4 w-full full-w mx-auto items-start">
      {/* Khối trái to - Thời tiết chính */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_0_37px_rgba(0,0,0,0.1)] w-full">
        <div className="text-sm text-gray-500 mb-1">Thời tiết hôm nay</div>
        <div className="text-lg font-bold mb-4">
          {name}{region ? `, ${region}` : ''}, {country}
        </div>

        {/* Icon + Nhiệt độ + Trạng thái */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={condition.icon.replace('64x64', '128x128')}
            alt={condition.text}
            className="w-20 h-20 object-contain"
          />
          <div className="text-5xl font-bold">{temp_c}°C</div>

          <div className="flex flex-col text-sm text-gray-600">
            <div className="font-semibold">{translateCondition(condition.text)}</div>
            <div className="text-gray-500">Cảm giác như {feelslike_c}°</div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {translateForecastText(condition.text, forecast?.maxtemp_c || temp_c)}
        </div>
      </div>

      {/* Khối phải - 4 chỉ số */}
      <div className="grid grid-cols-2 gap-5 min-w-[500px] max-w-[300px] w-full">
        <WeatherStatCard icon={<Wind size={20} />} label="Gió" value={`${wind_kph} km/h`} />
        <WeatherStatCard icon={<Droplets size={20} />} label="Độ ẩm" value={`${humidity}%`} />
        <WeatherStatCard icon={<Gauge size={20} />} label="Áp suất" value={`${pressure_mb} mb`} />
        <WeatherStatCard icon={<Eye size={20} />} label="Tầm nhìn" value={`${vis_km} km`} />
      </div>
    </div>
  );
};

export default WeatherWidget;
