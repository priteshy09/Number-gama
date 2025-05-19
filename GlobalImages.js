import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  {
    title: "Eiffel Tower",
    category: "Cities",
    src: "https://source.unsplash.com/featured/?eiffeltower",
  },
  {
    title: "Mountains",
    category: "Nature",
    src: "https://source.unsplash.com/featured/?mountains",
  },
  {
    title: "New York",
    category: "Cities",
    src: "https://source.unsplash.com/featured/?newyork",
  },
  {
    title: "AI Art Lion",
    category: "AI",
    src: "https://source.unsplash.com/featured/?lion,ai",
  },
  {
    title: "Taj Mahal",
    category: "Monuments",
    src: "https://source.unsplash.com/featured/?tajmahal",
  },
];

export default function GlobalImages() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = images.filter(
    (img) =>
      (filter === "All" || img.category === filter) &&
      img.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Duniya Ki Tasveerein
      </h1>
      <input
        type="text"
        placeholder="Search images..."
        className="mb-4 w-full p-2 rounded border"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "Nature", "Cities", "Monuments", "AI"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1 rounded-full ${
              filter === cat ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2 text-center font-semibold">{img.title}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
