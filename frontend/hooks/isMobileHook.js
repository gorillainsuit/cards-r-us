import { useState, useEffect } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 600);
    document.addEventListener('resize', () =>
      setIsMobile(window.innerWidth <= 600)
    );
  });

  return isMobile;
}
