export function guests(adults: number, children: number): string {
  let ans = "";
  if (adults === 1) ans += adults + " взрослый";
  else ans += adults + " взрослых";

  if (children > 0) ans += ", ";

  if (children === 1) ans += children + " ребенок";
  else if (children <= 4 && children > 1) ans += children + " ребенка";
  else if (children > 1) ans += children + " детей";

  return ans;
}
