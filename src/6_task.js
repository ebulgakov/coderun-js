import rl from "./helpers/rl";

// Time Complexity: O((N + 1) * (M + 1))
function main(input) {
  const firstLinesCount = Number(input[0]);
  const firstLines = input[1].split(" ");
  const secondLinesCount = Number(input[2]);
  const secondLines = input[3].split(" ");

  /*
    Создаём матрицу из последовательности firstLines x secondLines.
    Делаем на один индекс больше, чем матрица, чтобы в заполнении мы случайно не ушли в отрицательные числа
   */
  const matrix = Array.from({ length: firstLinesCount + 1 }, () =>
    new Array(secondLinesCount + 1).fill(0)
  ); // O(N + 1)

  /*
   Для последовательности (8 2 3 5 1) x (1 2 3 4)
          (1) (2) (3) (4)
       0   0   0   0   0
   (8) 0   0   0   0   0
   (2) 0   0   1   1   1
   (3) 0   0   1   2   2
   (5) 0   0   1   2   2
   (1) 0   1   1   2   2
   Решение алгоритма тут: https://informatics.mccme.ru/mod/book/view.php?id=487
   */
  for (let firstLinesIdx = 1; firstLinesIdx <= firstLinesCount; firstLinesIdx += 1) {
    for (let secondLinesIdx = 1; secondLinesIdx <= secondLinesCount; secondLinesIdx += 1) {
      if (firstLines[firstLinesIdx - 1] === secondLines[secondLinesIdx - 1]) {
        matrix[firstLinesIdx][secondLinesIdx] = matrix[firstLinesIdx - 1][secondLinesIdx - 1] + 1;
      } else {
        matrix[firstLinesIdx][secondLinesIdx] = Math.max(
          matrix[firstLinesIdx][secondLinesIdx - 1],
          matrix[firstLinesIdx - 1][secondLinesIdx]
        );
      }
    }
  } // O((N + 1) * (M + 1))

  const LCS = [];
  {
    /*
     Мы точно знаем, что в правом нижнем углу будет индекс самой длиной последовательности.
     Нужно учитывать, что индекс может приходить не только по чистой диагонали, но и петляя -
     если есть несколько последовательностей,
    */
    let firstLinesIdx = firstLinesCount;
    let secondLinesIdx = secondLinesCount;

    while (firstLinesIdx > 0 && secondLinesIdx > 0) {
      if (firstLines[firstLinesIdx - 1] === secondLines[secondLinesIdx - 1]) {
        LCS.push(firstLines[firstLinesIdx - 1]);
        firstLinesIdx -= 1;
        secondLinesIdx -= 1;
      } else if (
        matrix[firstLinesIdx - 1][secondLinesIdx] > matrix[firstLinesIdx][secondLinesIdx - 1]
      ) {
        firstLinesIdx -= 1;
      } else {
        secondLinesIdx -= 1;
      }
    } // O((N + 1) + (M + 1)), потому что самое худшее, что может случиться, мы будем спускаться по одному из путей
  }

  console.log(LCS.reverse().join(" "));
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
