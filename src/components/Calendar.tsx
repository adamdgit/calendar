import { useRef, useEffect, useState } from 'react'
import { calcCalendarDays } from "../utils/calcDays"
import DayOption from './DayOption'
import EventPopup from './eventPopup'

// create dynamic dates based on current year forward
const yearData:Number[] = []
yearData.push(Number(new Date().getFullYear()))
for (let i=1; i<20; i++) {
  yearData.push(Number(yearData[0]) +i)
}  

export default function Calendar() {

  const monthSelect = useRef();
  const yearSelect = useRef();
  const calendarBody = useRef();

  const [calendarData, setCalendarData] = useState<Date[]>([])

  // on mount render current month days
  useEffect(() => {
    // set current month 
    monthSelect.current.value = new Date().getMonth();
    setCalendarData(calcCalendarDays(monthSelect.current!, yearSelect.current!));
  }, [])

  function showHideCalendarMonths() {
    console.log(monthSelect)
    // on change year or month gets updated
    // need to render new calendar by adding new days to calendar data state
    setCalendarData(calcCalendarDays(monthSelect.current!, yearSelect.current!))
  }

  return (
    <div className="datepicker-container" id="datepicker-container">
      <div className="datepicker-calendar">
        <div className="datepicker-header">

          <div className="datepicker-dates">
            <span className="pick-year">Year: 
              <select ref={yearSelect} onChange={() => showHideCalendarMonths()} className="pick-year-select">
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
              <select ref={monthSelect} onChange={() => showHideCalendarMonths()} className="pick-month-select">
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </span>
          </div>

          <div className="datepicker-days-row">
            <div className="day">Monday</div>
            <div className="day">Tuesday</div>
            <div className="day">Wednesday</div>
            <div className="day">Thursday</div>
            <div className="day">Friday</div>
            <div className="day">Saturday</div>
            <div className="day">Sunday</div>
          </div>
        </div>

        <div ref={calendarBody} className="datepicker-body">
          <div className='monthWrap' data-month={monthSelect.current?.value} data-year={yearSelect.current?.value} >
          {
            calendarData.map((day, i) => (
              <DayOption 
                key={i}
                monthSelect={monthSelect.current}
                day={day} 
              />
            ))
          }
          </div>
        </div>
      </div>
    </div>
  )
}
