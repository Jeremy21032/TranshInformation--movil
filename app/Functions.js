export const completeNumber = (number) => {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
};

export const formattedDate = (date) => {
  return (
    completeNumber(date.getDate()) +
    "/" +
    completeNumber(date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
};
