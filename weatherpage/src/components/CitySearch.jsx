import React, { useState, useEffect } from "react";

// ✅ Lấy API key từ environment variable
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const CitySearch = ({ city, onChange }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // 🎯 Gợi ý địa điểm khi gõ
  useEffect(() => {
    if (!isTyping || input.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setShowDropdown(true);
        })
        .catch(() => setSuggestions([]));
    }, 300); // debounce 300ms

    return () => clearTimeout(timer);
  }, [input, isTyping]);

  const handleSelect = (location) => {
    setInput(`${location.name}, ${location.country}`);
    setSuggestions([]);
    setShowDropdown(false);
    setIsTyping(false);
    onChange(location.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setIsTyping(false);
      onChange(input.trim());
    }
  };

  return (
    <div className="relative w-full full-w mx-auto">
      <form onSubmit={handleSubmit} className="p-2 shadow-lg bg-white rounded-xl flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsTyping(true);
          }}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập tên thành phố hoặc quốc gia..."
          onFocus={() => input.length >= 2 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
        >
          Tìm
        </button>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((loc) => (
            <li
              key={loc.id}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => handleSelect(loc)}
            >
              {loc.name}, {loc.region && `${loc.region}, `}{loc.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;