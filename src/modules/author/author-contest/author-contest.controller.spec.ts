import { Test, TestingModule } from '@nestjs/testing';
import { AuthorContestController } from './author-contest.controller';
import { AuthorContestService } from './author-contest.service';

describe('AuthorContestController', () => {
  let controller: AuthorContestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorContestController],
      providers: [AuthorContestService],
    }).compile();

    controller = module.get<AuthorContestController>(AuthorContestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
