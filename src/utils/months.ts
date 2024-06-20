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

export function months() {
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
    const monthName = month[0].toLocaleDateString("RU-ru", {
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

  console.log(ans);
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
