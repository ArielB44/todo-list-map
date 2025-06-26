import { useEffect } from "react";
import maplibregl, { Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styled from "styled-components";
import type { Task } from "../types/Task";

interface Props {
  tasks?: Task[]
}

export default function Map({tasks}: Props) {
    useEffect(() => {
        const map = new maplibregl.Map({
          container: 'map',
          style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=lCQPGMq7Of8oBJgrZFPo',
          center: [35, 31.5],
          zoom: 7
        });

        tasks?.map((task) => {
            new Marker({
                color: "orange",
            }).setLngLat([task.longitude as number, task.latitude as number])
               .setPopup(new Popup()
                    .setHTML(`<h4 style="color: black;">
                                    ${`task: ${task.content}`}
                              </h4>`))
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