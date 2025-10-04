"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const activities = [
  {
    id: 1,
    title: "Plant a Tree",
    description: "Contribute to a greener planet.",
    image: "/image/tree.png",
    link: "/plant-tree",
  },
  {
    id: 2,
    title: "Reduce Plastic",
    description: "Minimize plastic usage.",
    image: "/image/plastic.png",
    link: "/reduce-plastic",
  },
  {
    id: 3,
    title: "Clean Energy",
    description: "Adopt clean energy solutions.",
    image: "/image/energy.png",
    link: "https://www.cleanenergy.com",
  },
  {
    id: 4,
    title: "Recycle",
    description: "Recycle and reuse materials.",
    image: "/image/recycle.png",
    link: "/recycle",
  },
  {
    id: 5,
    title: "Eco Travel",
    description: "Travel sustainably.",
    image: "/image/travel.png",
    link: "/eco-travel",
  },
];

export default function ActivityCarousel() {
  const [cards, setCards] = useState([...activities, ...activities]); // duplicate for loop effect

  return (
    <section className="py-20 bg-gray-100 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-12">Activities</h2>

      {/* Horizontal scroll container */}
      <motion.div
        className="flex overflow-x-auto space-x-6 px-6 py-4 snap-x snap-mandatory scrollbar-hide w-full"
        whileTap={{ cursor: "grabbing" }}
      >
        {cards.map((activity, index) => (
          <motion.div
            key={`${activity.id}-${index}`} // use index to avoid duplicate key error
            className="snap-center flex-shrink-0 w-72 md:w-80 lg:w-96 bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text + Button */}
            <div className="p-6 flex flex-col justify-between h-44">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>

              {/* Button */}
              <div className="mt-4 flex justify-end">
                <a
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
