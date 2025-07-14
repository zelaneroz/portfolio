// components/IntGlobe.tsx
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

// Dynamically import Globe component (no SSR)
const GlobeComponent = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function IntGlobe() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.2;
    }
  }, []);

  return (
    <div className="w-full h-full">
      <GlobeComponent
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="transparent"
        width={400}
        height={400}
      />
    </div>
  );
}
