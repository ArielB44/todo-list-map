import styled from "styled-components";
import type { Task } from "../types/Task";
import { TaskStatuses } from "../types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endTask, startTask } from "../api/tasks";

interface Props {
  task?: Task;
}

export default function TaskCard({ task }: Props) {
  const queryClient = useQueryClient();

  const startTaskMutation = useMutation({
    mutationFn: () => startTask(task!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const endTaskMutation = useMutation({
    mutationFn: () => endTask(task!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (!task) return null;

  return (
    <Card $inProgress={task.status == TaskStatuses.IN_PROGRESS}>
      <Content>{task.content}</Content>
      <Buttons>
        {task.status != TaskStatuses.IN_PROGRESS && <ActionButton $color="#3498db"
            onClick={() => startTaskMutation.mutate()}>Start Task</ActionButton>}
        <ActionButton $color="#2ecc71" onClick={() => endTaskMutation.mutate()}>
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