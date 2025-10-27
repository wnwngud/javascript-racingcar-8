import { isValidName, isValidNum, attemptMoveCars, playCarRacing, finalWinner } from "../src/App";
import { MissionUtils } from "@woowacourse/mission-utils";

// 차량 명 입력 테스트
describe.each([
    [["pobi", "woni"], 0],
    [["pobbbbi", "woni"], 1],
    [["pobi"], 2],
    [[""], 3]
])("isValidName(%s)", (names, caseNumber) => {
    if (caseNumber === 0)
        it("차량 이름 양식 검사: 정상 입력", () => { expect(isValidName(names)).toBe(true); });

    else if (caseNumber === 1)
        it("차량 이름 양식 검사: 차량 명의 길이가 6 이상인 경우", () => { expect(() => isValidName(names)).toThrow("[ERROR] 차량의 이름은 5자 이하로 입력해 주세요."); });

    else
        it("차량 이름 입력 양식 검사: 차량 명을 2대 미만으로 입력한 경우", () => { expect(() => isValidName(names)).toThrow("[ERROR] 차량을 두 대 이상 입력해 주세요."); });
});

// 반복 횟수 입력 테스트
describe.each([
    ["1", 0],
    ["abc", 1],
    ["1a", 1],
    ["", 2],
    ["-1", 3],
    ["1.1", 4]
])("isValidNum(%s)", (inputs, caseNumber) => {
    if (caseNumber === 0)
        it("반복횟수 양식 검사: 정상 입력", () => { expect(isValidNum(inputs)).toBe(true); });

    else
        it("반복횟수 양식 검사: 숫자가 아닌 경우", () => { expect(() => isValidNum(inputs)).toThrow("[ERROR] 횟수는 1 이상의 정수만 입력해 주세요."); });
});

// 차량 전진 테스트
const mockRandoms = (numbers) => {
    MissionUtils.Random.pickNumberInRange = jest.fn();

    numbers.reduce((acc, number) => {
        return acc.mockReturnValueOnce(number);
    }, MissionUtils.Random.pickNumberInRange);
};

describe.each([
    [["pobi", "woni"], ["-", ""], [4, 1]]
])("attemptMoveCars(%s)", (names, moveCount, randomNum) => {
    it("차량 전진 테스트", () => {
        mockRandoms(randomNum);
        attemptMoveCars(names, moveCount);
        expect(moveCount).toEqual(["--", ""])
    });
});

// 게임 결과 출력 테스트
const getLogSpy = () => {
    const logSpy = jest.spyOn(MissionUtils.Console, "print");
    logSpy.mockClear();
    return logSpy;
};

describe.each([
    [["pobi", "woni"], 1, [4, 1]]
])("playCarRacing(%s)", (names, numRepeats, randomNum) => {
    it("게임 결과 출력 테스트", () => {
        let logs = ["실행 결과", "pobi : -", "woni : "]
        let logSpy = getLogSpy();

        mockRandoms(randomNum);
        playCarRacing(names, numRepeats);

        logs.forEach((log) => { expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log)); });
    });
});

// 최종 우승자 출력 테스트
describe.each([
    [["pobi", "woni", "jun"], ['---', '-', '-'], 0],
    [["pobi", "woni", "jun"], ['---', '--', '---'], 1]
])("finalWinner(%s, %s)", (names, moveCount, caseNumber) => {
    if (caseNumber === 0)
        it("최종 우승자 출력 테스트: 우승자 1명의 경우", () => { expect(finalWinner(names, moveCount)).toEqual(["pobi"]); });

    else
        it("최종 우승자 출력 테스트: 우승자 2명 이상의 경우", () => { expect(finalWinner(names, moveCount)).toEqual(["pobi", "jun"]); });
})