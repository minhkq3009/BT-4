import React, { useState, useEffect } from 'react';
import WeatherWidget from '../components/WeatherWidget';
import WeatherOverview from '../components/WeatherOverview';
import CitySearch from '../components/CitySearch';

const Weather = () => {
  const [city, setCity]=useState('hanoi');
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-5">
      <CitySearch city={city} onChange={setCity}/>
      <WeatherWidget city={city} />
      <WeatherOverview city={city}/>
    </div>
  );
};

export default Weather;
