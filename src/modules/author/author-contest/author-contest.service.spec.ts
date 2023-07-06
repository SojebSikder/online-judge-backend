import { Test, TestingModule } from '@nestjs/testing';
import { AuthorContestService } from './author-contest.service';

describe('AuthorContestService', () => {
  let service: AuthorContestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorContestService],
    }).compile();

    service = module.get<AuthorContestService>(AuthorContestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
