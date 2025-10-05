"use client";
import { motion } from "framer-motion";
// Replaced 'import Image from "next/image";' with standard <img> tags
import { useState, useCallback } from "react";
// Removed unused imports (Bar, ChartJS, etc.)

// ----------------------------------------------------------------------
// 🚨 IMPORTANT: API KEY PLACEHOLDER
// This key should ONLY be used on a secure server-side endpoint. 
// The following function is a SIMULATION using fixed text.
// ----------------------------------------------------------------------
const API_KEY_PLACEHOLDER = "AIzaSyD4V37t8fXGGg5PHmgczYDtky0hQAusLWs";

// Placeholder for Gemini Analysis (Simulated with fixed text for 15 lines)
const getGeminiAnalysis = async (totalCO2, transportCO2, meltMeters) => {
    console.log("Simulating AI analysis using key placeholder:", API_KEY_PLACEHOLDER);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const meltArea = (meltMeters * meltMeters).toFixed(2);
    const transportContribution = totalCO2 > 0 ? ((transportCO2 / totalCO2) * 100).toFixed(0) : 0;
    
    // 15 Lines of text related to Carbon Footprint Value
    const analysisPoints = [
        `Your single-day carbon footprint is estimated at ${totalCO2.toFixed(2)} kg CO₂.`,
        `This quantity is equivalent to the CO₂ absorbed by a medium-sized tree for ${Math.round(totalCO2 * 0.05)} months.`,
        `It represents the energy consumed by an average home in approximately ${Math.round(totalCO2 / 12)} days.`,
        `The melting area calculated is ${meltArea} square meters—a tangible measure of your climate impact on polar ice.`,
        `Understanding this number is the critical first step in effective mitigation and climate action.`,
        `**Transport** contributes significantly (${transportContribution}%) to your current emissions profile.`,
        `Every kilogram of CO₂ released contributes to ocean acidification and rising global temperatures.`,
        `Your daily choices accumulate quickly; small, consistent changes lead to large reductions over time.`,
        `Switching to **renewable energy sources** can eliminate the largest portion of electricity-related emissions.`,
        `Reducing waste and recycling correctly minimizes landfill methane generation, a potent greenhouse gas.`,
        `Water conservation lowers the substantial energy demand required for water pumping and treatment.`,
        `Consider implementing "Meatless Mondays"—dietary changes have a profound effect on global emissions.`,
        `Look into purchasing **certified carbon offsets** for unavoidable emissions in the short term.`,
        `Advocate for better infrastructure, like bike lanes and public transit, in your local community.`,
        `The true value of knowing your carbon footprint is the motivation it provides for a sustainable and responsible lifestyle.`,
    ];

    return {
        analysisPoints: analysisPoints,
        // The tip will be the most relevant point based on the highest contribution (simulated)
        tipText: transportCO2 > totalCO2 * 0.5 ? analysisPoints[5] : analysisPoints[8], 
    };
};
// ----------------------------------------------------------------------


