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

  const path = new Array(N).fill(-1);

  {
    // BFS
    const seen = new Array(N).fill(false);
    seen[from] = true;

    const queue = [from];
    while (queue.length > 0) {
      const vertex = queue.shift();
      if (vertex === to) break;

      const relatedVertices = graph[vertex];
      for (let rVertexIdx = 0; rVertexIdx < relatedVertices.length; rVertexIdx += 1) {
        if (relatedVertices[rVertexIdx] === 0) continue;
        if (seen[rVertexIdx]) continue;

        seen[rVertexIdx] = true;
        queue.push(rVertexIdx);

        path[rVertexIdx] = vertex;
      }

      seen[vertex] = true;
    }
  }

  if (path[to] === -1) {
    console.log("-1");
    return;
  }

  const out = [];
  let curr = to;
  while (path[curr] !== -1) {
    out.push(path[curr]);
    curr = path[curr];
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

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
export const baseInput = [
  "10",
  "0 1 0 0 0 0 0 0 0 0",
  "1 0 0 1 1 0 1 0 0 0",
  "0 0 0 0 1 0 0 0 1 0",
  "0 1 0 0 0 0 1 0 0 0",
  "0 1 1 0 0 0 0 0 0 1",
  "0 0 0 0 0 0 1 0 0 1",
  "0 1 0 1 0 1 0 0 0 0",
  "0 0 0 0 0 0 0 0 1 0",
  "0 0 1 0 0 0 0 1 0 0",
  "0 0 0 0 1 1 0 0 0 0",
  "5 4"
];
rl.injectInput(baseInput);

export default main;
