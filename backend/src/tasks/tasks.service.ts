import { Injectable } from "@nestjs/common";
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
}