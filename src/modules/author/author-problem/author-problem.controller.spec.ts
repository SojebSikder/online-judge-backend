import { Test, TestingModule } from '@nestjs/testing';
import { AuthorProblemController } from './author-problem.controller';
import { AuthorProblemService } from './author-problem.service';

describe('AuthorProblemController', () => {
  let controller: AuthorProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorProblemController],
      providers: [AuthorProblemService],
    }).compile();

    controller = module.get<AuthorProblemController>(AuthorProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
