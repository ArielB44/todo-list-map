import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { tasksService } from "./tasks.service";
import { TaskDto } from "src/shared/taskDTO";
import { TaskStatus } from "src/shared/taskStatus.enum";

@Controller('tasks')
export class tasksController {
  constructor(private taskService: tasksService) {}

  @Get()
  async handleGetTasksWithStatusFilter(@Query('statuses[]') statuses: TaskStatus[] | TaskStatus) {
    try {
      const statusArray = Array.isArray(statuses) ? statuses : [statuses];
      return await this.taskService.getTasksWithStatusFilter(statusArray);
    } catch (error) {
      throw new NotFoundException(`Error fetching tasks: ${error.message}`);
    }
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
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async handleAddTask(@Body() newTask: TaskDto) {
    try {
      await this.taskService.addTask(newTask);
      return { message: `task added successfully` };
    } catch(err) {
      throw new BadRequestException(err);
    }
  }
}