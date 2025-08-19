import React, { useEffect, useState } from 'react';

export default function ScrollImage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <div className="min-h-[3000px] bg-black text-white relative">

      <h1 className="pt-20 text-center text-4xl">Scroll to move the image</h1>
    </div>
  );
}


