import Map from "../components/Map";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import TasksGrid from "../components/TasksGrid";
import { useQuery } from "@tanstack/react-query";
import { getTasksByStatuses } from "../api/tasks";
import { TaskStatus, type Task } from "../types/Task";

export default function Home() {
  const PageLayout = styled.div`
    display: flex;
    flex-grow: 1;
    overflow: hidden;
  `;

  const MapWrapper = styled.div`
    width: 70%;
    height: 100%;
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `;

  const { data = [] } = useQuery<Task[], Error>({
    queryKey: ["tasks", TaskStatus.PENDING, TaskStatus.IN_PROGRESS],
    queryFn: () => getTasksByStatuses([TaskStatus.PENDING, TaskStatus.IN_PROGRESS]),
  });

  return (
    <Container>
      <NavBar />
      <PageLayout>
        <TasksGrid tasks={data} />
        <MapWrapper>
          <Map tasks={data} />
        </MapWrapper>
      </PageLayout>
    </Container>
  );
}