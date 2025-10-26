import { isValidName, isValidNum } from "../src/App";

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