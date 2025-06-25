import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Home() {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [35.5, 32.5],
      zoom: 4
    });

    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ position: 'absolute', width: '100%', height: '100%',}}/>
  );
}