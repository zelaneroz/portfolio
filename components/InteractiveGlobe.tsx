'use client'

import { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'

const visitedPlaces = [
  {
    name: "Kyoto, Japan",
    lat: 35.0116,
    lng: 135.7681,
    story: "I solo-hiked a mountain here during spring break and watched cherry blossoms fall on silent paths.",
    image: "/images/kyoto.jpg",
    emoji: "🗻"
  },
  {
    name: "Dinagat Islands, Philippines",
    lat: 10.1322,
    lng: 125.5904,
    story: "Where I grew up—watching my mom lead disaster response missions. It taught me what resilience really means.",
    image: "/images/dinagat.jpg",
    emoji: "🏝"
  }
]

export default function InteractiveGlobe() {
  const globeRef = useRef<any>(null)
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null)
  const [points, setPoints] = useState<any[]>([])

  const goToRandomPlace = () => {
    const place = visitedPlaces[Math.floor(Math.random() * visitedPlaces.length)]
    setSelectedPlace(place)
    setPoints([{ lat: place.lat, lng: place.lng, size: 1, color: 'orange' }])
    globeRef.current.pointOfView({ lat: place.lat, lng: place.lng, altitude: 1.5 }, 1000)
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <button
        onClick={goToRandomPlace}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Where’s Zelan Been?
      </button>

      <div className="w-full h-[500px]">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={points}
          pointAltitude="size"
          pointColor="color"
          onPointClick={() => {
            // already handled via `selectedPlace`
          }}
        />
      </div>

      {selectedPlace && (
        <div className="max-w-md w-full bg-white border border-gray-300 shadow-md p-4 rounded">
          <h3 className="text-xl font-bold mb-2">{selectedPlace.emoji} {selectedPlace.name}</h3>
          <p className="text-gray-700 mb-2">{selectedPlace.story}</p>
          {selectedPlace.image && (
            <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full rounded shadow" />
          )}
        </div>
      )}
    </div>
  )
}
