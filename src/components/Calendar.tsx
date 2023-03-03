import { useRef, useEffect, useState } from 'react'
import { calcCalendarDays } from "../utils/calcDays"

// create dynamic dates based on current year forward
const yearData:Number[] = []
yearData.push(Number(new Date().getFullYear()))
for (let i=1; i<20; i++) {
  yearData.push(Number(yearData[0]) +i)
}  

type calendarProps = {
  setPopupIsVisible: (arg: boolean) => void,
  setSelectedDate: (arg: string) => void
}

export default function Calendar({ setPopupIsVisible, setSelectedDate } : calendarProps) {

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

  function createNewEvent(e: Event) {
    console.log(e.target)
    setPopupIsVisible(true);
    // pass slected date value to popup
    setSelectedDate(e.target.value)
  }

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
            <span className="year-month">
              <span className="pick-year">Year:
                <select ref={yearSelect} onChange={() => showHideCalendarMonths(monthSelect, yearSelect)} className="pick-year-select">
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
                <select ref={monthSelect} onChange={() => showHideCalendarMonths(monthSelect, yearSelect)} className="pick-month-select">
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
          <div className='monthWrap' data-month={monthSelect.current?.value} data-year={yearSelect.current?.value} >
          {
            calendarData.map((day, i) => (
              <option 
                key={i}
                onClick={(e) => createNewEvent(e)}
                className={
                  day.toLocaleString('en-au', { day: '2-digit', month: '2-digit', year: 'numeric' }) === new Date().toLocaleString('en-au', { day: '2-digit', month: '2-digit', year: 'numeric' }) ? 'date today' 
                : day.getMonth() === Number(monthSelect.current.value) ? 'date'
                : 'date not-current-month'} 
                value={day.toLocaleString('en-au', { day: '2-digit', month: '2-digit', year: 'numeric' })}>
                {day.toLocaleString('en-au', { day: '2-digit' })}
              </option>
            ))
          }
          </div>
        </div>
      </div>
    </div>
  )
}
