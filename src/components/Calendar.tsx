import { useRef, useEffect } from 'react'

const yearData:Number[] = []

// create dynamic dates based on current year forward
yearData.push(Number(new Date().getFullYear()))
for (let i=1; i<20; i++) {
  yearData.push(Number(yearData[0]) +i)
}  

export default function Calendar() {

  const monthSelect = useRef();
  const yearSelect = useRef();
  const calendarBody = useRef();

  // populate body of calendar with accurate days of selected month & year
  function calcCalendarDays() {
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
      let currentMonthDays = new Date(currentMonth);
      currentMonth.setDate(currentMonth.getDate() + 1);
      insertDaysHTML(currentMonthDays, 'date', monthWrap);
    }
    // show some days from next month
    for (let i = 1; i <= 7 - lastDayMonth; i++) {
      let nextMonthDays = new Date(nextMonth);
      nextMonth.setDate(nextMonth.getDate() + 1);
      insertDaysHTML(nextMonthDays, 'date not-current-month', monthWrap);
    }
    // adds event listeners to all days in the calendar
    addDaysEventListeners()
  }

  // converts long date into short date and inserts html to calendar body
  function insertDaysHTML(date: Date, elementClass: string, month: HTMLDivElement) {
    let convertedDate = date.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' });
    let d = date.toLocaleString('en-us', { day: '2-digit' });
    const newDay = `<option class="${elementClass}" value="${convertedDate}">${d}</option>`;
    month.insertAdjacentHTML('beforeend', newDay);
  }

  function addDaysEventListeners() {
    let monthEl = calendarBody.current.querySelector(`[data-month="${monthSelect.current.value}"][data-year="${yearSelect.current.value}"]`)
    monthEl.childNodes.forEach(day => {
      // highlight current date in calendar
      if (day.value === new Date().toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' })) {
        day.classList.add('today');
      }
      // TODO: add selction function
      // day.addEventListener('click', (e) => {
      //   selectedRange(e);
      // })
    })
  }

  // on mount render current month days
  useEffect(() => {
    // set current month 
    monthSelect.current.value = new Date().getMonth();
    calcCalendarDays()
  }, [])

  return (
    <div className="datepicker-container" id="datepicker-container">
      <div className="datepicker-calendar">
        <div className="datepicker-header">

          <div className="datepicker-dates">
            <span className="year-month">
              <span className="pick-year">Year:
                <select ref={yearSelect} onChange={() => calcCalendarDays()} className="pick-year-select">
                  {
                    yearData.map(year => (
                      <option 
                        key={year.toString()} 
                        value={year.toString()}>
                        {year.toString()}
                      </option>
                    ))
                  }
                </select>
              </span>
              <span className="pick-month">Month:
                <select ref={monthSelect} onChange={() => calcCalendarDays()} className="pick-month-select">
                  <option value="0">Jan</option>
                  <option value="1">Feb</option>
                  <option value="2">Mar</option>
                  <option value="3">Apr</option>
                  <option value="4">May</option>
                  <option value="5">Jun</option>
                  <option value="6">Jul</option>
                  <option value="7">Aug</option>
                  <option value="8">Sep</option>
                  <option value="9">Oct</option>
                  <option value="10">Nov</option>
                  <option value="11">Dec</option>
                </select>
              </span>
            </span>
          </div>

          <div className="datepicker-days-row">
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
            <div className="day">Sun</div>
          </div>
        </div>

        <div ref={calendarBody} className="datepicker-body">
        </div>
      </div>
    </div>
  )
}
