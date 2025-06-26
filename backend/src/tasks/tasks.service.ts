import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
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
    const taskToUpdate = await this.prisma.task.findUnique({where: {id: taskId}});

    if (!taskToUpdate) {
      throw new NotFoundException("Task not found");
    }
  }
}