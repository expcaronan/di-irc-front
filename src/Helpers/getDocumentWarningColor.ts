const getDocumentWarningColor = (date: string | Date): string => {
  const dueDate = new Date(date);
  const today = new Date();


const differenceInDays = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
);

let rowClass = "";

if (differenceInDays < 0) {
    rowClass = "action-overdue";
} else if (differenceInDays <= 3) {
    rowClass = "action-due-soon";
} else if (differenceInDays <= 7) {
    rowClass = "action-approaching";
}else{
    rowClass = "action-normal"
}
return rowClass;
};


  export default getDocumentWarningColor