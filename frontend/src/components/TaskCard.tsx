import styled from "styled-components";
import type { Task } from "../types/Task";
import { TaskStatus } from "../types/Task";
import { useUpdateTaskStatus } from "../api/tasks";

interface Props {
  task?: Task;
}

export default function TaskCard({ task }: Props) {
  const mutation  = useUpdateTaskStatus();

  if (!task) return null;

  return (
    <Card $inProgress={task.status == TaskStatus.IN_PROGRESS}>
      <Content>{task.content}</Content>
      <Buttons>
        {task.status != TaskStatus.IN_PROGRESS && 
        <ActionButton $color="#3498db" onClick={() =>mutation.mutate({ taskId: task.id, status: TaskStatus.IN_PROGRESS })}>
          Start
        </ActionButton>}
        <ActionButton $color="#2ecc71" onClick={() => mutation.mutate({ taskId: task.id, status: TaskStatus.DONE })}>
          Done
        </ActionButton>
      </Buttons>
    </Card>
  );
}

const Card = styled.div<{ $inProgress: boolean }>`
  background-color: rgb(236, 236, 236);
  border: 4px solid ${({ $inProgress }) => $inProgress === true ? "green" : "black"};
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;

const Content = styled.div`
  font-weight: 700;
  color: black;
  font-size: 16px;
  width: 50%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  height: 50px
`;