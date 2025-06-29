import { useEffect } from "react";
import maplibregl, { Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styled from "styled-components";
import type { Task } from "../../types/Task";
import { MAP_SETTINGS } from "./Map.config";

interface Props {
  tasks?: Task[]
}

export default function Map({tasks}: Props) {
    useEffect(() => {
        const map = new maplibregl.Map({
          container: 'map',
          style: import.meta.env.VITE_MAP_STYLE,
          center: [MAP_SETTINGS.MAP_CENTER_LNG, MAP_SETTINGS.MAP_CENTER_LAT],
          zoom: MAP_SETTINGS.MAP_ZOOM
        });

        const tasksWithPosition = tasks?.filter(task => task.latitude && task.longitude)

        tasksWithPosition?.map((task) => {
            new Marker({
                color: MAP_SETTINGS.MAP_MARKER_COLOR,
            }).setLngLat([task.longitude, task.latitude])
               .setPopup(new Popup()
                    .setHTML(`<h4 style="color: black;"> ${`task: ${task.content}`} </h4>`))
               .addTo(map);
        })
    
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