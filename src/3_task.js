import rl from "./helpers/rl";

// Time Complexity: O(N * M), где N - это rows, а M - cols
function main(input) {
  const [config, ...lines] = input;
  // rows - вертикаль (N)
  // cols - горизонталь (M)
  const [rows, cols] = config.split(" ").map(Number);

  const matrix = Array.from({ length: rows }, (_, rowIdx) => lines[rowIdx].split(" ").map(Number)); // O(N * M)
  const sumMatrix = Array.from({ length: rows }, () => new Array(cols).fill(0)); // O(N)
  const pathMatrix = Array.from({ length: rows }, () => new Array(cols).fill("")); // O(N)

  {
    /*
     // сделаем подготовку для вложенного for, чтобы не пришлось сравнивать < 0
     x x x
     x 0 0
     x 0 0
     */

    // горизонтально считаем верхнюю строку
    sumMatrix[0][0] = matrix[0][0];
    for (let colIdx = 1; colIdx < cols; colIdx++) {
      sumMatrix[0][colIdx] = sumMatrix[0][colIdx - 1] + matrix[0][colIdx];
      pathMatrix[0][colIdx] = "R";
    } // O(M)

    // вертикально считаем первый нижний столбец
    for (let rowIdx = 1; rowIdx < rows; rowIdx++) {
      sumMatrix[rowIdx][0] = sumMatrix[rowIdx - 1][0] + matrix[rowIdx][0];
      pathMatrix[rowIdx][0] = "D";
    } // O(N)
  }

  /*
   // обрабатываем построчно оставшиеся нули для x5 x6, x8 x9
   x1 x2 x3
   x4 x5 x6
   x7 x8 x9
   // если x2 > x4, то в x5 будет число x2 + x5
   // если x3 < x5, то в x6 будет число x5 + x6
   // в конечном счёте мы знаем что в x9 будет максимальная возможная сумма
   */
  for (let rowIdx = 1; rowIdx < rows; rowIdx++) {
    for (let colIdx = 1; colIdx < cols; colIdx++) {
      const fromTop = sumMatrix[rowIdx - 1][colIdx];
      const fromLeft = sumMatrix[rowIdx][colIdx - 1];

      if (fromTop > fromLeft) {
        sumMatrix[rowIdx][colIdx] = fromTop + matrix[rowIdx][colIdx];
        pathMatrix[rowIdx][colIdx] = "D";
      } else {
        sumMatrix[rowIdx][colIdx] = fromLeft + matrix[rowIdx][colIdx];
        pathMatrix[rowIdx][colIdx] = "R";
      }
    }
  } // O(N * M)

  /*
   благодаря тому, что на предыдущем шаге в pathMatrix записывалась история откуда вёлся подсчёт:
   сверху или слева, то можно прокрутить историю в обратном направлении до 0, 0
   */
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
  } // O(N * M), потому что он в худшем случае может обойти всю матрицу

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

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
export const baseInput = ["5 5", "9 9 9 9 9", "3 0 0 0 0", "9 9 9 9 9", "6 6 6 6 8", "9 9 9 9 9"];
rl.injectInput(baseInput);

export default main;
