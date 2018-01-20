const addDays = (date, days) => {
  const tmpDate = new Date(date.valueOf());
  tmpDate.setDate(tmpDate.getDate() + days);
  return tmpDate;
};

export const datesRange = (startDate, stopDate) => {
  const dateRange = [];
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    dateRange.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dateRange;
};
