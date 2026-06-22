import rl from "./helpers/rl";

export const baseInput = ["31 34"];

for (let inputLineIdx = 0; inputLineIdx < baseInput.length; inputLineIdx++) {
  const inputLine = baseInput[inputLineIdx];
  rl.push(inputLine);
}
rl.end();

export function main(input) {
  const [config] = input;
  // rows - вертикаль (N)
  // cols - горизонталь (M)
  const [rows, cols] = config.split(" ").map(Number);
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));

  {
    /*
    // Идея в том, чтобы пройти по всем ячейкам и убедится, а был ли способ как-то на неё попасть из предыдущих ячеек.
        (0) (1) (2) (3) (4) (5) (6) (7) (8)
    (0)  1   0   0   0   0   0   0   0   0
    (1)  0   0   1   0   0   0   0   0   0
    (2)  0   1   0   0   1   0   0   0   0
    (3)  0   0   0   2   0   0   1   0   0
    (4)  0   0   1   0   0   3   0   0   1
    (5)  0   0   0   0   3   0   0   4   0
    (6)  0   0   0   1   0   0   6   0   0
    (7)  0   0   0   0   0   4   0   0   10
    // Начинаем с [1, 1], потому что нет никакого случая, чтобы Конь попал на [0, +∞] или [+∞, 0]
    // Каждый раз мы встаём на клетку мы приплюсовываем значения из предыдущих горизонтальной и вертикальной "Г"
    // Для примера:
    // попали на ячейку [3, 2] - плюсуем предыдущие значения из [2, 0] и [1, 1] - в обоих было по нулям, так что в [3, 2] так будет 0
    // попали на ячейку [6, 6] - плюсуем предыдущие значения из [5, 4] и [4, 5] - в обоих было по 3, так что в [6, 6] так будет 6
    */
    matrix[0][0] = 1;
    for (let rowIdx = 1; rowIdx < rows; rowIdx++) {
      for (let colIdx = 1; colIdx < cols; colIdx++) {
        if (rowIdx >= 2) {
          matrix[rowIdx][colIdx] += matrix[rowIdx - 2][colIdx - 1];
        }
        if (colIdx >= 2) {
          matrix[rowIdx][colIdx] += matrix[rowIdx - 1][colIdx - 2];
        }
      }
    }
  }

  console.log(matrix[rows - 1][cols - 1]);
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();
