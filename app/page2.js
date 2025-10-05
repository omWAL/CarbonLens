"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2015", ppm: 401.01, reason: "Baseline fossil-fuel rise" },
  { year: "2016", ppm: 404.41, reason: "Strong El Niño reduced sinks + fires" },
  { year: "2017", ppm: 406.76, reason: "Continued high emissions" },
  { year: "2018", ppm: 408.72, reason: "Persistent fossil emissions" },
  { year: "2019", ppm: 411.65, reason: "Wildfires + weakened land sinks" },
  { year: "2020", ppm: 414.21, reason: "COVID slowdown didn’t stop CO₂ rise" },
  { year: "2021", ppm: 416.41, reason: "Emissions rebound, weak sinks" },
  { year: "2022", ppm: 418.53, reason: "Normal variability, steady growth" },
  { year: "2023", ppm: 421.08, reason: "Heat + fires, El Niño onset" },
  { year: "2024", ppm: 424.61, reason: "Record spike, El Niño + wildfires" },
];

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          CO₂ Spikes in the Atmosphere (2015 - 2024)
        </h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" />
            <YAxis
              label={{ value: ".   ppm", angle: 90, position: "insideLeft" }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { year, ppm, reason } = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200">
                      <p className="font-semibold text-gray-800">{year}</p>
                      <p className="text-gray-600">CO₂: {ppm} ppm</p>
                      <p className="text-gray-500 text-sm">{reason}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="ppm"
              stroke="#2563eb"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
