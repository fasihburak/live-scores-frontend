"use client";
import LiveIndicator from "./LiveIndicator";

export default function ClientMatchStatusOrTimeInfo({ dateString, status }) {
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

  // Combined options for date and time.
  const dateTimeOptions = {
    ...dateOptions,
    ...timeOptions,
  };

  let displayText;
  if (status === 'scheduled') {
    if (isToday) {
      displayText = "Today at " + date.toLocaleString(undefined, timeOptions);
    } else if (isTomorrow) {
      displayText = "Tomorrow at " + date.toLocaleString(undefined, timeOptions);
    } else {
      displayText = date.toLocaleString(undefined, dateTimeOptions);
    }
  } else if (status === 'ongoing') {
    return (
      <LiveIndicator />
    );
  } else if (status === 'to_be_scheduled') {
    displayText = "TBA";
  } else {
    displayText = status.charAt(0).toUpperCase() + status.slice(1);
  }

  return <span>{displayText}</span>;
}

        