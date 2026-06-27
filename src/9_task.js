import rl from "./helpers/rl";

function main(input) {
  const [config, ...verticesStings] = input;
  // N - количество студентов (1≤N≤10^2)
  // M - количество пар студентов (0≤M≤N(N−1)/2)
  const [N, M] = config.split(" ").map(Number);

  const vertices = verticesStings.map(str => str.split(" ").map(vertex => Number(vertex) - 1));
  const graph = Array.from({ length: N }, () => []);

  for (const [vertex1, vertex2] of vertices) {
    if (vertex1 !== vertex2) {
      graph[vertex1].push(vertex2);
      graph[vertex2].push(vertex1);
    }
  }

  const unvisited = Array.from({ length: N }, (_, idx) => idx);

  console.log(unvisited);
  const group1 = [];
  const group2 = [];

  while (unvisited.length > 0) {
    const startVertex = unvisited.pop();
    group1.push(startVertex);

    const stack = [startVertex];

    while (stack.length > 0) {
      const vertex = stack.pop();
      const group = group1.includes(vertex) ? group1 : group2;
      const cheatGroup = group1.includes(vertex) ? group2 : group1;

      for (let vertexIdx = 0; vertexIdx < graph[vertex]; vertexIdx += 1) {}
    }
  }
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
//export const baseInput = ["3 2", "1 2", "2 3"];
export const baseInput = ["3 3", "1 2", "2 3", "1 3"];
rl.injectInput(baseInput);

export default main;
