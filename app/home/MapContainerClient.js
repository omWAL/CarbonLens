'use client';

import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapContainerClient({ locations }) {
  return (
    <MapContainer
      center={[19.5, 73.5]}
      zoom={7}
      style={{ height: '70vh', width: '80vw', margin: 'auto' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, i) => (
        <Circle
          key={i}
          center={[loc.latitude, loc.longitude]}
          radius={20000}
          pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.5 }}
        >
          <Popup>
            <strong>{loc.location}</strong>
            <br />
            Date: {loc.date}
            <br />
            CO₂ Level: {loc.avg_carbon_dioxide_ppm.toFixed(2)} ppm
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
