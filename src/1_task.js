import rl from "./helpers/rl";

// Time Complexity O(N log N)
function main(lines) {
  const out = lines[0]
    .trim()
    .split(" ")
    .map(Number) // O(N)
    .sort((a, b) => a - b); // O(N log N), потому что алгоритм Timesort
  console.log(out[1]);
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();

/************* ЗАВИСИМОСТИ ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ *************/
export const baseInput = ["1 2 3"];
rl.injectInput(baseInput);

export default main;
