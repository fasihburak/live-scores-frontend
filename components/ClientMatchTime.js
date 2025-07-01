"use client";

export default function ClientMatchStat({ dateString }) {
  const date = new Date(dateString);
  const now = new Date();

  // Determine if the date is today.
  const isToday = date.toDateString() === now.toDateString();

  // Determine if the date is tomorrow.
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  // Options for formatting time in 24-hour format.
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Options for formatting date as day, month, year.
  const dateOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  let displayText;
  if (isToday) {
    displayText = "Today at " + date.toLocaleString(undefined, timeOptions);
  } else if (isTomorrow) {
    displayText = "Tomorrow at " + date.toLocaleString(undefined, timeOptions);
  } else {
    displayText = date.toLocaleString(undefined, dateOptions);
  }
  
  return <span>{displayText}</span>;
}
