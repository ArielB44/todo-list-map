import { Module } from "@nestjs/common";
import { tasksController } from "./tasks.controller";
import { tasksService } from "./tasks.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [tasksController],
  providers: [tasksService, PrismaService],
})

export class TasksModule {}