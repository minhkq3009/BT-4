import React, { useState, useEffect } from "react";

const WeatherHourAccordion = ({ data, onClose }) => {
  const now = new Date();
  const currentHour = now.getHours();
  const todayStr = now.toLocaleDateString("en-CA"); // 2025-07-17
  const isToday = data.date === todayStr;

  const [expandedIndex, setExpandedIndex] = useState(null);

  // Lọc giờ chưa qua nếu là hôm nay
  const filteredHours = data.hour.filter((h) => {
    const hour = new Date(h.time).getHours();
    return !isToday || hour >= currentHour;
  });

  useEffect(() => {
    // Tự động mở khối của giờ hiện tại
    if (isToday) {
      const current = filteredHours.findIndex((h) => new Date(h.time).getHours() === currentHour);
      setExpandedIndex(current >= 0 ? current : null);
    }
  }, [data.date]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Thời tiết chi tiết - {data.date}</h2>
          <button onClick={onClose} className="text-red-500 hover:underline">Đóng</button>
        </div>

        <div className="space-y-4">
          {filteredHours.map((h, idx) => {
            const isOpen = idx === expandedIndex;
            const hourStr = h.time.split(" ")[1];

            return (
              <div key={idx} className="border rounded-xl shadow-sm bg-white overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-left hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-700">{hourStr}</span>
                    <img src={h.condition.icon} className="w-6 h-6" alt={h.condition.text} />
                  </div>

                  {/* Header collapsed - chính xác, thẳng hàng */}
                    <div className="grid grid-cols-6 gap-4 items-center w-full px-5 py-3 text-sm text-gray-800">
                      {/* <div className="font-semibold text-blue-700">{hourStr}</div> */}
                      <div className="flex items-center gap-1">
                        {/* <img src={h.condition.icon} className="w-5 h-5" alt="" /> */}
                      </div>
                      <div className="flex items-center gap-1">
                        <span role="img">🌡️</span> {h.temp_c}°C
                      </div>
                      <div className="flex items-center gap-1">
                        <span role="img">💧</span> {h.humidity}%
                      </div>
                      <div className="flex items-center gap-1">
                        <span role="img">🔆</span> UV: {h.uv}
                      </div>
                      <div className="flex items-center gap-1 justify-between">
                        <span>💨 {h.wind_kph} km/h</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400">{isOpen ? "▲" : "▼"}</span>
                      </div>
                    </div>
                </button>

                {/* Expand */}
                {isOpen && (
                  <div className="bg-gray-50 px-6 py-4 text-sm text-gray-700 grid grid-cols-2 md:grid-cols-3 gap-3 border-t">
                    <div>🌫️ Tầm nhìn: {h.vis_km} km</div>
                    <div>🌬️ Gió mạnh: {h.gust_kph} km/h</div>
                    <div>☁️ Mây: {h.cloud}%</div>
                    <div>📊 Áp suất: {h.pressure_mb} mb</div>
                    <div>🌡️ Điểm sương: {h.dewpoint_c ?? "--"}°C</div>
                    <div>🌥️ {h.condition.text}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherHourAccordion;
