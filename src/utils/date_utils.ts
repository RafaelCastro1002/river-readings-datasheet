export const toDateString = (date: Date) => date.toLocaleDateString();

export const subtractDays = (numOfDays = 0, date = new Date()) => {
  date.setDate(date.getDate() - numOfDays);

  return date;
};
