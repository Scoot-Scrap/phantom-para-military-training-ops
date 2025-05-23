export async function computeHeavy(x, y) {
  const resp = await fetch("/wasm/calc.wasm");
  const bytes = await resp.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes);
  return instance.exports.compute(x, y);
}
