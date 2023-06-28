import { Injectable } from '@nestjs/common';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';

import * as crypto from 'crypto';
import { CodeSandbox } from '../../../common/lib/CodeSandbox/CodeSandbox';
import appConfig from '../../../config/app.config';
import { SubmissionRepository } from '../../../common/repository/submission/submission.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../providers/prisma/prisma.service';

function random(size) {
  //returns a crypto-safe random
  return crypto.randomBytes(size).toString('hex');
}

@Injectable()
export class JudgeService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async run(createJudgeDto: CreateJudgeDto) {
    const response = await this._processJudge(createJudgeDto);

    return response;
  }
  async create(userId, createJudgeDto: CreateJudgeDto) {
    const response = await this._processJudge(createJudgeDto);

    return response;
  }

  async _processJudge(createJudgeDto: CreateJudgeDto) {
    const code = createJudgeDto.code;
    const language = createJudgeDto.language;
    const problem_id = createJudgeDto.problem_id;

    // const problem = {
    //   time: 1,
    //   memory: 100,
    //   sampleTestcases: [
    //     // {
    //     //   input: "1 2",
    //     //   output: "3",
    //     // },
    //     {
    //       input: '',
    //       output: 'Hello world',
    //     },
    //   ],
    //   systemTestcases: [
    //     // {
    //     //   input: "1 2",
    //     //   output: "3",
    //     // },
    //   ],
    // };

    const problemData = await this.prisma.problem.findFirst({
      where: {
        id: problem_id,
      },
    });
    const problem = {
      time: problemData.time || 1,
      memory: problemData.memory || 100,
      // sampleTestcases: problemData.sample_test_cases || [],
      // systemTestcases: problemData.system_test_cases || [],
      sampleTestcases: [{ input: '', output: 'Hello world' }],
      systemTestcases: [{ input: '', output: 'Hello world' }],
    };
    const submission = {
      _id: random(10),
      code: code,
      language: language, // cpp, py
      verdict: '',
    };
    const op = 'runcode';

    const codeSandbox = new CodeSandbox({
      rootPath: appConfig().app.root_path + '/submissions/',
    });

    try {
      const result = await codeSandbox.addSubmission({
        problem: problem,
        submission: submission,
        op: op,
      });

      if (result) {
        const finalResult = [];
        const verdicts = [],
          testcases = [];

        // console.log(result);

        result.forEach((curResult) => {
          const newResult = {},
            curTestcase = {
              time: curResult.time,
              memory: curResult.memory,
            };

          for (const key in curResult) {
            if (curResult[key] !== false) {
              newResult[key] = curResult[key];
            }
            if (curResult[key] === true) {
              newResult['verdict'] = key;
              curTestcase['verdict'] = key;
              verdicts.push(key);
            }
          }
          testcases.push(curTestcase);
          finalResult.push(newResult);
        });

        // submission.result = testcases;

        if (verdicts.includes('CE')) submission.verdict = 'CE';
        else if (verdicts.includes('MLE')) submission.verdict = 'MLE';
        else if (verdicts.includes('TLE')) submission.verdict = 'TLE';
        else if (verdicts.includes('RTE')) submission.verdict = 'RTE';
        else if (verdicts.includes('WA')) submission.verdict = 'WA';
        else if (verdicts.includes('AC')) submission.verdict = 'AC';

        // console.log(submission.verdict, finalResult);

        return {
          data: { verdict: submission.verdict, result: finalResult },
        };
      } else {
        return { message: 'Something Went Wrong! Try Again!!!' };
      }
    } catch (error) {
      // console.log(error);
      return { message: 'Something Went Wrong! Try Again!!!' };
    }
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