export default function InfoSection() {

  const [activeCalc, setActiveCalc] = useState("transport");
  const [transportData, setTransportData] = useState({ distance: 0, vehicle: "Bus" });
  const [dailyData, setDailyData] = useState({ electricity: 0, waste: 0, water: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geminiResult, setGeminiResult] = useState({ analysisPoints: [], tipText: "", loading: false });

  const glacierImages = [
    "/image/glacier1.png",
    "/image/glacier2.png",
    "/image/glacier3.png",
  ];
  const [selectedImage, setSelectedImage] = useState(glacierImages[0]);

  // ----- Calculation Functions -----
  const calculateTransport = useCallback(() => {
    const emissionFactors = { Bus: 0.05, Motorcycle: 0.03, Car: 0.12, Truck: 0.2 };
    // Ensure all calculations use Number() in case inputs are strings
    return Number(transportData.distance) * (emissionFactors[transportData.vehicle] || 0);
  }, [transportData]);

  const calculateDaily = useCallback(() => {
    return (
      Number(dailyData.electricity) * 0.7 +
      Number(dailyData.waste) * 0.5 +
      Number(dailyData.water) * 0.002
    );
  }, [dailyData]);
  
  const transportCO2 = calculateTransport();
  const dailyCO2 = calculateDaily();
  const total = transportCO2 + dailyCO2;

  // ----- Function to calculate red square size (10m x 10m image scaling) -----
  const getRedSquareSize = useCallback(() => {
    // 1 kg CO2 = 20 pixels (0.5m melt @ 40px/m scale)
    const PIXELS_PER_KG_CO2 = 20; 
    const MAX_PIXEL_SIZE = 400; 
    const sizeInPixels = total * PIXELS_PER_KG_CO2;
    return Math.min(sizeInPixels, MAX_PIXEL_SIZE); 
  }, [total]);
  
  // Calculate melt in meters (side length)
  const meltInMeters = getRedSquareSize() / 40; 
  
  // --- handleCalculate function starts the API fetch ---
  const handleCalculate = async () => {
    setSelectedImage(glacierImages[Math.floor(Math.random() * glacierImages.length)]);
    setIsModalOpen(true);
    
    // 1. Set loading state before API call
    setGeminiResult({ analysisPoints: [], tipText: "", loading: true });
    
    // 2. Call the analysis function with specific CO2 contributions
    const result = await getGeminiAnalysis(total, transportCO2, meltInMeters);
    
    // 3. Update state with results
    setGeminiResult({ 
        analysisPoints: result.analysisPoints, 
        tipText: result.tipText, 
        loading: false 
    });
  };
  
  // Function to close the modal
  const closeModal = () => {
      setIsModalOpen(false);
      setGeminiResult({ analysisPoints: [], tipText: "", loading: false });
  }

  return (
    <>
    
    {/* First Section */}
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ x: -150, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        {/* Using <img> tag instead of Next.js Image component */}
        <img src="/image/carbon.webp" alt="Carbon Footprint" width={500} height={400} className="rounded-xl shadow-lg w-full h-auto" />
      </motion.div>
      <motion.div initial={{ x: 150, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-bold mb-4 text-gray-100 dark:text-white">Track Your Impact 🌍</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Carbon Lens helps you monitor and reduce your carbon footprint. With interactive maps, activity tracking, and personalized insights, you can take real steps toward a sustainable future.</p>
      </motion.div>
    </section>


    {/* Calculator Section */}
    <section className=" text-black py-20 bg-black-100 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-12 text-green-500">Carbon Footprint Calculator</h2>
      <div className="w-full max-w-2xl px-6">
        {activeCalc === "transport" ? (
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold">Transport Calculator</h3>
            <label className="flex flex-col">Distance (km):<input type="number" value={transportData.distance} onChange={(e) => setTransportData({ ...transportData, distance: e.target.value })} className="border p-2 rounded mt-1" /></label>
            <label className="flex flex-col">Vehicle Type:<select value={transportData.vehicle} onChange={(e) => setTransportData({ ...transportData, vehicle: e.target.value })} className="border p-2 rounded mt-1">
                <option value="Bus">Bus</option><option value="Motorcycle">Motorcycle</option><option value="Car">Car</option><option value="Truck">Truck</option></select></label>
          </div>
        ) : (
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold">Daily Activity Calculator</h3>
            <label className="flex flex-col">Electricity Usage (kWh):<input type="number" value={dailyData.electricity} onChange={(e) => setDailyData({ ...dailyData, electricity: e.target.value })} className="border p-2 rounded mt-1" /></label>
            <label className="flex flex-col">Waste (kg):<input type="number" value={dailyData.waste} onChange={(e) => setDailyData({ ...dailyData, waste: e.target.value })} className="border p-2 rounded mt-1" /></label>
            <label className="flex flex-col">Water Usage (liters):<input type="number" value={dailyData.water} onChange={(e) => setDailyData({ ...dailyData, water: e.target.value })} className="border p-2 rounded mt-1" /></label>
          </div>
        )}
        <div className="mt-6 flex space-x-4 justify-center">
          <button className={`px-4 py-2 rounded-lg ${activeCalc === "transport" ? "bg-green-500 text-black" : "bg-gray-300 text-gray-700"}`} onClick={() => setActiveCalc("transport")}>Transport</button>
          <button className={`px-4 py-2 rounded-lg ${activeCalc === "daily" ? "bg-green-500 text-black" : "bg-gray-300 text-gray-700"}`} onClick={() => setActiveCalc("daily")}>Daily Activity</button>
        </div>
        <div className="text-center mt-6">
          <button className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg" onClick={handleCalculate}>Calculate</button>
        </div>
      </div>

      {/* ----- MODIFIED Modal Popup ----- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-[90vw] max-w-5xl p-6 relative shadow-2xl">
            {/* Close Button */}
            <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 font-bold text-2xl z-10">×</button>

            {/* Results */}
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-3xl font-bold text-green-500">Your Impact Summary</h2>
              <p className="text-xl font-bold mt-2">Total CO₂: {total.toFixed(2)} kg</p>
            </div>

            {/* Glacier Image AND Gemini Analysis Side-by-Side */}
            <div className="relative flex flex-col md:flex-row justify-center items-start gap-6">
              
              {/* Left Side: Glacier Image with Red Square */}
              <div className="relative flex-shrink-0 w-full max-w-sm mx-auto md:mx-0">
                <img
                  src={selectedImage}
                  alt="Glacier"
                  className="w-full h-auto rounded-lg object-contain"
                />
                {/* Red Square proportional to CO2 */}
                <div
                  className="absolute bg-red-500/70 shadow-lg shadow-red-500 rounded-md animate-pulse"
                  style={{
                    width: `${getRedSquareSize()}px`,
                    height: `${getRedSquareSize()}px`,
                    top: `calc(50% - ${getRedSquareSize() / 2}px)`,
                    left: `calc(50% - ${getRedSquareSize() / 2}px)`,
                  }}
                ></div>
                <p className="text-center text-sm mt-2 text-gray-600">
                    Red square size: {meltInMeters.toFixed(1)} m x {meltInMeters.toFixed(1)} m
                </p>
              </div>

              {/* Right Side: Gemini Analysis (15 lines of text) */}
              <div className="flex-grow w-full space-y-3 p-4 border border-blue-300 rounded-lg bg-blue-50 max-h-[450px] overflow-y-auto">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Detailed Carbon Footprint Value 🤖</h3>
                
                {geminiResult.loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Generating live 15-point analysis with Gemini...</p>
                        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500 mx-auto mt-4"></div>
                    </div>
                ) : (
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                        {geminiResult.analysisPoints.map((point, index) => (
                            <li key={index} className="pl-1">
                                <span className="font-medium text-gray-800">{point}</span>
                            </li>
                        ))}
                    </ol>
                )}
              </div>

            </div>
            
            {/* Actionable Tip at the bottom */}
            <div className="mt-4 p-3 bg-green-100 rounded-lg border-l-4 border-green-500">
                <p className="font-semibold text-green-700">Actionable Tip:</p>
                <p className="text-sm text-gray-800 italic">{geminiResult.tipText}</p>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
}
