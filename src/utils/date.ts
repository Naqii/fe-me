import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@heroui/react";

const standardTime = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};

const toDateStandard = (date: DateValue): string => {
  const year = date.year;
  const month = standardTime(date.month);
  const day = standardTime(date.day);

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;
  return result;
};

const toInputDate = (date: string): DateValue => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formattedDate;
};

const convertTime = (isoDate: string) => {
  const dateObject = new Date(isoDate);

  const date = dateObject.toLocaleString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
  return `${date} WIB`;
};
export { toDateStandard, toInputDate, convertTime };
