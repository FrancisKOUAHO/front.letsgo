export const WEEK_DAYS = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
];

export const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

export const getDateShort = (longDate: Date) => {
  return `${
    longDate.getMonth() + 1
  }-${longDate.getDate()}-${longDate.getFullYear()}`;
};

export const getDateLong = (date: any) => {
  return new Date(date);
};


export const getSelectedDays = (date: Date) => {
  const givenDate = date || new Date();

  const days = [];
  for (let i = 0; i < 10; i++) {
    const day = new Date(
      givenDate.getFullYear(),
      givenDate.getMonth(),
      givenDate.getDate() + i
    );
    days.push({
      label: WEEK_DAYS[day.getDay()],
      date: day,
    });
  }

  return days;
};
