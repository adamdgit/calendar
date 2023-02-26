import { useRef, useEffect, ReactElement, ReactHTMLElement } from 'react'
import { calcCalendarDays } from "../utils/calcDays"

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

  // on mount render current month days
  useEffect(() => {
    // set current month 
    monthSelect.current.value = new Date().getMonth();
    calcCalendarDays(monthSelect, yearSelect, calendarBody);
  }, [])

  return (
    <div className="datepicker-container" id="datepicker-container">
      <div className="datepicker-calendar">
        <div className="datepicker-header">

          <div className="datepicker-dates">
            <span className="year-month">
              <span className="pick-year">Year:
                <select ref={yearSelect} onChange={() => calcCalendarDays(monthSelect, yearSelect, calendarBody)} className="pick-year-select">
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
                <select ref={monthSelect} onChange={() => calcCalendarDays(monthSelect, yearSelect, calendarBody)} className="pick-month-select">
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
