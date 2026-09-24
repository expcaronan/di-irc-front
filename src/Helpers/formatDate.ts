const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // month 0-11
  const day = d.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`; // yyyy-MM-dd
};


  export default formatDate