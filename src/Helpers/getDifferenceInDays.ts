const getDifferenceInDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();

  return Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
};

export default getDifferenceInDays