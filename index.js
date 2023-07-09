// Your code here
// Helper function to convert date string to Date object
function toDate(dateString) {
  const [date, time] = dateString.split(' ');
  const [year, month, day] = date.split('-');
  const [hour, minute] = time.match(/\d{2}/g);
  return new Date(year, month - 1, day, hour, minute);
}

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const timeInEvent = {
    type: 'TimeIn',
    hour: toDate(dateStamp).getHours(),
    date: toDate(dateStamp).toDateString(),
  };
  employee.timeInEvents.push(timeInEvent);
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const timeOutEvent = {
    type: 'TimeOut',
    hour: toDate(dateStamp).getHours(),
    date: toDate(dateStamp).toDateString(),
  };
  employee.timeOutEvents.push(timeOutEvent);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100; // Assuming time is always on the hour
  }
  return 0;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
