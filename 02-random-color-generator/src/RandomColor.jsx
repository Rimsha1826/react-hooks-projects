import { useState } from "react";

function RandomColor() {
  const [color, setColor] = useState("#ffffff");
  const [colorType, setColorType] = useState("hex");

  function generateHexColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColor(`#${hex}`);
    setColorType("hex");
  }

  function generateRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`rgb(${r}, ${g}, ${b})`);
    setColorType("rgb");
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center transition-all duration-500"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
        Random Color Generator
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={generateHexColor}
          className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg"
        >
          Generate HEX
        </button>
        <button
          onClick={generateRGBColor}
          className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg"
        >
          Generate RGB
        </button>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 text-center">
        <p className="text-white text-sm mb-1 uppercase tracking-widest">
          {colorType} color
        </p>
        <p className="text-white text-3xl font-bold drop-shadow">
          {color}
        </p>
      </div>
    </div>
  );
}

export default RandomColor;