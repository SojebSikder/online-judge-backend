import * as shell from 'shelljs';
import * as fs from 'fs/promises';
import * as path from 'path';
import { existsSync } from 'fs';

const execute = (
  language: string,
  problem: any,
  filename: string,
  testfileName: string,
  outputfileName: string,
  timeMemoryfileName: string,
): string => {
  const codefileName = `solution.${language}`;
  return `docker run --rm -v "${filename}:/${codefileName}" -v "${testfileName}:/testcase.txt" -v "${outputfileName}:/output.txt" -v "${timeMemoryfileName}:/timeMemory.txt" sojeboj ${language} ./output.txt ./timeMemory.txt ${problem.timeLimit} ${problem.memoryLimit}`;
};

const runTestCase = async (
  rootPath: string,
  problem: any,
  submission: any,
  testcase: any,
  op: string,
  paths: {
    filename: string;
    testfileName: string;
    outputfileName: string;
    timeMemoryfileName: string;
  },
) => {
  const { filename, testfileName, outputfileName, timeMemoryfileName } = paths;

  await fs.writeFile(testfileName, testcase.input);

  shell.cd(rootPath);
  await new Promise((resolve) => {
    shell.exec(
      execute(
        submission.language,
        problem,
        filename,
        testfileName,
        outputfileName,
        timeMemoryfileName,
      ),
      () => resolve(null),
    );
  });

  const expectedOutput = testcase.output.trim();
  const actualOutput = (await fs.readFile(outputfileName, 'utf-8')).trim();
  const timeMemoryOutput = (
    await fs.readFile(timeMemoryfileName, 'utf-8')
  ).trim();
  const [time, memory] = timeMemoryOutput.split('\n').slice(-2);

  const result = {
    actualOutput,
    expectedOutput,
    time: parseFloat(time),
    memory: parseFloat(memory),
    CE: false,
    RTE: false,
    TLE: false,
    MLE: false,
    AC: false,
    WA: false,
  };

  if (actualOutput.includes('COMPILATION ERROR')) {
    result.CE = true;
    result.time = 0;
    result.memory = 0;
  } else if (actualOutput.includes('MLE')) result.MLE = true;
  else if (actualOutput.includes('TLE')) result.TLE = true;
  else if (actualOutput.includes('RUNTIME ERROR')) result.RTE = true;
  else if (op !== 'customInput' && actualOutput === expectedOutput)
    result.AC = true;
  else if (op !== 'customInput') result.WA = true;

  return result;
};

const test = async (
  problem: any,
  submission: any,
  op: string,
): Promise<any[]> => {
  const rootPath = process.cwd();
  const submissionPath = path.join(rootPath, submission._id.toString(), '/');
  const paths = {
    filename: path.join(submissionPath, `solution.${submission.language}`),
    testfileName: path.join(submissionPath, 'testcase.txt'),
    outputfileName: path.join(submissionPath, 'output.txt'),
    timeMemoryfileName: path.join(submissionPath, 'timeMemory.txt'),
  };

  const allTestcases =
    op === 'runcode'
      ? [...problem.sampleTestcases]
      : [...problem.sampleTestcases, ...problem.systemTestcases];

  try {
    if (!existsSync(submissionPath))
      await fs.mkdir(submissionPath, { recursive: true });

    await Promise.all([
      fs.writeFile(paths.filename, submission.code),
      fs.writeFile(paths.outputfileName, ''),
      fs.writeFile(paths.timeMemoryfileName, ''),
      fs.writeFile(paths.testfileName, ''),
    ]);

    const results = [];
    for (const testcase of allTestcases) {
      const result = await runTestCase(
        rootPath,
        problem,
        submission,
        testcase,
        op,
        paths,
      );
      results.push(result);
    }

    await fs.rm(submissionPath, { recursive: true, force: true });
    return results;
  } catch (error) {
    // Clean up on error
    if (existsSync(submissionPath)) {
      await fs.rm(submissionPath, { recursive: true, force: true });
    }
    throw error;
  }
};

async function addSubmission({
  problem,
  submission,
  op,
}: {
  problem: any;
  submission: any;
  op: string;
}): Promise<any[]> {
  return await test(problem, submission, op);
}

/**
 * @description CodeSandbox class
 * @author [@sojebsikder](https://github.com/sojebsikder)
 */
export class CodeSandbox {
  async addSubmission({
    problem,
    submission,
    op,
  }: {
    problem: any;
    submission: any;
    op: string;
  }): Promise<any[]> {
    return await addSubmission({
      problem,
      submission,
      op,
    });
  }
}
