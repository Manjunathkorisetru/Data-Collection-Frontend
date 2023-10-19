function formatDate(isoDateString: string | number | Date) {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if single-digit
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default formatDate;
