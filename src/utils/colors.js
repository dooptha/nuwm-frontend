function hashCode(str) { // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  // eslint-disable-next-line
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

export function getColorFromString(str) {
  return str && str !== ''
    ? `#${intToRGB(hashCode(str))}`
    : null;
}

export function blendColors(colorA, colorB, amount) {
  const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export function getSenderColor(str, combinedColor, amount = 1) {
  return blendColors(combinedColor, getColorFromString(str), amount);
}
