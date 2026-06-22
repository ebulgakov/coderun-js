import rl from "./helpers/rl";

function main(input) {
  const [config, ...lines] = input;
  const [rows, cols] = config.split(" ").map(Number);

  const matrix = Array.from({ length: rows }, (_, rowIdx) => lines[rowIdx].split(" ").map(Number));
  const sumMatrix = Array.from({ length: rows }, () => new Array(cols).fill(0));

  /* Считаем вершины */
  // Подробнее о том, ПОЧЕМУ так сделано есть разбор в 3_task.js
  sumMatrix[0][0] = matrix[0][0];
  for (let colIdx = 1; colIdx < cols; colIdx += 1) {
    sumMatrix[0][colIdx] = sumMatrix[0][colIdx - 1] + matrix[0][colIdx];
  }
  for (let rowIdx = 1; rowIdx < rows; rowIdx += 1) {
    sumMatrix[rowIdx][0] = sumMatrix[rowIdx - 1][0] + matrix[rowIdx][0];
  }

  /* Считаем остальное */
  for (let colIdx = 1; colIdx < cols; colIdx += 1) {
    for (let rowIdx = 1; rowIdx < rows; rowIdx += 1) {
      const fromTop = sumMatrix[rowIdx][colIdx - 1];
      const fromLeft = sumMatrix[rowIdx - 1][colIdx];

      if (fromTop < fromLeft) {
        sumMatrix[rowIdx][colIdx] = fromTop + matrix[rowIdx][colIdx];
      } else {
        sumMatrix[rowIdx][colIdx] = fromLeft + matrix[rowIdx][colIdx];
      }
    }
  }

  console.log(sumMatrix[rows - 1][cols - 1]);
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
export const baseInput = [
  "5 5",
  "1 1 1 1 1",
  "3 100 100 100 100",
  "1 1 1 1 1",
  "2 2 2 2 1",
  "1 1 1 1 1"
];
rl.injectInput(baseInput);

export default main;
