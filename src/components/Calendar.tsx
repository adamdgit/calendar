import React from 'react'

const yearData:Number[] = []

// create dynamic dates based on current year forward
yearData.push(Number(new Date().toLocaleString('en-au', { year:'numeric' })))
for (let i=1; i<20; i++) {
  yearData.push(Number(yearData[0]) +i)
}

export default function Calendar() {

  return (
    <div>

      <div className="datepicker-container" id="datepicker-container">
        <div className="datepicker-calendar">
          <div className="datepicker-header">

            <div className="datepicker-dates">
              <span className="year-month">
                <span className="pick-year">Year:
                  <select className="pick-year-select">
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
                  <select className="pick-month-select">
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

          <div className="datepicker-body">
          </div>
        </div>
      </div>

    </div>
  )
}
