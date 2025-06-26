import { useEffect } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styled from "styled-components";

export default function Map() {
    useEffect(() => {
        const map = new maplibregl.Map({
          container: 'map',
          style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=lCQPGMq7Of8oBJgrZFPo',
          center: [35, 31.5],
          zoom: 7
        });
    
        return () => map.remove();
    }, []);

    const MapDiv = styled.div`
        position: relative;
        width: 100%;
        height: 100%;
    `;

    return (
        <MapDiv id="map"/>
    );
}