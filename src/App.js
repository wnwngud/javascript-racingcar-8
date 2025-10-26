import { MissionUtils } from "@woowacourse/mission-utils";

function isValidName(names) {
  // 차량이 공백 혹은 한 대만 입력됐을 때 예외 처리
  if (names.length < 2) throw new Error("[ERROR] 차량을 두 대 이상 입력해 주세요.");

  // 차량 명 글자 수 검사
  for (let i of names) {
    if (i.length > 5) throw new Error("[ERROR] 차량의 이름은 5자 이하로 입력해 주세요.");
  }

  return true;
}

function isValidNum(numRepeats) {
  let num = Number(numRepeats);

  if (isNaN(num) || numRepeats === "" || num < 1 || !Number.isInteger(num))
    throw new Error("[ERROR] 횟수는 1 이상의 정수만 입력해 주세요.");

  return true;
}

function extractNames(inputStr) {
  let names = inputStr.split(',');

  if (isValidName(names)) return names;
}

function strToNum(numRepeats) {
  isValidNum(numRepeats);

  return Number(numRepeats);
}

class App {
  async run() {
    let inputStr = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );
    let names = extractNames(inputStr);
    let numRepeats = await MissionUtils.Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?\n"
    );
    numRepeats = strToNum(numRepeats);
  }
}

export { App, isValidName, isValidNum };
