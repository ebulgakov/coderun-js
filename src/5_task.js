import rl from "./helpers/rl";

function main(input) {
  const [config, ...source] = input;
  const days = Number(config);
  const maxCoupons = days + 1;
  const prices = source.map(Number);
  /*
      C C C C C
    D I I I I I
    D I I I I I
    D I I I I I
    D I I I I I
   */

  const matrix = Array.from({ length: days }, () => Array(maxCoupons).fill(Infinity));

  // 0 дней -> 0 затрат
  matrix[0][0] = 0;
  for (let dayIdx = 0; dayIdx < days; dayIdx += 1) {
    const price = prices[dayIdx];

    for (let couponIdx = 0; couponIdx < maxCoupons; couponIdx += 1) {
      if (matrix[dayIdx][couponIdx] === Infinity) continue;
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
export const baseInput = ["5", "35", "40", "101", "59", "63"];
rl.injectInput(baseInput);

export default main;
