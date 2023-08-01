import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubmissionRepository {
  /**
   * get user details
   * @returns
   */
  static async createSubmission({
    code,
    language,
    verdict,
    time,
    memory,
    result,
    problemId,
    userId,
  }: {
    code: string;
    language: string;
    verdict: string;
    time?: number;
    memory?: number;
    result: any;
    problemId: number;
    userId: number;
  }) {
    const response = await prisma.submission.create({
      data: {
        code: code,
        language: language,
        verdict: verdict,
        time: time,
        memory: memory,
        result: result,
        problem_id: problemId,
        user_id: userId,
      },
    });

    return response;
  }
}
