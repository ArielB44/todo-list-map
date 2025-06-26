import { Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { tasksService } from "./tasks.service";

@Controller('tasks')
export class tasksController {
  constructor(private taskService: tasksService) {}

  @Get()
  async handlegetNoneDoneTasks() {
    return this.taskService.getNoneDoneTasks();
  }

  @Patch('/status/:taskId')
  async handleStartTask(@Param('taskId', ParseIntPipe) taskId: number) {
    try {
      return this.taskService.changeTaskStatusToInProgress(taskId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        return { message: err.message, status: HttpStatus.NOT_FOUND };
      }

      return { message: "something went wrong", status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}