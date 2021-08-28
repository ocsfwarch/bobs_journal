/*
   This component includes the date and
   time formatting functions for the app.
*/

// Formats a Date object as YYYY-MM-DD.
function asDateString(date: Date) {
  return `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

// Today's date as YYYY-MM-DD.
const today = () => {
  return asDateString(new Date());
};

// Using GB format for easier time sorting computation
const formatTime = () => {
  const theDate = new Date();
  const the24Time = theDate.toLocaleTimeString("en-GB");
  return the24Time;
};
/// Using US format for UI display
const formatUSTime = () => {
  const theDate = new Date();
  const the12Time = theDate.toLocaleTimeString("en-US");
  const index = the12Time.lastIndexOf(":");
  let results = "";
  if (index !== -1) {
    results = `${the12Time.slice(0, index)}${the12Time.slice(
      the12Time.length - 2
    )}`;
  } else {
    results = the12Time;
  }
  return results.toLowerCase();
};

const formatDate = (dateItem: string) => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const theDate = new Date();
  const the24Time = theDate.toLocaleTimeString("en-GB");
  const dateObj = new Date(`${dateItem}T${the24Time}`);
  const dayOfWeek = dateObj.getDay();
  const dayOfMonth = dateObj.getDate();
  return `${weekDays[dayOfWeek]}, ${
    months[dateObj.getMonth()]
  } ${dayOfMonth}${determineExt(dayOfMonth)}`;
};

const determineExt = (day: number) => {
  if (day === 3 || day === 23) {
    return "rd";
  } else if (day === 1 || day === 2 || day === 21 || day === 22 || day === 31) {
    return "st";
  } else {
    return "th";
  }
};

export { today, formatDate, formatTime, formatUSTime };
