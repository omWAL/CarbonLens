'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamic import to avoid SSR issues
const MapContainerClient = dynamic(() => import('./MapContainerClient'), {
  ssr: false,
});

export default function MapView() {
  const [selectedDate, setSelectedDate] = useState('2025-10-01');

  // Hardcoded data for two dates
  const dataByDate = {
    '2025-10-01': [
      { location: 'Nashik', latitude: 20.003423, longitude: 73.792962, date: '2025-10-01', avg_carbon_dioxide_ppm: 440.92 },
      { location: 'Mumbai', latitude: 19.070867, longitude: 72.876342, date: '2025-10-01', avg_carbon_dioxide_ppm: 444.79 },
      { location: 'Pune', latitude: 18.52175, longitude: 73.874065, date: '2025-10-01', avg_carbon_dioxide_ppm: 440.21 },
    ],
    '2025-10-02': [
      { location: 'Nashik', latitude: 20.003423, longitude: 73.792962, date: '2025-10-02', avg_carbon_dioxide_ppm: 441.5 },
      { location: 'Mumbai', latitude: 19.070867, longitude: 72.876342, date: '2025-10-02', avg_carbon_dioxide_ppm: 445.1 },
      { location: 'Pune', latitude: 18.52175, longitude: 73.874065, date: '2025-10-02', avg_carbon_dioxide_ppm: 441.0 },
    ],
  };

  const locations = dataByDate[selectedDate] || [];

  return (
    <div className="flex flex-col items-center mt-6">
      {/* Date selector */}
      <div className="mb-4 ">
        <label htmlFor="date" className="mr-2 font-semibold">Select Date:</label>
        <select
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded shadow-sm"
        >
          <option className='text-black' value="2025-10-01">2025-10-01</option>
          <option className='text-black' value="2025-10-02">2025-10-02</option>
        </select>
      </div>

      {/* Map */}
      <MapContainerClient locations={locations} />
    </div>
  );
}
