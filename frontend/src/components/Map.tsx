import { useEffect } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styled from "styled-components";

export default function Map() {
    useEffect(() => {
        const map = new maplibregl.Map({
          container: 'map',
          style: 'https://demotiles.maplibre.org/style.json',
          center: [35.5, 32.5],
          zoom: 4
        });
    
        return () => map.remove();
    }, []);

    const MapDiv = styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
    `;

    return (
        <MapDiv id="map"/>
    );
}