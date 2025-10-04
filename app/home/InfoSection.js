"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Bar } from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const vehicleFactors = {
  Bus: 0.089,
  Motorcycle: 0.1,
  Car: 0.192,
  Truck: 0.25,
};


 

export default function InfoSection() {

 const [activeCalc, setActiveCalc] = useState("transport");
  const [transportData, setTransportData] = useState({ distance: 0, vehicle: "Car" });
  const [dailyData, setDailyData] = useState({ electricity: 0, waste: 0, water: 0 });

  // Transport CO2
  const calculateTransport = () => {
    const factor = vehicleFactors[transportData.vehicle];
    const result = transportData.distance * factor;
    return result.toFixed(2);
  };

  // Daily CO2
  const calculateDaily = () => {
    const result = dailyData.electricity * 0.5 + dailyData.waste * 0.3 + dailyData.water * 0.2;
    return result.toFixed(2);
  };

  // Graph data
  const graphData =
    activeCalc === "transport"
      ? {
          labels: ["CO2 Emission"],
          datasets: [
            {
              label: "Carbon Footprint (kg CO2)",
              data: [calculateTransport()],
              backgroundColor: "rgba(34,197,94,0.7)",
            },
          ],
        }
      : {
          labels: ["CO2 Emission"],
          datasets: [
            {
              label: "Carbon Footprint (kg CO2)",
              data: [calculateDaily()],
              backgroundColor: "rgba(34,197,94,0.7)",
            },
          ],
        };

  // Total CO2
  const total = activeCalc === "transport" ? calculateTransport() : calculateDaily();


  return (
    <>
    

    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      
      {/* Left: Image with animation */}
      <motion.div
        initial={{ x: -150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Image
          src="/image/carbon.webp" // put an image in public/ folder
          alt="Carbon Footprint"
          width={500}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </motion.div>

      {/* Right: Text with animation */}
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4 text-gray-100 dark:text-white">
          Track Your Impact 🌍
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Carbon Lens helps you monitor and reduce your carbon footprint.  
          With interactive maps, activity tracking, and personalized insights,  
          you can take real steps toward a sustainable future.
        </p>
      </motion.div>
   
   
   
   
    </section>

         <section id="carbon-footprint" className="py-20 bg-black-100 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-12 text-green-500" >Carbon Footprint Calculator</h2>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-12 px-6">
        {/* Left: Calculator */}
        <div className="lg:w-1/2 text-black bg-white rounded-xl shadow-lg p-6 space-y-6">
          {activeCalc === "transport" ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Transport Calculator</h3>
              <label className="flex flex-col">
                Distance (km):
                <input
                  type="number"
                  value={transportData.distance}
                  onChange={(e) =>
                    setTransportData({ ...transportData, distance: e.target.value })
                  }
                  className="border p-2 rounded mt-1"
                />
              </label>
              <label className="flex flex-col">
                Vehicle Type:
                <select
                  value={transportData.vehicle}
                  onChange={(e) =>
                    setTransportData({ ...transportData, vehicle: e.target.value })
                  }
                  className="border p-2 rounded mt-1"
                >
                  <option value="Bus">Bus</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                </select>
              </label>
              <p className="font-semibold mt-4">
                Estimated CO2 Emission: {calculateTransport()} kg
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Daily Activity Calculator</h3>
              <label className="flex flex-col">
                Electricity Usage (kWh):
                <input
                  type="number"
                  value={dailyData.electricity}
                  onChange={(e) =>
                    setDailyData({ ...dailyData, electricity: e.target.value })
                  }
                  className="border p-2 rounded mt-1"
                />
              </label>
              <label className="flex flex-col">
                Waste (kg):
                <input
                  type="number"
                  value={dailyData.waste}
                  onChange={(e) =>
                    setDailyData({ ...dailyData, waste: e.target.value })
                  }
                  className="border p-2 rounded mt-1"
                />
              </label>
              <label className="flex flex-col">
                Water Usage (liters):
                <input
                  type="number"
                  value={dailyData.water}
                  onChange={(e) =>
                    setDailyData({ ...dailyData, water: e.target.value })
                  }
                  className="border p-2 rounded mt-1"
                />
              </label>
              <p className="font-semibold mt-4">Estimated CO2 Emission: {calculateDaily()} kg</p>
            </div>
          )}

          {/* Switch calculators */}
          <div className="mt-6 flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeCalc === "transport" ? "bg-green-500 text-black" : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setActiveCalc("transport")}
            >
              Transport
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeCalc === "daily" ? "bg-green-500 text-black" : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setActiveCalc("daily")}
            >
              Daily Activity
            </button>
          </div>
        </div>

        {/* Right: Graph */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <Bar
            data={graphData}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
          {/* Total CO2 at bottom */}
          <p className="mt-4 text-black text-lg font-semibold text-center">Total CO2: {total} kg</p>
        </div>
      </div>
    </section>
    </>
  );
}
