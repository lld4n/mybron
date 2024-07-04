import { i18nTypeRU } from "./i18n";

interface Months {
  type: "line" | "name";
  name: string;
  values: MonthsValue[];
}

type MonthsValue = {
  real: Date;
  day: number;
  disabled: boolean;
  position: "left" | "middle" | "right";
} | null;

export function months(q: i18nTypeRU) {
  const currentDate = new Date();
  const currentDateStart = new Date();
  currentDateStart.setHours(0, 0, 0, 0);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const allMonths: Date[][] = [];

  for (let i = 0; i < 12; i++) {
    const month = (currentMonth + i) % 12;
    const year = currentYear + Math.floor((currentMonth + i) / 12);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthDates: Date[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      monthDates.push(new Date(year, month, day));
    }

    allMonths.push(monthDates);
  }
  const ans: Months[] = [];
  for (const month of allMonths) {
    const monthName = month[0].toLocaleDateString(q.slug.toUpperCase(), {
      month: "long",
      year: "numeric",
    });
    ans.push({
      type: "name",
      name: monthName,
      values: [],
    });
    let value: MonthsValue[] = [];
    const start = month[0];
    if (start.getDay() === 1) {
      value.push({
        real: start,
        day: start.getDate(),
        disabled: currentDateStart.getTime() > start.getTime(),
        position: "left",
      });
    } else {
      let i = 0;
      while (i !== start.getDay()) {
        value.push(null);
        i++;
      }
      value.push({
        real: start,
        day: start.getDate(),
        disabled: currentDateStart.getTime() > start.getTime(),
        position: "left",
      });
    }
    for (let i = 1; i < month.length; i++) {
      const d = month[i];
      if (d.getDay() === 1) {
        ans.push({
          type: "line",
          name: "",
          values: line(value),
        });
        value = [];
      }
      value.push({
        real: d,
        day: d.getDate(),
        disabled: currentDateStart.getTime() > d.getTime(),
        position: d.getDay() === 0 ? "right" : d.getDay() === 1 ? "left" : "middle",
      });
    }
    if (value.length > 0) {
      while (value.length !== 7) {
        value.push(null);
      }
      ans.push({
        type: "line",
        name: "",
        values: line(value),
      });
    }
  }

  // console.log(ans);
  return ans;
}

export function line(value: MonthsValue[]) {
  while (value.length > 7) {
    value.shift();
  }
  while (value.length < 7) {
    value.unshift(null);
  }
  return value;
}

export function dates(
  date: Date,
  q: i18nTypeRU,
  options?: {
    week?: boolean;
    sameMonth?: boolean;
  },
) {
  const dayName = date.getDate();
  const weekName = q.weeks[date.getDay()];
  const monthName = q.months[date.getMonth()];

  let ans = dayName + " ";
  if (!options?.sameMonth) {
    ans += monthName;
  }
  if (options?.week) {
    ans += ", " + weekName;
  }

  return ans;
}

export function dateToApi(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function nightsRange(d1: Date, d2: Date) {
  const differenceMs = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
}
