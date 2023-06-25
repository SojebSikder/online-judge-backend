import { Injectable } from '@nestjs/common';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';

import * as crypto from 'crypto';
import { CodeSandbox } from 'src/common/lib/CodeSandbox/CodeSandbox';
import appConfig from 'src/config/app.config';

function random(size) {
  //returns a crypto-safe random
  return crypto.randomBytes(size).toString('hex');
}

@Injectable()
export class JudgeService {
  create(createJudgeDto: CreateJudgeDto) {
    const code = createJudgeDto.code;

    const problem = {
      time: 1,
      memory: 100,
      sampleTestcases: [
        // {
        //   input: "1 2",
        //   output: "3",
        // },
        {
          input: '',
          output: 'Hello world',
        },
      ],
      systemTestcases: [
        // {
        //   input: "1 2",
        //   output: "3",
        // },
      ],
    };
    const submission = {
      _id: random(10),
      code: code,
      language: 'cpp',
    };
    const op = 'runcode';

    const codeSandbox = new CodeSandbox({
      rootPath: appConfig().app.root_path + '/submissions/',
    });

    codeSandbox.addSubmission({
      problem: problem,
      submission: submission,
      op: op,
      callback: (error, result) => {
        if (error) {
          console.log(error);
          return { error: error };
        } else {
          console.log(result);
          return {
            data: result,
          };
        }
      },
    });
  }

  findAll() {
    return `This action returns all judge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} judge`;
  }

  update(id: number, updateJudgeDto: UpdateJudgeDto) {
    return `This action updates a #${id} judge`;
  }

  remove(id: number) {
    return `This action removes a #${id} judge`;
  }
}
