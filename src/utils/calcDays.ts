
// populate body of calendar with accurate days of selected month & year
export function calcCalendarDays(
  monthSelect: HTMLSelectElement, 
  yearSelect: HTMLSelectElement,
  calendarBody: HTMLDivElement
  ) {
  // Date variables to calculate previous, current and next months dates
  let selectedMonth = Number(monthSelect.current.value);
  let selectedYear = Number(yearSelect.current.value);
  let currentMonth = new Date(selectedYear, selectedMonth, 1);
  let firstDayPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  // getDay() returns day as int 0=sun, 1=mon.. 6=sat etc
  let firstDayMonth = new Date(selectedYear, selectedMonth, 1, 0).getDay();
  // Sunday is counted as 0, must convert to 7 for calculations below
  if (firstDayMonth == 0) { firstDayMonth = 7; }
  let calc = (firstDayPrevMonth + 1) - (firstDayMonth - 1);
  let prevMonth = new Date(selectedYear, selectedMonth - 1, calc);
  let lastDayMonth = new Date(selectedYear, selectedMonth + 1, 0).getDay();
  let nextMonth = new Date(selectedYear, selectedMonth + 1, 1);

  // each time a new month is selected we build the month into
  // the calendars HTML with a new div and related days
  let monthWrap = document.createElement('div')
  monthWrap.dataset.month = selectedMonth.toString();
  monthWrap.dataset.year = selectedYear.toString();
  monthWrap.classList.add('monthWrap');
  calendarBody.current.appendChild(monthWrap);

  // show some days from previous month
  for (let i = (firstDayPrevMonth + 1) - firstDayMonth; i < firstDayPrevMonth; i++) {
    let prevMonthDays = new Date(prevMonth);
    prevMonth.setDate(prevMonth.getDate() + 1);
    insertDaysHTML(prevMonthDays, 'date not-current-month', monthWrap);
  }
  // current month calc
  while (currentMonth.getMonth() === selectedMonth) {
    let currentMonthDay = new Date(currentMonth);
    currentMonth.setDate(currentMonth.getDate() + 1);
    insertDaysHTML(currentMonthDay, 'date', monthWrap);
    // highlight todays date
    if (currentMonthDay.getDate() === new Date().getDate()) {
      const value = new Date().toLocaleString('en-au', { day: '2-digit', month: '2-digit', year: 'numeric' })
      monthWrap.querySelector(`option[value='${value}']`)?.classList.add('today')
    }
  }
  // show some days from next month
  for (let i = 1; i <= 7 - lastDayMonth; i++) {
    let nextMonthDays = new Date(nextMonth);
    nextMonth.setDate(nextMonth.getDate() + 1);
    insertDaysHTML(nextMonthDays, 'date not-current-month', monthWrap);
  }
}

// converts long date into short date and inserts html to calendar body
function insertDaysHTML(date: Date, elementClass: string, month: HTMLDivElement) {
  let convertedDate = date.toLocaleString('en-au', { day: '2-digit', month: '2-digit', year: 'numeric' });
  let d = date.toLocaleString('en-au', { day: '2-digit' });
  const newDay = `<option class="${elementClass}" value="${convertedDate}">${d}</option>`;
  month.insertAdjacentHTML('beforeend', newDay);
}

