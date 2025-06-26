import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class tasksService {
  constructor(private prisma: PrismaService) {}

  async getNoneDoneTasks() {
    return this.prisma.task.findMany({
      where: {
        status: {
          not: 'DONE'
        }
      }
    });
  }

  async changeTaskStatusToInProgress(taskId: number) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: 'IN_PROGRESS' }
    });
  }

  async changeTaskStatusToDone(taskId: number) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: 'DONE' }
    });
  }
}