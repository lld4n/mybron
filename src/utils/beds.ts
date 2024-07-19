import { i18nTypeRU } from "./i18n";

export function beds(type: string, q: i18nTypeRU): string {
  //TODO: перевод
  console.log(q);
  if (type === "single") return "Односпальная кровать";
  if (type === "double") return "Двуспальная кровать";
  if (type === "sofa") return "Диван";
  if (type === "bunk-bed") return "Двухъярусная кровать";
  return "";
}
