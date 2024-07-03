import { i18nTypeRU } from "./i18n";

export function guests(adults: number, children: number[], q: i18nTypeRU) {
  let ans = adults + " ";
  if (adults === 1) ans += q.guests.function.oneAdult;
  else ans += q.guests.function.moreAdult;
  if (children.length > 0) {
    ans += ", " + children.length + " ";
    if (children.length === 1) ans += q.guests.function.oneChildren;
    else ans += q.guests.function.moreChildren;
  }
  return ans;
}
