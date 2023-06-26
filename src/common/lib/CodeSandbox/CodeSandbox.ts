import * as shell from 'shelljs';
import * as async from 'async';
import * as fs from 'fs';
import * as path from 'path';

// const PATH_INIT = path.join(
//   // 'D:/My Program/project/web/sojeb-oj',
//   appConfig().app.root_path,
//   '/submissions/',
// );

const execute = function (
  language,
  problem,
  filename,
  testfileName,
  outputfileName,
  timeMemoryfileName,
) {
  const codefileName = 'solution.' + language;
  // const commandText = `docker run --rm -v "$(pwd)/solution.cpp:/solution.cpp" -v "$(pwd)/testcase.txt:/testcase.txt" -v "$(pwd)/output.txt:/output.txt" -v "$(pwd)/timeMemory.txt:/timeMemory.txt" sojeboj cpp ./output.txt ./timeMemory.txt 100 100`;
  const commandText = `docker run --rm -v "${filename}:/${codefileName}" -v "${testfileName}:/testcase.txt" -v "${outputfileName}:/output.txt" -v "${timeMemoryfileName}:/timeMemory.txt" sojeboj ${language} ./output.txt ./timeMemory.txt ${problem.time} ${problem.memory}`;
  // return `docker run --rm -v="${filename}":/${codefileName}/ -v="${testfileName}":/testcase.txt/ -v="${outputfileName}":/output.txt/ -v="${timeMemoryfileName}":/timeMemory.txt/ online-judge ${language} output.txt timeMemory.txt ${problem.time} ${problem.memory}`;

  return commandText;
};

const test = function (rootPath, problem, submission, op): Promise<any[]> {
  return new Promise((resolve, reject) => {
    try {
      // const PATH = path.join(PATH_INIT, submission._id.toString(), '/');
      const PATH = path.join(rootPath, submission._id.toString(), '/');
      const code = submission.code;
      const filename = PATH + 'solution.' + submission.language;
      const testfileName = PATH + 'testcase.txt';
      const outputfileName = PATH + 'output.txt';
      const timeMemoryfileName = PATH + 'timeMemory.txt';
      let allTestcases = [];

      if (op === 'runcode') allTestcases = [...problem.sampleTestcases];
      else
        allTestcases = [...problem.sampleTestcases, ...problem.systemTestcases];

      const result = [];

      async.waterfall([
        function (next) {
          fs.mkdir(PATH.slice(0, -1), (err) => {
            if (err) next(null, err);
            else next(null, null);
          });
        },
        function (err, next) {
          if (err) next(null, err);
          fs.closeSync(fs.openSync(outputfileName, 'w'));
          fs.closeSync(fs.openSync(timeMemoryfileName, 'w'));
          fs.closeSync(fs.openSync(filename, 'w'));
          fs.closeSync(fs.openSync(testfileName, 'w'));
          next(null, null);
        },
        function (err, next) {
          if (err) next(null, err);
          fs.writeFile(filename, code, (err) => {
            if (err) console.log(err);
            next(null, null);
          });
        },
        function (err, next) {
          if (err) next(null, err);
          async.forEachLimit(
            allTestcases,
            1,
            function (curTestcase, cb) {
              async.waterfall([
                function (next) {
                  if (err) next(null, err);
                  fs.writeFile(testfileName, curTestcase.input, (err) => {
                    if (err) console.log(err);
                    next(null, null);
                  });
                },
                function (err, next) {
                  if (err) next(null, err);
                  shell.cd(rootPath);
                  shell.exec(
                    execute(
                      submission.language,
                      problem,
                      filename,
                      testfileName,
                      outputfileName,
                      timeMemoryfileName,
                    ),
                    function () {
                      next(null, null);
                    },
                  );
                },
                function (err, next) {
                  if (err) next(null, err);
                  try {
                    const expectedOutput = curTestcase.output.trim();

                    const actualOutput = fs
                      .readFileSync(outputfileName)
                      .toString()
                      .trim();
                    const timeMemoryOutput = fs
                      .readFileSync(timeMemoryfileName)
                      .toString()
                      .trim();

                    const arr = timeMemoryOutput.split('\n');
                    const time = arr.slice(-2)[0],
                      memory = arr.slice(-1)[0];

                    const curResult = {
                      actualOutput: actualOutput,
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
                      curResult.CE = true;
                      curResult.time = 0;
                      curResult.memory = 0;
                    } else if (actualOutput.includes('MLE'))
                      curResult.MLE = true;
                    else if (actualOutput.includes('TLE')) curResult.TLE = true;
                    else if (actualOutput.includes('RUNTIME ERROR'))
                      curResult.RTE = true;
                    else if (
                      op !== 'customInput' &&
                      actualOutput === expectedOutput
                    )
                      curResult.AC = true;
                    else if (op !== 'customInput') curResult.WA = true;

                    result.push(curResult);
                    cb();
                  } catch (err) {
                    // callback(err, null);
                    reject(err);
                  }
                },
              ]);
            },
            function (err) {
              if (err) {
                next(null, err);
              }
              next(null, null);
            },
          );
        },
        function (err) {
          // if (err) callback(err, null);
          if (err) reject(err);
          fs.rm(PATH.slice(0, -1), { recursive: true }, (err) => {
            // if (err) callback(err, null);
            // else callback(null, result);
            if (err) reject(err);
            else resolve(result);
          });
        },
      ]);
    } catch (error) {
      reject(error);
    }
  });
};

async function addSubmission({
  rootPath,
  problem,
  submission,
  op,
}): Promise<any[]> {
  return await test(rootPath, problem, submission, op);
}

// option
type Option = {
  rootPath?: string;
};

/**
 * @class CodeSandbox
 * @description CodeSandbox class
 * @param {Object} config
 */
export class CodeSandbox {
  private _config: Option;
  constructor(config: Option) {
    this._config = config;
  }
  async addSubmission({ problem, submission, op }): Promise<any[]> {
    return await addSubmission({
      rootPath: this._config.rootPath,
      problem,
      submission,
      op,
    });
  }
}
