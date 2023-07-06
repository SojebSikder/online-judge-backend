import { PartialType } from '@nestjs/swagger';
import { CreateAuthorProblemDto } from './create-author-problem.dto';

export class UpdateAuthorProblemDto extends PartialType(CreateAuthorProblemDto) {}
