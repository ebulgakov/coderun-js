import rl from "./helpers/rl";

// Time Complexity: O(N + M) - DFS или формирование графа
function main(input) {
  const [config, ...verticesStings] = input;
  // N - вершина, целое число (1≤N≤10^3)
  // M - ребро, целое число (0≤M≤5×10^5) - в решении не используется
  const [N, M] = config.split(" ").map(Number);

  // Избавляемся от пустых строк которые могут прилететь в рантайме, а заодно и кратных рёбер (дубликатов) в графе
  const uniqVertices = Array.from(new Set(verticesStings.filter(Boolean))); // O(N)

  // Разбираем строки с вершинами. Number(edge) - 1 нужен, чтобы когда создавали
  // граф не нужно было делать "vertex1-1" и "vertex2-1"
  const vertices = uniqVertices.map(str => str.split(" ").map(vertex => Number(vertex) - 1)); // O(M)

  const graph = Array.from({ length: N }, () => []); // O(N)

  for (const [vertex1, vertex2] of vertices) {
    // Избавляемся от петель в графе
    if (vertex1 !== vertex2) {
      // Собираем соседей внутри графа
      // Это значит, что если вершина vertex1 связана с vertex2, то и обратное верно
      graph[vertex1].push(vertex2);
      graph[vertex2].push(vertex1);
      /*
        Для базового решения получится массив
        [
          [ 2 ],
          [ 2, 3 ],
          [ 3, 1, 0 ],
          [ 2, 1 ]
        ]
        // Считаем от нуля, потому что я специально уменьшил на единицу выше по функции
        // Описав это графом, то получим
               (0)
                \
          (1) -- (2)
            \    |
             (3)
         // Потому [ 2 ] - это вершина (0), которая соединена с вершиной (2)
                   [ 2, 3 ] - это вершина (1), которая соединена с вершинами (2) и (3)
                   [ 3, 1, 0 ] - это вершина (2), которая соединена с вершинами (0), (1) и (3)
                   [ 2, 1 ] - это вершина (3), которая соединена с вершинами (1) и (2)
       */
    }
  } // O(M)

  // По-умолчанию, ни в одну вершину мы не можем попасть, как будто они не связаны рёбрами
  const seen = Array(N).fill(false); // O(N)

  // DFS поможет пройти по каждой вершине и найти к ним рёбра
  (function dfs(vertex) {
    // Учитывая, что мы можем прийти в одну вершину разными путями, к примеру из (1) в (3), а потом обратно
    // то нужно убрать бесконечную рекурсию
    if (seen[vertex]) return;
    seen[vertex] = true;

    const relatedVertices = graph[vertex];
    for (let vertexIdx = 0; vertexIdx < relatedVertices.length; vertexIdx += 1) {
      const relatedVertex = relatedVertices[vertexIdx];
      dfs(relatedVertex);
    }
  })(0); // Идём с нулевой вершины самый тяжёлый алгоритм - O(N + M) - потому что каждая вершина и ребро посещается ровно один раз

  // Формируем решение
  const verticesConnectivity = [];
  for (let vertex = 0; vertex < N; vertex += 1) {
    if (seen[vertex]) {
      // +1 нужен, чтобы вернуть индексацию уменьшенную при инициализации vertices
      verticesConnectivity.push(vertex + 1);
    }
  } // O(N)

  console.log(verticesConnectivity.length);
  console.log(verticesConnectivity.join(" "));
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
export const baseInput = ["4 5", "2 2", "3 4", "2 3", "1 3", "2 4"];
rl.injectInput(baseInput);

export default main;
