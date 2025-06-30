import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TaskDto } from "src/shared/taskDTO";
import { TaskStatus } from "src/shared/taskStatus.enum";

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

  async addTask(newTask: TaskDto) {
    return this.prisma.task.create({ data: newTask });
  }
}