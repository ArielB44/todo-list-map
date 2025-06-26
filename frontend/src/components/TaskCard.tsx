import styled from "styled-components";
import type { Task } from "../types/Task";

interface Props {
  task?: Task;
}

export default function TaskCard({ task }: Props) {
  if (!task) return null;

  return (
    <Card>
      <Content>{task.content}</Content>
      <Buttons>
        <ActionButton $color="#3498db">Start Task</ActionButton>
        <ActionButton $color="#2ecc71">Done</ActionButton>
      </Buttons>
    </Card>
  );
}

const Card = styled.div`
  background-color: rgb(236, 236, 236);
  border: 2px solid black;
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
`;