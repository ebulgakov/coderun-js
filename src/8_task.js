import rl from "./helpers/rl";

// Time Complexity: O(N + M)
function main(input) {
  const [config, ...verticesStings] = input;
  // N - вершина, целое число (0 < N ≤ 100000)
  // M - ребро, целое число (0 ≤ M ≤ 100000) - в решении не используется
  const [N, M] = config.split(" ").map(Number);

  const vertices = verticesStings.map(str => str.split(" ").map(vertex => Number(vertex) - 1)); // O(L), где L - verticesStings, кол-во пар
  const graph = Array.from({ length: N }, () => []); // O(N)

  for (const [vertex1, vertex2] of vertices) {
    graph[vertex1].push(vertex2);
    graph[vertex2].push(vertex1);
  } // O(M)

  const seen = new Array(N).fill(false); // O(N)

  /*
   Первая попытка была решить эту задачу через обычный рекурсивный DFS
   наткнулся на ошибку "RangeError: Maximum call stack size exceeded"
   так как в рекурсии на JS глубины больше 100k быть не может.
   */
  function dfsIterative(startVertex, comp) {
    const stack = [startVertex];
    while (stack.length > 0) {
      const vertex = stack.pop();
      if (seen[vertex]) continue;

      seen[vertex] = true;
      comp.push(vertex);

      for (const related of graph[vertex]) {
        if (!seen[related]) {
          stack.push(related);
        }
      }
    }
  } // O(N + M)

  const components = [];
  for (let vertex = 0; vertex < N; vertex += 1) {
    // Избежать повторных прохождений внутри компоненты
    // Пример: для компоненты [1, 2, 3] нужно пройти один раз.
    //         Компоненты [2, 3] и [3] будут ошибкой
    if (!seen[vertex]) {
      const comp = [];
      dfsIterative(vertex, comp);
      components.push(comp);
    }
  } // O(N)

  // Вывод решения
  console.log(components.length);
  for (const comp of components) {
    console.log(comp.length);
    console.log(comp.map(v => v + 1).join(" "));
  } // O(C)
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
export const baseInput = ["6 4", "3 1", "1 2", "5 4", "2 3"];
rl.injectInput(baseInput);

export default main;
