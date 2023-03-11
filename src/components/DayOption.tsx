import { useMemo, useState } from "react";
import { localStorageData } from "../App";

type dayOptionProps = {
  day: Date,
  monthSelect: any,
  setPopupIsVisible: (args: boolean) => void,
  setSelectedDate: (args: string) => void,
  lsItems: localStorageData[]
}

export default function DayOption(
  { day, monthSelect, setPopupIsVisible, setSelectedDate, lsItems } 
  : dayOptionProps) {

  // number of events for this day 
  const [numEvents, setNumEvents] = useState<number>()

  function handlePopup(e: any) {
    setPopupIsVisible(true);
    // pass slected date value to popup
    setSelectedDate(e.target.value)
  }

  useMemo(() => {
    // calculate number of items for each day
    let count = 0
    lsItems.forEach(item => {
      if (new Date(item.Date).toLocaleString('en-au') === new Date(day).toLocaleString('en-au')) {
        count += 1
      }
    })
    setNumEvents(count)
  },[lsItems, day])

  return (
    <div style={{position: 'relative'}}>
      <div className="event-number">{numEvents === 0 ? null : numEvents}</div>
      <button
        onClick={(e) => handlePopup(e)}
        className={
          day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) === new Date().toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) ? 'date today' 
        : day.getMonth() === Number(monthSelect.value) ? 'date'
        : 'date not-current-month'} 
        value={day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' })}>
        {day.toLocaleString('en-us', { day: 'numeric' })}
      </button>
    </div>
  )
}
