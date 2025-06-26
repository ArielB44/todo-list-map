import styled from "styled-components";
import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";

interface Props {
  tasks?: Task[]
}

export default function TasksGrid({tasks}: Props) {
    const TaskGrid = styled.div`
        width: 30%;
        height: 100%;
        background-color: rgb(134, 166, 204);
        padding: 20px;
        overflow-y: auto;
    `;

    return (
        <TaskGrid>
            {tasks?.map((task) => (
                <TaskCard key={task.id} task={task}></TaskCard>
            ))}
        </TaskGrid>
    )
}