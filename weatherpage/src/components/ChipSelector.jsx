import React from "react";

const options = ["Nhiệt độ", "Độ ẩm", "Tia UV"];

const ChipSelector = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1 rounded-full border text-sm whitespace-nowrap
            ${selected === opt ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default ChipSelector;
