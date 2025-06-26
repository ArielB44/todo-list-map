import styled from "styled-components";
import type { Task } from "../types/Task";

interface Props {
  tasks?: Task[]
}

export default function TasksGrid({tasks}: Props) {
    const TaskGrid = styled.div`
        width: 30%;
        height: 100%;
        background-color: #f0f0f0;
        padding: 20px;
    `;

    return (
        <TaskGrid>
            <ul>
                {tasks?.map((task) => (
                <li key={task.id} style={{color: "black"}}>{task.content}</li>
                ))}
            </ul>
        </TaskGrid>
    )
}