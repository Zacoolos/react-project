import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState({ q: "Veni Vidi Vici", a: "Caesar" });

  useEffect(() => {
    fetch("/api/random")
      .then(res => res.json())
      .then(data => setQuote(data[0]))
      .catch(error => {
        console.error("Error fetching quote:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Header */}
      <div className="bg-gray-800 bg-opacity-60 w-full h-16 flex items-center justify-center mt-10">
        <h1 className="text-center text-4xl font-bold bg-gradient-to-tr from-blue-400 via-purple-300 bg-clip-text text-transparent">
          - Quote of the Day! -
        </h1>
      </div>

      {/* Augustus Quote */}
      <p className="font-sans text-[20px] text-center mt-4 bg-gradient-to-tr from-orange-900 via-yellow-300 to-white bg-clip-text text-transparent">
        "Make haste slowly" - Augustus
      </p>

      {/* API Quote */}
      <h2 className="font-sans text-[20px] text-center mt-4 bg-gradient-to-tr from-amber-700 via-yellow-300 to-white bg-clip-text text-transparent">
        {loading ? "Loading..." : `"${quote.q}" - ${quote.a}`}
      </h2>

      {/* Image */}
      <img
        src="Files/Augustus_Image.png"
        className="w-[500px] h-[690px] float-right mt-4"
        alt="Augustus Image"
      />
    </div>
  );
}
