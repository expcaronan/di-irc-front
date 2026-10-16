const toDateOnly = (value: string | Date) => {
  if (value instanceof Date) {
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );
  }

  const [year, month, day] = value
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
};

export default toDateOnly;