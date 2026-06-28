import rl from "./helpers/rl";

function main(input) {
  const N = Number(input.shift());

  // Получаем начальную и конечную вершину пути. Уменьшаем индекс на единицу,
  // чтобы было удобнее сравнивать в BFS индексы
  const [from, to] = input
    .pop()
    .split(" ")
    .map(v => Number(v) - 1);

  if (from === to) {
    console.log(0);
    return;
  }

  const graph = Array.from({ length: N }, (_, idx) => input[idx].split(" ").map(Number));

  const connectivity = new Array(N).fill(-1);

  {
    /*
      // BFS
      Идея поиска пройти по всем ребрам и найти общие. Давайте соберём граф из матрицы базового условия:
      "0 1 0 0 1", - (0) связан с (1) и (4)
      "1 0 1 0 0", - (1) связан с (0) и (2)
      "0 1 0 0 0", - (2) связан с (1)
      "0 0 0 0 0", - (3) не имеет единой компоненты с графом
      "1 0 0 0 0", - (4) - связан с (0)

            (0)    (3)
            |  \
         (1)    (4)
           \
           (2)

     */

    // Формируем массив с посещёнными вершинами. Это нужно, чтобы проходить одну вершину единожды и
    // не уйти в бесконечный цикл. Сразу же заносим в посещённые начальную вершину, так как её
    // обязательно нужно будет пройти по пути в финальной вершине
    const seen = new Array(N).fill(false);
    seen[from] = true;

    const queue = [from];

    /*
     // Начальные условия
     queue = [2]
     seen = [false, false, true, false, false]
     path = [-1, -1, -1, -1, -1]
    */
    while (queue.length > 0) {
      const vertex = queue.shift();
      // Здесь оптимистическая часть по окончанию алгоритма - финальная вершина найдена.
      if (vertex === to) break;

      /*
        // Проходим по каждой смежной вершине. Очень похоже на DFS. Как это работает для базового условия:
        // // Находим начальную вершину (2) из очереди. У неё смежные высоты [0 1 0 0 0]. Точнее, только одна (1).
        // // Добавляем её в очередь на исследование, а connectivity обновляем с [-1 2 -1 -1 -1]
        // // Получается, что в вершину (1) мы можем попасть из вершины (2)

        // // Исследуем вершину (1) из очереди. У неё смежные высоты [1 0 1 0 0]. Нам подойдёт только (0), так как
        // // в вершине (2) мы уже были (начальная вершина)
        // // Добавляем её в очередь на исследование, а connectivity обновляем с [1 2 -1 -1 -1]
        // // Получается, что в вершину (0) мы можем попасть из вершины (1)

        // Так, шаг за шагом, мы либо найдём конечную вершину или просто обойдём все вершины
       */
      const relatedVertices = graph[vertex];
      for (let rVertexIdx = 0; rVertexIdx < relatedVertices.length; rVertexIdx += 1) {
        if (relatedVertices[rVertexIdx] === 0) continue;
        if (seen[rVertexIdx]) continue;

        seen[rVertexIdx] = true;
        queue.push(rVertexIdx);

        connectivity[rVertexIdx] = vertex;
      }

      seen[vertex] = true;
    }
  }

  // Если прошли весь алгоритм, но нак и не нашли финальную вершину
  if (connectivity[to] === -1) {
    console.log("-1");
    return;
  }

  /*
  Вот наш путь: [1, 2, -1, -1, 0]
  Мы точно знаем, что финальная точка существует. Доходим с финальной точки до начальной. Где будет -1 - это начальная вершина
  */

  const out = [];
  let curr = to;
  while (connectivity[curr] !== -1) {
    out.push(connectivity[curr]);
    curr = connectivity[curr];
  }

  if (out.length > 0) {
    console.log(out.length);
  } else {
    console.log("-1");
  }
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();

export const baseInput = [
  "5",
  "0 1 0 0 1",
  "1 0 1 0 0",
  "0 1 0 0 0",
  "0 0 0 0 0",
  "1 0 0 0 0",
  "3 5"
];
rl.injectInput(baseInput);

export default main;
