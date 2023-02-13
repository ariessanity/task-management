import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'Aries',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TaskService', () => {
  let taskService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    // initialize a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [TasksService, { provide: Repository<Task>, useFactory: mockTasksRepository }],
    }).compile();

    taskService = module.get(TasksService);
    taskRepository = module.get(Repository<Task>);
  });

  describe('getTasks', () => {
    it('calls TasksService.getTasks and returns the result', async () => {
      taskService.getTasks.mockResolvedValue('someValue');
      const result = await taskService.getTasks({}, mockUser);
      expect(result).toEqual('someValue');
    });
  });
});
