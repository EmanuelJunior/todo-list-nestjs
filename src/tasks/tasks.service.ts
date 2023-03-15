import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterSearchTaskDto } from './dto/filter-search-task.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    await this.taskRepository.save(task);
    
    return task;
  }

  async findAll( filterSearchTaskDto: FilterSearchTaskDto ) {
    const { status, todo } = filterSearchTaskDto;
    
    const query = this.taskRepository.createQueryBuilder('task')
      .orderBy('task.id', 'DESC');

    if ( status && status !== 'all' )
      query.andWhere('task.status = :status', { status });

    if ( todo )
      query.andWhere('LOWER(task.todo) LIKE :todo', { todo: `${todo.toLowerCase()}%` });

    const tasks = await query.getMany();
    return tasks;
  }

  async update( id: string, updateTaskDto: UpdateTaskDto) {

    const task = await this.taskRepository.preload({ id, ...updateTaskDto });

    if (!task)
      throw new BadRequestException(`Task with ID "${id}" not found`);

    return await this.taskRepository.save(task);
  }

  async remove(id: string) {
    await this.taskRepository.delete({ id });
    return { message: 'Task deleted successfully' };
  }
}
