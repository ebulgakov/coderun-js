function formatINR(paise: number): string {
  const paiseStr = String(Math.abs(paise)).split("").reverse();
  const paiseStrArr = paiseStr.slice();

  while (paiseStrArr.length < 3) {
    paiseStrArr.push("0");
  }
  const change = paiseStrArr.splice(0, 2).reverse().join("");
  const last = paiseStrArr.splice(0, 3).reverse().join("");
  const output = [change, ".", last];

  while (paiseStrArr.length > 0) {
    const part = paiseStrArr.splice(0, 2).reverse().join("");
    output.push(",", part);
  }

  output.push("₹");
  if (paise < 0) {
    output.push("-");
  }

  return output.reverse().join("");
}

export default formatINR;
