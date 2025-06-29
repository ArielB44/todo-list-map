import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TaskStatus } from "src/shared/enums/task-status.enum";

@Injectable()
export class tasksService {
  constructor(private prisma: PrismaService) {}

  async getNoneDoneTasks() {
    return this.prisma.task.findMany({
      where: {
        status: {
          not: TaskStatus.DONE
        }
      }
    });
  }

  async changeTaskStatus(taskId: number, newStatus: TaskStatus) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });
  }
}