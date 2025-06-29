import { Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { tasksService } from "./tasks.service";
import { TaskStatus } from "src/shared/enums/task-status.enum";

@Controller('tasks')
export class tasksController {
  constructor(private taskService: tasksService) {}

  @Get()
  async handlegetNoneDoneTasks() {
    return this.taskService.getNoneDoneTasks();
  }

  @Patch('/status/:taskId/:status')
  async handleTaskStatusUpdate(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('status') status: TaskStatus,
  ) {
    try {
      const updatedTask = await this.taskService.changeTaskStatus(taskId, status);
      return {
        statusCode: HttpStatus.OK,
        data: updatedTask,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }
      throw error;
    }
  }
}