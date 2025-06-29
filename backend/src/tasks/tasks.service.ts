import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TaskStatus } from "src/shared/enums/task-status.enum";

@Injectable()
export class tasksService {
  constructor(private prisma: PrismaService) {}

  async getTasksWithStatusFilter(statuses: TaskStatus[]) {
    try {
      if (!statuses || statuses.length === 0) {
        return await this.prisma.task.findMany();
      }
      
      return await this.prisma.task.findMany({
           where: {
             status: {
               in: statuses,
             },
           },
         });
    } catch (error) {
        throw new Error('Failed to fetch tasks');
       }
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