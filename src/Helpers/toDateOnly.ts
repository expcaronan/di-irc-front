// const toDateOnly = (value: string | Date) => {
//   if (value instanceof Date) {
//     return new Date(
//       value.getFullYear(),
//       value.getMonth(),
//       value.getDate()
//     );
//   }

//   const [year, month, day] = value
//     .split("-")
//     .map(Number);

//   return new Date(year, month - 1, day);
// };

// export default toDateOnly;

const toDateOnly = (value: string | Date) => {
    if (value instanceof Date) {
        return new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
        );
    }

    const datePart = value.split("T")[0];

    const [year, month, day] = datePart.split("-").map(Number);

    return new Date(year, month - 1, day);
};

export default toDateOnly;