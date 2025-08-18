import React, { useEffect, useState } from "react";

export default function useDimensions(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    function getDimensions() {
      return {
        width: currentRef?.offsetWidth || 0,
        height: currentRef?.offsetHeight || 0,
      };
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions(getDimensions());
      }
    });

    if (containerRef) {
      resizeObserver.observe(currentRef);
      setDimensions(getDimensions());
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }

      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return dimensions;
}
