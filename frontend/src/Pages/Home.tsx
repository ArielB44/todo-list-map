import Map from "../components/Map"
import NavBar from "../components/NavBar"
import styled from "styled-components";
import TasksGrid from "../components/TasksGrid";

export default function Home() {
  const PageLayout = styled.div`
    display: flex;
    height: calc(100vh - 80px);
  `;

  const MapWrapper = styled.div`
    width: 70%;
  `;

  return (
    <div>
        <NavBar />
        <PageLayout>
            <TasksGrid />
            <MapWrapper>
                <Map />
            </MapWrapper>
        </PageLayout>
    </div>
  )
}