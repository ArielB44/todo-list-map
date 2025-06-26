import { Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { tasksService } from "./tasks.service";

@Controller('tasks')
export class tasksController {
  constructor(private taskService: tasksService) {}

  @Get()
  async handlegetNoneDoneTasks() {
    return this.taskService.getNoneDoneTasks();
  }

  @Patch('/start/:taskId')
  async handleStartTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.changeTaskStatusToInProgress(taskId);
  }

  @Patch('/end/:taskId')
  async handleDoneTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.changeTaskStatusToDone(taskId);
  }
}