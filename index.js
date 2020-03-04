const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.setPrompt('읽을 파일 경로를 입력해 주세요: ');

let obj = {};
let keys = [];
let index = 0;
let result = {};

// 결과값 저장
function save() {
  fs.writeFileSync(
    path.join(process.cwd(), 'output.json'),
    JSON.stringify(result, null, 2)
  );
}

// 입력 받을때
rl.on('line', input => {
  if (input === '!!!!') process.exit(0);

  if (keys.length < 1) {
    obj = require(input);
    keys = Object.keys(obj);

    result = obj;
    rl.setPrompt('> ');
  } else {
    const key = keys[index];
    result[key] = input;
    index++;
  }

  if (index >= keys.length) process.exit(0);
  rl.prompt();
});

// 종료될때 코드가 0일 경우 저장
process.on('exit', code => {
  if (code === 0) save();
});

rl.prompt();
