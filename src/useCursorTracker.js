import React, { useRef, useState, useEffect } from 'react';

function useCursorTracker() {
  const boxRef = useRef(null);
  const [relativePos, setRelativePos] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const handleMouseMove = (e) => {


      const rect = box.getBoundingClientRect();

      // Cursor position relative to the box
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRelativePos({ x, y });
    };

    box.addEventListener('mousemove', handleMouseMove);
    return () => box.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { boxRef, x: relativePos.x, y: relativePos.y };

}

export default useCursorTracker;
