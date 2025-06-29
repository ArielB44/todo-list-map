import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Task, TaskStatus } from "src/shared/enums/task-status.enum";

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
    try {
      return await this.prisma.task.update({
        where: { id: taskId },
        data: { status: newStatus },
      });
    } catch(err) {
      throw new BadRequestException();
    }
  }

  async addTask(newTask: Task) {
    this.prisma.task.create({ data: newTask });
  }
}