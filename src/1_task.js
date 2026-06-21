import rl from "./helpers/rl";

rl.push(" 3 1 3");
rl.end();

export function main(lines) {
  const out = lines[0]
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  console.log(out[1]);
}

(async function runner() {
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }

  main(lines);
})();
