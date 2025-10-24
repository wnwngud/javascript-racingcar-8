import { MissionUtils } from "@woowacourse/mission-utils";

class App {
    async run() {
      let inputStr = await MissionUtils.Console.readLineAsync(
        "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준  으로 구분)\n"
      )
      let numRepeats = await MissionUtils.Console.readLineAsync(
        "시도할 횟수는 몇 회인가요?\n"
      )
  }
}

export default App;
