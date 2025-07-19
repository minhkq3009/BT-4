import React from "react";
import clsx from "clsx";

const DayCards = ({ days, selectedDate, onSelect, selectedMetric, onDoubleClick }) => {
  const getUVLevel = (uv) => {
    if (uv >= 8) return "Rất cao";
    if (uv >= 6) return "Cao";
    if (uv >= 3) return "Vừa phải";
    return "Thấp";
  };

  const getUVColor = (uv) => {
    if (uv >= 10) return "bg-red-500";
    if (uv >= 8) return "bg-orange-400";
    if (uv >= 6) return "bg-yellow-300";
    return "bg-green-500";
  };

  return (
    <div className="flex overflow-x-auto gap-3 sm:grid sm:grid-cols-7 sm:gap-2 scrollbar-hide">
      {days.map((day) => {
        const isSelected = day.date === selectedDate;
        const cardClass = clsx(
          "rounded-xl p-3 cursor-pointer transition-all text-gray-800 min-w-[140px] sm:min-w-0",
          isSelected ? "border-2 border-blue-500 bg-white shadow" : "bg-[#eef5fc]"
        );

        return (
          <div 
          key={day.date} 
          className={cardClass} 
          onClick={() => onSelect(day.date)}
          onDoubleClick={()=>onDoubleClick(day)}
          >
            {/* Ngày + Nhãn */}
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{new Date(day.date).getDate()}</span>
              <span>{day.label}</span>
            </div>

            {/* === NHIỆT ĐỘ === */}
            {selectedMetric === "Nhiệt độ" && (
              <>
                {/* Icon + nhiệt độ */}
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={`https:${day.icon}`}
                    alt="weather icon"
                    className="w-16 h-16"
                  />
                  <div className="flex flex-col leading-tight items-start">
                    <span className="text-xl font-semibold text-gray-800">
                      {day.max.toFixed(0)}°
                    </span>
                    <span className="text-sm text-gray-500">
                      {day.min.toFixed(0)}°
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* === ĐỘ ẨM === */}
            {selectedMetric === "Độ ẩm" && (
              <div className="flex justify-between items-end mt-6">
                <div>
                  <div className="text-xl font-semibold text-black">{day.humidityMax}%</div>
                  <div className="text-sm text-gray-500">{day.humidityMin}%</div>
                </div>
                <div className="h-16 w-4 bg-gray-200 rounded-full relative overflow-hidden flex items-end">
                  <div
                    className="w-full rounded-full bg-cyan-400"
                    style={{
                      height: `${day.humidityMax}%`,
                      minHeight: "20%",
                    }}
                  />
                </div>
              </div>
            )}

            {/* === TIA UV === */}
            {selectedMetric === "Tia UV" && (
              <div className="flex justify-between items-end mt-6">
                <div>
                  <div className="text-xl font-semibold text-black">{day.uv}</div>
                  <div className="text-sm text-gray-600">{getUVLevel(day.uv)}</div>
                </div>
                <div className="h-16 w-4 bg-gray-200 rounded-full relative overflow-hidden flex items-end">
                  <div
                    className={clsx("w-full rounded-t-full", getUVColor(day.uv))}
                    style={{
                      height: `${(day.uv / 11) * 100}%`,
                      minHeight: "20%",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DayCards;
