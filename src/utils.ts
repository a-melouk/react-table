// "First name": "John",
//     "Last name": "Doe",
//     "Birth date": "01/01/1990",
//     "Street": "123 Main St",
//     "City": "Boston",
//     "State": "MA",
//     "ZIP": "02108",
//     "Department": "Sales",
//     "Start date": "03/15/2023"

import { Record } from "./types";

export const stringIsDate = (string: string) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dateRegex.test(string);
};

export const sortDates = (
  order: "ascending" | "descending" | "no-sort",
  a: string,
  b: string
): number => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (order === "ascending") {
    return dateA.getTime() - dateB.getTime();
  } else if (order === "descending") {
    return dateB.getTime() - dateA.getTime();
  } else return 0;
};

export const sortString = (
  order: "ascending" | "descending" | "no-sort",
  a: string,
  b: string
): number => {
  if (order === "ascending") {
    return a > b ? 1 : -1;
  } else if (order === "descending") {
    return a < b ? 1 : -1;
  } else return 0;
};

export const sortField = (
  records: Record[],
  field: string,
  order: "ascending" | "descending" | "no-sort"
) => {
  if (stringIsDate(records[0][field])) {
    return (a: Record, b: Record) => sortDates(order, a[field], b[field]);
  } else {
    return (a: Record, b: Record) => sortString(order, a[field], b[field]);
  }
};

export const paginate = (
  currentPage: number,
  numberOfRecordsPerPage: number,
  dataLength: number
) => {
  const indexOfFirstRecord = (currentPage - 1) * numberOfRecordsPerPage + 1;
  const indexOfLastRecord = Math.min(
    currentPage * numberOfRecordsPerPage,
    dataLength
  );
  return `Showing ${indexOfFirstRecord} to ${indexOfLastRecord} of ${dataLength} entries`;
};

export function verifyRecord(record: Record, headers: string[]): boolean {
  return headers.every((header) => header in record);
}
