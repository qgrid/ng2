/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const cmdArgs = require('command-line-args');
const { relativeCopySync, toComponentName } = require('./build.kit');

const ROOT_PATH = path.resolve('.');
const EXAMPLES_PATH = path.join(ROOT_PATH, './packages/qgrid-ngx-examples/src/examples');
const TARGET_REPO_PATH = path.join(ROOT_PATH, '../ng2-example');
const REPO_URL = 'https://github.com/qgrid/ng2-example.git';

const args = cmdArgs([
  {
    name: 'version',
    alias: 'v',
    type: String,
    defaultValue: 'latest',
  },
  {
    name: 'pattern',
    alias: 'p',
    type: String,
    defaultValue: '',
  },
  {
    name: 'silent',
    alias: 's',
    type: Boolean,
    defaultValue: false,
  },
]);

const { version, silent, pattern } = args;

console.log(`------CLONE ${REPO_URL}------`);
const rmParams = ['-rf', TARGET_REPO_PATH];
shell.rm(...rmParams);
shell.exec(`git clone ${REPO_URL} ${TARGET_REPO_PATH}`);
shell.cd(TARGET_REPO_PATH);

console.log(`------READ ${EXAMPLES_PATH}/${pattern}------`);
const examples = fs
  .readdirSync(EXAMPLES_PATH)
  .filter(dir => dir.includes(pattern));

examples.forEach(example => {
  const examplePath = path.join(EXAMPLES_PATH, example);
  const stats = fs.lstatSync(examplePath);
  if (!stats.isDirectory() || fs.readdirSync(examplePath).length === 0) {
    return;
  }

  const branch = `${example}/${version}`;
  console.log(`------${branch.toUpperCase()}------`);

  shell.exec('git checkout master', { silent });

  // remove branch for this example if it exists
  shell.exec(`git push -d origin ${branch}`, { silent });
  shell.exec(`git branch -D ${branch}`, { silent });
  shell.exec(`git checkout -b ${branch}`, { silent });

  // copy files from example to bucket
  const src = path.join(EXAMPLES_PATH, example);
  const dst = path.join(TARGET_REPO_PATH, 'src', 'app');

  const visit = ({ dstPath, content }) => {
    const ext = path.extname(dstPath);
    const baseName = path.basename(dstPath, ext);
    if (baseName === `example-${example}.component`) {
      dstPath = path.join(path.dirname(dstPath), `app.component${ext}`);
      if (ext === '.ts') {
        content = content
          .replace(`'example-${example}'`, '\'my-app\'')
          .replace(`'example-${example}.component.html'`, '\'app.component.html\'')
          .replace(`'example-${example}.component.scss'`, '\'app.component.scss\'')
          .replace(`Example${toComponentName(example)}Component`, 'AppComponent');

        console.log(toComponentName(example));
      }
    }

    return { dstPath, content };
  };

  relativeCopySync('**/*', src, dst, visit);

  shell.exec('git add -A');
  shell.exec(`git commit -m "example/${branch}"`, { silent });
  shell.exec(`git push -u origin ${branch}`, { silent });
});

shell.cd(__dirname);
shell.rm(...rmParams);
