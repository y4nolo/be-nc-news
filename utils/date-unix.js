exports.createDateStringFromUnix = function(unixDate) {
  let date = new Date(unixDate);

  //date.toISOString();
  let monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let year = date.getFullYear();
  let month = monthsArr[date.getMonth()];
  let day = date.getDate();
  let minutes = "0" + date.getMinutes();
  let hours = "0" + date.getHours();
  let seconds = "0" + date.getSeconds();
  const dateString = `${month}-${day}-${year} ${hours.substr(
    -2
  )}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

  return dateString;
};
