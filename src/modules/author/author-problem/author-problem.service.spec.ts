import { Test, TestingModule } from '@nestjs/testing';
import { AuthorProblemService } from './author-problem.service';

describe('AuthorProblemService', () => {
  let service: AuthorProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorProblemService],
    }).compile();

    service = module.get<AuthorProblemService>(AuthorProblemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
