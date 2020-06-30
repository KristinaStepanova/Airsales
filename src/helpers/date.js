import { format } from "date-fns";

export function formatDateFromString(string, formatType) {
  const date = new Date(string);
  return format(date, formatType);
}
