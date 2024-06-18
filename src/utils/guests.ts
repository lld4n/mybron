export const ages = [
  "0 лет",
  "1 год",
  "2 года",
  "3 года",
  "4 года",
  "5 лет",
  "6 лет",
  "7 лет",
  "8 лет",
  "9 лет",
  "10 лет",
  "11 лет",
  "12 лет",
  "13 лет",
  "14 лет",
  "15 лет",
  "16 лет",
  "17 лет",
];

export function guests(adults: number, children: number[]) {
  let ans = adults + " ";
  if (adults === 1) ans += "взрослый";
  else ans += "взрослых";
  if (children.length > 0) {
    ans += ", " + children.length;
    if (children.length === 1) ans += "ребёнок";
    else ans += "ребёнка";
  }
  return ans;
}
