import rl from "./helpers/rl";

function generateOptions(count, lines) {
  const matrix = [].concat(lines);

  for (let beginIdx = 0, endIdx = count; beginIdx < count, endIdx > 0; beginIdx++, endIdx--) {
    matrix.push(lines.slice(beginIdx, count).join(" "));
    matrix.push(lines.slice(0, count - endIdx + 1).join(" "));
  }

  return new Set(matrix);
}

function main(input) {
  const firstLinesCount = Number(input[0]);
  const firstLines = input[1].split(" ");
  const secondLinesCount = Number(input[2]);
  const secondLines = input[3].split(" ");

  const optionOne = generateOptions(firstLinesCount, firstLines);
  const optionTwo = generateOptions(secondLinesCount, secondLines);

  let nop = "";
  optionOne.forEach(val => {
    if (optionTwo.has(val) && val.length > nop.length) {
      nop = val;
    }
  });

  console.log(nop);
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
export const baseInput = ["3", "1 2 3", "3", "2 3 1"];
rl.injectInput(baseInput);

export default main;
