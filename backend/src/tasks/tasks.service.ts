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

  async changeTaskStatusToInProgress(taskId: number) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: TaskStatus.IN_PROGRESS }
    });
  }

  async changeTaskStatusToDone(taskId: number) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: TaskStatus.DONE }
    });
  }
}