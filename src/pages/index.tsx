import Image from "next/image";
import Map, { NavigationControl, Marker, MarkerDragEvent } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const DEFAULT_POS = {
  lng: -71.917511353,
  lat: 45.3987580326,
};

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [markerPoint, setMarkerPoint] = useState(DEFAULT_POS);
  const { lat, lng } = markerPoint;

  return (
    <main
      className={`flex relative min-h-screen items-center justify-center  ${inter.className}`}
    >
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: -71.917511353,
          latitude: 45.3987580326,
          zoom: 18,
        }}
        pitch={45}
        bearing={0}
        style={{ width: "100%", height: "calc(100vh - 0px)" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`}
      >
        <NavigationControl position="top-left" />
        <Marker
          longitude={lng}
          latitude={lat}
          anchor="bottom"
          draggable
          onDragEnd={(e: MarkerDragEvent) => {
            const {
              type,
              lngLat: { lat, lng },
            } = e;

            setMarkerPoint({ lat, lng });
          }}
        />
      </Map>
      <div className="flex flex-col p-4 justify-center gap-2 bg-white  absolute right-4 top-1 rounded shadow-lg">
        <div className="flex gap-2">
          <button
            className="flex justify-center items-center bg-gray-400 h-fit p-1 rounded"
            onClick={() => {
              setMarkerPoint({ lat: lat + 0.00001, lng });
            }}
          >
            +
          </button>
          <div> Latitude </div>
          <div>{lat}</div>
          {/*  <input
            defaultValue={lat}
            type="number"
            className="shadow-sm pl-1"
            placeholder="latitude"
            value={lat}
            step={0.00001}
            onChange={(e: any) => {
              console.log(e.target.value);
            }}
          /> */}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMarkerPoint({ lat, lng: lng + 0.00001 });
            }}
            className="flex justify-center items-center bg-gray-400 h-fit p-1 rounded"
          >
            +
          </button>
          <div> Longitude </div>
          <div>{lng}</div>
          {/*  <input
            defaultValue={lat}
            type="number"
            className="shadow-sm pl-1"
            placeholder="latitude"
            value={lng}
            step={0.0001}
            onChange={(e: any) => {
              console.log(e.target.value);
            }}
          /> */}
        </div>
      </div>
    </main>
  );
}
