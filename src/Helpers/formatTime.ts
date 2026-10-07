const formatTime = (inputDate: string): string => {
  const dateObj = new Date(inputDate); // parsed in local time automatically

  let hours = dateObj.getHours(); // local hours
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12 for 12-hour clock
  const hoursStr = hours.toString().padStart(2, '0');

  return `${hoursStr}:${minutes}:${seconds} ${ampm}`;
};

export default formatTime;
