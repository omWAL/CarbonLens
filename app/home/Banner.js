"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="h-screen bg-gradient-to-r from-gray-950 via-black to-gray-900 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Measure. Track.  
            <span className="text-green-400"> Reduce Carbon</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Carbon Lens helps you monitor your footprint and build  
            a more sustainable lifestyle. Visualize your impact  
            and take steps toward a greener future 🌍.
          </p>
          <div className="flex space-x-4">
            <motion.a
              href="#carbon-footprint"
              className="px-6 py-3 bg-green-500 text-black font-semibold rounded-xl shadow-lg hover:bg-green-400 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="#map"
              className="px-6 py-3 border border-gray-500 text-white font-semibold rounded-xl hover:bg-gray-800 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center"
        >
          <Image
            src="/image/earth.jpg" // put an image in /public folder
            alt="Eco Friendly"
            width={500}
            height={500}
            className="drop-shadow-2xl rounded-xl"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}