import { useState, useEffect } from 'react';
import CursorTracker from './CursorTracker';
import ScrollImage from './ImageAnimation';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState({ q: "Veni Vidi Vici", a: "Caesar" });
  const [date, setDate] = useState(new Date());
  const [ran, setRan] = useState(false);
  const [dayPassed, setDayPassed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [translateY, setTranslateY] = useState(scrollY * 0.5);


  useEffect(() => {
    if (!ran) return;
    fetch("/api/random")
      .then(res => res.json())
      .then(data => setQuote(data[0]))

      .catch(error => {
        console.error("Error fetching quote:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log("counter");
    setRan(true);
  }, [ran]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Add three days to the current date
      const newDate = new Date();
      setDate(newDate);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (date.getHours() === 17 && date.getMinutes() === 7 && !dayPassed) {
      fetch("/api/random")
        .then(res => res.json())
        .then(data => setQuote(data[0]))
        .catch(error => {
          console.error("Error fetching quote:", error);
        })
        .finally(() => {
          setLoading(false);
        });
      setDayPassed(true);
    }
  }, [date]); // Runs once at 5:01 PM


  useEffect(() => {
    const handleScroll = () => {
      setTranslateY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  return (

    <body className="bg-black text-white h-full overflow-y-auto w-full font-sans">
      <div className="bg-black text-white min-h-[9000px] w-full p-4">

        <p className="fixed top-2 right-2 text-lg text-white">{date.toLocaleString()}</p>

        {/* Header */}
        <div className="bg-gray-800 bg-opacity-60 w-full h-16 flex items-center justify-center mt-10">
          <h1 className="text-center text-4xl font-bold bg-gradient-to-tr from-blue-400 via-purple-300 bg-clip-text text-transparent">
            - Quote of the Day! -
          </h1>
        </div>

        {/* API Quote */}
        <p style={{ transform: `translateY(${translateY * 1}px)` }} className="font-bold text-[20px] text-center mt-4 bg-gradient-to-tr from-amber-700 via-yellow-300 to-white bg-clip-text text-transparent transition-transform duration-50 ease-in-out">
          {loading ?
            quote.q === `"Too many requests. Obtain an auth key for unlimited access."`
              ? "Hold on" : "Loading..."
            : `"${quote.q}" - ${quote.a}`
          }
        </p>
        <CursorTracker />
        {/* Image */}
        <img
          src="Files/Augustus_Image.png"
          style={{ transform: `translateY(${translateY * 1}px)` }}
          className="w-[500px] h-[690px] float-right mt-4 transition-transform duration-50 ease-in-out"
          alt="Augustus Image" />

      </div>
    </body>
  );
}
