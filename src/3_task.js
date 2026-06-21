import rl from "./helpers/rl";

export const baseInput = ["5 5", "9 9 9 9 9", "3 0 0 0 0", "9 9 9 9 9", "6 6 6 6 8", "9 9 9 9 9"];

for (let inputLineIdx = 0; inputLineIdx < baseInput.length; inputLineIdx++) {
  const inputLine = baseInput[inputLineIdx];
  rl.push(inputLine);
}
rl.end();

export function main(input) {
  const [config, ...lines] = input;
  // rows - вертикаль (N)
  // cols - горизонталь (M)
  const [rows, cols] = config.split(" ").map(Number);

  const matrix = Array.from({ length: rows }, (_, rowIdx) => lines[rowIdx].split(" ").map(Number));
  const sumMatrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
  const pathMatrix = Array.from({ length: rows }, () => new Array(cols).fill(""));

  for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
    for (let colIdx = 0; colIdx < cols; colIdx++) {
      const fromTop = sumMatrix[Math.max(0, rowIdx - 1)][colIdx];
      const fromLeft = sumMatrix[rowIdx][Math.max(0, colIdx - 1)];

      if (fromTop > fromLeft) {
        sumMatrix[rowIdx][colIdx] = fromTop + matrix[rowIdx][colIdx];
        pathMatrix[rowIdx][colIdx] = "D";
      } else {
        sumMatrix[rowIdx][colIdx] = fromLeft + matrix[rowIdx][colIdx];
        pathMatrix[rowIdx][colIdx] = "R";
      }
    }
  }

  const foundPath = [];
  let rowsPath = rows - 1;
  let colsPath = cols - 1;

  while (rowsPath > 0 || colsPath > 0) {
    const move = pathMatrix[rowsPath][colsPath];
    foundPath.push(move);
    if (move === "D") {
      rowsPath -= 1;
    } else {
      colsPath -= 1;
    }
  }

  console.log(sumMatrix[rows - 1][cols - 1]);
  console.log(foundPath.reverse().join(" "));
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();
