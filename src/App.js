import { useState, useEffect, useRef } from 'react';
import useCursorTracker from './useCursorTracker';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const [date, setDate] = useState(new Date());
  const [scrollY, setScrollY] = useState(0);
  const [translateY, setTranslateY] = useState(scrollY * 0.5);
  const [translateX, setTranslateX] = useState(scrollY * 0.5);
  const { boxRef, x, y } = useCursorTracker();



  useEffect(() => {

    if (!loading) {
      console.log("counter", quote.q, quote.a);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // ensures 2 digits
      const day = String(date.getDate()).padStart(2, '0');        // ensures 2 digits
      const formattedDate = `${month}/${day}/${year}`;
      const FullQuote = `"${quote?.q}" - ${quote?.a} (${formattedDate})`;

      const tooManyRequestsMessage = "Too many requests. Obtain an auth key for unlimited access.";

      console.log(quote?.q === tooManyRequestsMessage)
      if (quote?.q === tooManyRequestsMessage) return;

      const LastQuote = localStorage.getItem('currentQuote');
    


      
      console.log(FullQuote === LastQuote, FullQuote !== undefined, FullQuote !== tooManyRequestsMessage)
      if (FullQuote !== LastQuote && FullQuote !== undefined && FullQuote !== tooManyRequestsMessage) {
        localStorage.setItem('lastQuote', LastQuote);
        localStorage.setItem('currentQuote', FullQuote);
        setLastQuote(localStorage.getItem('lastQuote') || undefined);
      }
    }
  }, [loading]);

  const didRunOnce = useRef(false);

  useEffect(() => {
    if (didRunOnce.current) return;
    fetch("/api/today")
      .then(res => res.json())
      .then(data => setQuote(data[0]))

      .catch(error => {
        console.error("Error fetching quote:", error);
      })
      .finally(() => {
        setLoading(false);
      });

      didRunOnce.current = true;
  }, []);





  useEffect(() => {
    const timer = setInterval(() => {
      // Add three days to the current date
      const newDate = new Date();
      setDate(newDate);
    }, 1000);

    return () => clearInterval(timer);
  }, []);




  useEffect(() => {
    const handleScroll = () => {
      console.log("scrolling:", scrollY);
      if (scrollY <= 750) {
        setTranslateY(window.scrollY);
        setTranslateX(window.scrollX);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);
    
  

  const [lastQuote, setLastQuote] = useState(() => {
    return localStorage.getItem('lastQuote') || "No quote history found.";
  });


  return (

    <body className="bg-[#0f1112] text-white h-full overflow-y-auto w-full font-sans overflow-x-hidden">
      <div ref={boxRef} className="bg-transparent w-full h-full relative">
        <div className="bg-[#0f1112] text-white min-h-[2500px] w-full p-4">
          <div className="bg-black w-full min-w-[999px]">
            <p className="fixed top-2 right-2 text-lg text-white">{date.toLocaleString()}</p>
          </div>
          {/* Header */}
          <div className="bg-blue-600/0 w-full h-16 flex items-center justify-center mt-10">
            <h1 className="text-center text-4xl font-bold bg-gradient-to-tr from-blue-400 via-purple-300 to-orange-400 bg-clip-text text-transparent">
              - Quote of the Day! -
            </h1>
          </div>

          {/* API Quote */}
          <p className="font-bold text-[20px] text-center mt-4 bg-gradient-to-tr from-amber-700 via-yellow-300 to-white bg-clip-text text-transparent transition-transform duration-50 ease-in-out">
            {!loading && quote?.q === `"Too many requests. Obtain an auth key for unlimited access."` ? "Hold on" : `"${quote?.q}" - ${quote?.a}`}


          </p>

          <p>Previous Quote</p>
          <p className="text-sm text-gray-400">
            {lastQuote}
          </p>

          {/* Image */}

          <div className="relative w-full h-screen">
            <img
              src="Files/The_Hand.png"
              style={{ transform: `translate(${translateY > 600 && translateY < 2220 ? translateX - (translateY / 2) + 2000 : translateY >= 2220 ? translateX + ((translateY - 500) / 2) : -999}px, ${translateY * 1.025}px)` }}

              alt="The Evil Hand"
              className="">
            </img>



            <img
              src="Files/Augustus_Image.png"
              style={{ transform: `translate(${translateY > 2500 ? translateX + ((translateY - 2500) / 1.9) : translateX}px, ${translateY * 1}px) rotate(${y >= 200 && y <= 800 && translateY <= 750 ? (y / 18) - (200 / 18) : translateY > 2500 ? 10 : 0}deg)` }}
              className="w-[500px] h-[690px] absolute right-0 top-0 transition-transform duration-50 ease-in-out"
              alt="Augustus Image" />

            <div className="bg-trasparent bg-opacity-0 w-full h-16 flex items-center justify-center mt-96">
              <p className="text-center text-4xl font-bold bg-gradient-to-tr from-blue-400 to-white bg-clip-text text-transparent">
                - Special Thanks to: ZenQuotes API -
              </p>
            </div>
          </div>

          <p className="font-bold text-[60px] translate-y-[3100px] text-center bg-gradient-to-tr from-pink-400 to-orange-500 bg-clip-text text-transparent">
            - The End -
          </p>

        </div>
      </div>
    </body >
  );
}




