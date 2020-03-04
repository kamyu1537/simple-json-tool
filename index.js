const readline = require('readline');
const fs = require('fs');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.setPrompt('읽을 파일 경로를 입력해 주세요: ');

let originalJSON = '';
let index = 0;
let originalObject = '';
let originalKeys = [];
let result = {};
rl.on('line', input => {
  if (input === '!!!!') {
    fs.writeFileSync(
      path.join(process.cwd(), 'output.json'),
      JSON.stringify(result, null, 2)
    );
    process.exit();
  }

  if (originalJSON === '') {
    originalJSON = fs.readFileSync(input).toString('utf8');
    originalObject = JSON.parse(originalJSON);
    originalKeys = Object.keys(originalObject);

    result = originalObject;
    rl.setPrompt('> ');
  } else {
    // 여기는 등록하는곳
    const key = originalKeys[index];
    result[key] = input;

    index++;
  }

  if (index >= originalKeys.length) {
    fs.writeFileSync(
      path.join(process.cwd(), 'output.json'),
      JSON.stringify(result, null, 2)
    );
    process.exit();
  }

  rl.prompt();
});

rl.prompt();
